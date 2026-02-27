#!/usr/bin/env python3
"""
Export Apple Numbers file (PŘÍPADY.numbers) to structured JSON.
Outputs ALL rows with proper type preservation, resolved headers,
and SP.ZN. as integers.

Output: data-analysis/export.json
"""
import os
import sys
import io
import json
from datetime import datetime, timedelta
from struct import unpack

# Force UTF-8 output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# ---- Monkey-patch numbers_parser.cell.Cell._from_storage ----
import numbers_parser.cell as cell_module
from numbers_parser.cell import (
    Cell, EmptyCell, NumberCell, TextCell, DateCell, BoolCell,
    DurationCell, ErrorCell, RichTextCell, CellStorageFlags,
)
from numbers_parser.constants import EPOCH, CURRENCY_CELL_TYPE, CellType

_original_from_storage = Cell._from_storage

import logging
from logging import debug

TSTArchives = cell_module.TSTArchives

def _unpack_decimal128(data):
    return cell_module._unpack_decimal128(data)


@classmethod
def _patched_from_storage(cls, table_id, row, col, buffer, model):
    d128 = None
    double = None
    seconds = None

    from numbers_parser.exceptions import UnsupportedError

    version = buffer[0]
    if version != 5:
        msg = f"Cell storage version {version} is unsupported"
        raise UnsupportedError(msg)

    offset = 12
    storage_flags = CellStorageFlags()
    flags = unpack("<i", buffer[8:12])[0]

    if flags & 0x1:
        d128 = _unpack_decimal128(buffer[offset : offset + 16])
        offset += 16
    if flags & 0x2:
        double = unpack("<d", buffer[offset : offset + 8])[0]
        offset += 8
    if flags & 0x4:
        seconds = unpack("<d", buffer[offset : offset + 8])[0]
        offset += 8
    if flags & 0x8:
        storage_flags._string_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x10:
        storage_flags._rich_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x20:
        storage_flags._cell_style_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x40:
        storage_flags._text_style_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x80:
        offset += 4
    if flags & 0x200:
        storage_flags._formula_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x400:
        storage_flags._control_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x1000:
        storage_flags._suggest_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    offset += 4 * bin(flags & 0x900).count("1")
    if flags & 0x2000:
        storage_flags._num_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x4000:
        storage_flags._currency_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x8000:
        storage_flags._date_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x10000:
        storage_flags._duration_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x20000:
        storage_flags._text_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4
    if flags & 0x40000:
        storage_flags._bool_format_id = unpack("<i", buffer[offset : offset + 4])[0]
        offset += 4

    cell_type = buffer[1]
    if cell_type == TSTArchives.genericCellType:
        cell = EmptyCell(row, col)
    elif cell_type == TSTArchives.numberCellType:
        cell = NumberCell(row, col, d128)
    elif cell_type == TSTArchives.textCellType:
        cell = TextCell(row, col, model.table_string(table_id, storage_flags._string_id))
    elif cell_type == TSTArchives.dateCellType:
        try:
            cell = DateCell(row, col, EPOCH + timedelta(seconds=seconds))
            cell._datetime = cell._value
        except (OverflowError, OSError, ValueError) as e:
            try:
                approx_years = seconds / (365.25 * 86400) if seconds else 0
                approx_year = 2001 + approx_years
                fallback_str = f"[DATE: ~year {approx_year:.1f}, raw_seconds={seconds}]"
            except Exception:
                fallback_str = f"[DATE: raw_seconds={seconds}]"
            cell = TextCell(row, col, fallback_str)
            print(f"  WARNING: Date overflow at row={row}, col={col}, seconds={seconds}: {e}", file=sys.stderr)
    elif cell_type == TSTArchives.boolCellType:
        cell = BoolCell(row, col, double > 0.0)
    elif cell_type == TSTArchives.durationCellType:
        try:
            cell = DurationCell(row, col, timedelta(seconds=double))
        except (OverflowError, OSError, ValueError) as e:
            cell = TextCell(row, col, f"[DURATION: raw_seconds={double}]")
            print(f"  WARNING: Duration overflow at row={row}, col={col}: {e}", file=sys.stderr)
    elif cell_type == TSTArchives.formulaErrorCellType:
        cell = ErrorCell(row, col)
    elif cell_type == TSTArchives.automaticCellType:
        cell = RichTextCell(row, col, model.table_rich_text(table_id, storage_flags._rich_id))
    elif cell_type == CURRENCY_CELL_TYPE:
        cell = NumberCell(row, col, d128, cell_type=CellType.CURRENCY)
    else:
        msg = f"Cell type ID {cell_type} is not recognized"
        raise UnsupportedError(msg)

    cell._copy_flags(storage_flags)
    cell._buffer = buffer
    cell._model = model
    cell._table_id = table_id
    cell._d128 = d128
    cell._double = double
    cell._seconds = seconds
    cell._extras = unpack("<H", buffer[6:8])[0]
    cell._flags = flags

    merge_cells = model.merge_cells(table_id)
    cell._set_merge(merge_cells.get((row, col)))

    if logging.getLogger(__package__).level == logging.DEBUG:
        debug(str(cell))

    return cell


Cell._from_storage = _patched_from_storage
print("Monkey-patch applied to Cell._from_storage", file=sys.stderr)


# ---- Cell value extraction ----

def cell_to_json_value(cell):
    """Convert a numbers_parser Cell to a JSON-serializable value with type info."""
    if isinstance(cell, EmptyCell):
        return None
    elif isinstance(cell, BoolCell):
        return cell.value
    elif isinstance(cell, NumberCell):
        val = cell.value
        if val is None:
            return None
        # Convert float to int if it's a whole number
        if isinstance(val, float) and val == int(val) and abs(val) < 1e15:
            return int(val)
        return val
    elif isinstance(cell, DateCell):
        dt = cell.value
        if dt is None:
            return None
        return dt.isoformat()
    elif isinstance(cell, DurationCell):
        td = cell.value
        if td is None:
            return None
        total_seconds = int(td.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{hours}:{minutes:02d}"
    elif isinstance(cell, (TextCell, RichTextCell)):
        val = cell.value
        if val is None or (isinstance(val, str) and val.strip() == ""):
            return None
        return str(val).strip()
    elif isinstance(cell, ErrorCell):
        return None
    else:
        val = cell.value
        if val is None:
            return None
        return str(val)


def is_empty_row(row_values):
    """Check if all values in a row are None/empty."""
    return all(v is None for v in row_values)


def is_padding_row(row_values, table_key):
    """
    Check if a row is a pre-allocated padding row (empty except for defaults).
    These are rows where the SP.ZN. exists but no real data is filled in.
    """
    if table_key in ("realitni_obchody", "databaze", "nemovitosti", "uschova"):
        # These tables have 2000+ pre-allocated rows; skip rows where
        # there's a SP.ZN. but the name/content column is empty
        if len(row_values) < 2:
            return is_empty_row(row_values)
        spzn = row_values[0]
        # If no SPZN, check if fully empty
        if spzn is None:
            return is_empty_row(row_values)
        # For these tables, keep all rows with SP.ZN. - the migration
        # script will decide what to import based on actual content
        return False
    return is_empty_row(row_values)


# ---- Header flattening ----

# Manually defined column headers for tables with complex multi-row headers
# or header_rows=0 where row 0 is actually the header.
MANUAL_HEADERS = {
    # SHEET 0: DOCHÁZKA Jitka
    ("DOCHÁZKA Jitka", "JITKA"): [
        "datum", "prichod", "odchod", "hodiny", "prazdne_1",
        "filtr_datum", "filtr_mesic", "prazdne_2"
    ],
    ("DOCHÁZKA Jitka", "VYÚČTOVÁNÍ"): [
        "mesic", "hodiny", "mzda", "karel", "m_task", "kredo_l", "sazba", "prazdne"
    ],

    # SHEET 1: ÚKOLY — 4 header rows; row 3 has the actual column names
    ("ÚKOLY", "ÚKOLY"): [
        "kauza", "klient", "spzn", "ukol", "odhad", "realny_cas",
        "datum", "urgent", "lhuta", "poznamka_ke_zpracovani",
        "filtr", "prazdne_1", "prazdne_2", "prazdne_3",
        "aktivni", "k_fakturaci", "ref"
    ],

    # SHEET 2: ADVOKÁTNÍ KAUZY — 4 header rows; row 3 has columns
    ("ADVOKÁTNÍ KAUZY", "ADVOKÁTNÍ KAUZY"): [
        "spzn", "pripad", "klient", "aktualni_stav", "poznamky",
        "k_archivaci", "archivovano", "prazdne_1", "aktivni_ref", "filtr"
    ],

    # SHEET 3: REALITNÍ OBCHODY — 2 header rows merged
    ("REALITNÍ OBCHODY", "REALITNÍ OBCHODY"): [
        "spzn", "nazev", "klient", "rezervace",
        "zpracovani", "zpracovani_prazdne", "zpracovani_zadano", "zpracovani_odeslano",
        "finalizace_prevodce", "finalizace_nabyvatel", "finalizace_uver", "finalizace_uzavreno",
        "uschova_info_banka", "uschova_prazdne_1", "uschova_aml", "uschova_prazdne_2",
        "uschova_eku", "uschova_prazdne_3", "uschova_stav", "uschova_slozeni", "uschova_vraceni",
        "katastr_knv", "katastr_ku", "katastr_pr", "katastr_zs", "katastr_ks",
        "katastr_info", "katastr_prazdne", "katastr_po",
        "predano", "archivace", "archivace_dne",
        "uschovni_ucet", "poznamka", "poznamka_prazdne",
        "plomba_f", "aktivni", "k_archivaci", "na_ku"
    ],

    # SHEET 4: PŘEHLED OBCHODU
    ("PŘEHLED OBCHODU", "odchozí platby"): [
        "spzn", "typ_vyplaty", "castka", "poznamka",
        "podminka_jine", "ok", "vyplata", "vyplaceno_1", "vyplaceno_2",
        "filtr", "prazdne"
    ],

    # databáze: header_rows=0 but row 0 IS the header
    ("PŘEHLED OBCHODU", "databáze"): [
        "spzn", "makler_doporucitel", "prevodce", "nabyvatel",
        "typ_nemovitosti", "cislo", "katastralní_uzemi", "obec",
        "cast_obce", "ulice_nazev", "rs", "rezervacni_lhuta",
        "kupni_cena", "vlastni_prostredky_celkem", "zaloha",
        "do_uschovy_vlastni", "jinam_vlastni", "uvery_celkem",
        "refinancovani", "do_uschovy_uver", "jinam_uver",
        "zakaz_zcizeni", "predpokladana_vyse", "vyciSlena_vyse",
        "lhuta", "nazev_info", "info_mail", "rs_bool",
        "typ_nemovitosti_souhrn"
    ],

    # NEMOVITOSTI: header_rows=0 but row 0 IS the header
    ("PŘEHLED OBCHODU", "NEMOVITOSTI"): [
        "spzn", "prazdne_1", "prazdne_2", "nemovitost", "ulice_nazev_obec"
    ],

    # úschova
    ("PŘEHLED OBCHODU", "úschova"): [
        "spzn", "uschova_celkem", "prazdne_1", "stav", "prazdne_2",
        "ucet_uschova", "prazdne_3", "slozeno", "prazdne_4",
        "vyplaceno", "prazdne_5", "zbyva", "prazdne_6", "prazdne_7",
        "prazdne_8", "ind", "prazdne_9", "obecne"
    ],

    # příchozí platby
    ("PŘEHLED OBCHODU", "příchozí platby"): [
        "spzn", "datum", "castka", "filtr"
    ],

    # SHEET 5: KATASTRÁLNÍ ŘÍZENÍ
    ("KATASTRÁLNÍ ŘÍZENÍ", "Tabulka 1-1-1"): [
        "spzn", "druh", "upresneni", "stav", "podani_kdy",
        "podani_prazdne_1", "podani_kdo", "podani_konverze",
        "podani_prazdne_2", "podani_prazdne_3", "podani_ku",
        "poplatek_platce", "poplatek_stav",
        "cj", "konec_lhuty", "datum_provedeni",
        "problem", "k_doplneni", "id", "plomba_s",
        "vklad", "plomba", "prazdne", "filtr"
    ],

    # SHEET 6: ÚSCHOVNÍ ÚČTY
    ("ÚSCHOVNÍ ÚČTY", "ÚSCHOVNÍ ÚČTY"): [
        "mena", "ucet", "spzn", "kauza", "klient", "stav", "zustatek", "prazdne"
    ],

    # SHEET 7: SUBJEKTY
    ("SUBJEKTY", "CELKOVÝ PŘEHLED KAUZ"): [
        "spzn", "nazev", "klient", "f"
    ],

    # SHEET 9: ARCHIV — 1 header row
    ("ARCHIV", "KATASTRÁLNÍ ŘÍZENÍ"): [
        "spzn", "kauza", "poznamka", "nemovitost", "predmet_rizeni",
        "kp", "cj", "konec_lhuty", "poplatek",
        "podklad_k_zaplaceni_predan_dne", "povoleni_vkladu_skonceni",
        "problem_poznamka", "datum_problemu", "pravnik", "linka",
        "filtr", "prazdne_1", "prazdne_2"
    ],

    # ARCHIV - KATASTRÁLNÍ ŘÍZENÍ-1 has 4 header rows; row 3 has columns
    ("ARCHIV", "KATASTRÁLNÍ ŘÍZENÍ-1"): [
        "spzn", "kauza", "prazdne_1", "poznamka", "nemovitost",
        "predmet_rizeni", "uschova", "kp", "cj", "konec_lhuty",
        "poplatek", "podklad_k_zaplaceni_predan_dne",
        "povoleni_vkladu_skonceni", "problem_poznamka", "datum_problemu",
        "pravnik", "linka", "filtr", "filtr_ku", "zaskrt",
        "vyzva", "id", "prazdne_2"
    ],

    ("ARCHIV", "CELKOVÝ PŘEHLED KAUZ"): [
        "spzn", "nazev", "klient", "f"
    ],
}

# Tables to skip entirely (UI filter helpers, single-cell labels, etc.)
SKIP_TABLES = {
    ("REALITNÍ OBCHODY", "FILTRY-1"),
    ("REALITNÍ OBCHODY", "FILTRY-2"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1-1"),
    ("PŘEHLED OBCHODU", "KAUZA"),
    ("PŘEHLED OBCHODU", "Tabulka 1"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1-2-2-1"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1-2-2"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1-2-3"),
    ("PŘEHLED OBCHODU", "PŘEHLED-1-2-3-1"),
    ("PŘEHLED OBCHODU", "MAIL"),
    ("PŘEHLED OBCHODU", "REALITNÍ OBCHODY"),
    ("PŘEHLED OBCHODU", "REALITNÍ OBCHODY-2"),
    ("KATASTRÁLNÍ ŘÍZENÍ", "FILTRY-1"),
    ("KATASTRÁLNÍ ŘÍZENÍ", "FILTRY-2"),
    ("KATASTRÁLNÍ ŘÍZENÍ", "KAUZA"),
    ("KATASTRÁLNÍ ŘÍZENÍ", "Tabulka 1"),
    ("pomocné", "Tabulka 1-1-1"),
    ("pomocné", "Tabulka 1"),
    ("pomocné", "Tabulka 1-1"),
    ("pomocné", "Tabulka 1-2"),
    ("ETIKETY", "ROZLOŽENÍ K TISKU"),
    ("ETIKETY", "Tabulka 1-1"),
    ("ŠANON", "Tabulka 1-1"),
    ("ŠANON", "Tabulka 1-1-1"),
    ("ŠANON", "Tabulka 1-1-2"),
    ("ŠANON", "Tabulka 1-1-1-1"),
}

# Tables where header_rows=0 but row 0 is actually the header
FIRST_ROW_IS_HEADER = {
    ("PŘEHLED OBCHODU", "databáze"),
    ("PŘEHLED OBCHODU", "NEMOVITOSTI"),
}

# Stable key names for tables (used in the output JSON)
TABLE_KEYS = {
    ("DOCHÁZKA Jitka", "JITKA"): "dochazka_jitka",
    ("DOCHÁZKA Jitka", "VYÚČTOVÁNÍ"): "dochazka_vyuctovani",
    ("ÚKOLY", "ÚKOLY"): "ukoly",
    ("ADVOKÁTNÍ KAUZY", "ADVOKÁTNÍ KAUZY"): "advokatni_kauzy",
    ("REALITNÍ OBCHODY", "REALITNÍ OBCHODY"): "realitni_obchody",
    ("PŘEHLED OBCHODU", "odchozí platby"): "odchozi_platby",
    ("PŘEHLED OBCHODU", "databáze"): "databaze",
    ("PŘEHLED OBCHODU", "NEMOVITOSTI"): "nemovitosti",
    ("PŘEHLED OBCHODU", "úschova"): "uschova",
    ("PŘEHLED OBCHODU", "příchozí platby"): "prichozi_platby",
    ("KATASTRÁLNÍ ŘÍZENÍ", "Tabulka 1-1-1"): "katastralní_rizeni",
    ("ÚSCHOVNÍ ÚČTY", "ÚSCHOVNÍ ÚČTY"): "uschovni_ucty",
    ("SUBJEKTY", "CELKOVÝ PŘEHLED KAUZ"): "subjekty",
    ("ARCHIV", "KATASTRÁLNÍ ŘÍZENÍ"): "archiv_katastralní_rizeni",
    ("ARCHIV", "KATASTRÁLNÍ ŘÍZENÍ-1"): "archiv_katastralní_rizeni_1",
    ("ARCHIV", "CELKOVÝ PŘEHLED KAUZ"): "archiv_subjekty",
}


# ---- Main export ----

from numbers_parser import Document
from pathlib import Path

BASE_DIR = Path(os.path.dirname(os.path.abspath(__file__)))

# Find the .numbers directory
numbers_path = None
for entry in os.listdir(BASE_DIR):
    full = BASE_DIR / entry
    if entry.lower().endswith('.numbers') and full.is_dir():
        numbers_path = full
        break

if numbers_path is None:
    print("ERROR: Could not find .numbers directory in", BASE_DIR, file=sys.stderr)
    sys.exit(1)

print(f"Opening: {numbers_path}", file=sys.stderr)

try:
    doc = Document(numbers_path)
except Exception as e:
    print(f"ERROR opening document: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)

output = {
    "_meta": {
        "source": numbers_path.name,
        "exported_at": datetime.now().isoformat(),
        "description": "Complete export of PŘÍPADY.numbers for Firestore migration",
    },
    "tables": {},
}

stats = {
    "sheets_processed": 0,
    "tables_processed": 0,
    "tables_skipped": 0,
    "total_rows": 0,
    "empty_rows_filtered": 0,
}

for sheet in doc.sheets:
    stats["sheets_processed"] += 1
    sheet_name = sheet.name
    print(f"\nProcessing sheet: {sheet_name}", file=sys.stderr)

    for table in sheet.tables:
        table_name = table.name
        key = (sheet_name, table_name)

        # Skip UI-only / helper tables
        if key in SKIP_TABLES:
            stats["tables_skipped"] += 1
            print(f"  Skipping table: {table_name} (helper/UI)", file=sys.stderr)
            continue

        table_key = TABLE_KEYS.get(key)
        if table_key is None:
            stats["tables_skipped"] += 1
            print(f"  Skipping table: {table_name} (no key mapping)", file=sys.stderr)
            continue

        stats["tables_processed"] += 1
        print(f"  Processing table: {table_name} -> {table_key} ({table.num_rows}r x {table.num_cols}c)", file=sys.stderr)

        # Determine headers
        headers = MANUAL_HEADERS.get(key)
        if headers is None:
            # Auto-generate from header rows
            if table.num_header_rows > 0:
                headers = []
                for c in range(table.num_cols):
                    try:
                        cell = table.cell(table.num_header_rows - 1, c)
                        val = cell.value if cell.value is not None else ""
                        headers.append(str(val).strip() if val else f"col_{c}")
                    except Exception:
                        headers.append(f"col_{c}")
            else:
                headers = [f"col_{c}" for c in range(table.num_cols)]

        # Ensure we have enough header names for all columns
        while len(headers) < table.num_cols:
            headers.append(f"col_{len(headers)}")

        # Determine data start row
        data_start = table.num_header_rows
        if key in FIRST_ROW_IS_HEADER:
            data_start = 1  # Skip row 0 (it's the header)

        # Extract all data rows
        rows = []
        for r in range(data_start, table.num_rows):
            row_values = []
            for c in range(table.num_cols):
                try:
                    cell = table.cell(r, c)
                    val = cell_to_json_value(cell)
                    row_values.append(val)
                except Exception as e:
                    print(f"    ERROR at row={r}, col={c}: {e}", file=sys.stderr)
                    row_values.append(None)

            # Filter empty rows
            if is_empty_row(row_values):
                stats["empty_rows_filtered"] += 1
                continue

            # Build row dict
            row_dict = {}
            for i, val in enumerate(row_values):
                if i < len(headers):
                    col_name = headers[i]
                else:
                    col_name = f"col_{i}"
                row_dict[col_name] = val

            rows.append(row_dict)
            stats["total_rows"] += 1

        output["tables"][table_key] = {
            "sheet": sheet_name,
            "table": table_name,
            "headers": headers[:table.num_cols],
            "row_count": len(rows),
            "rows": rows,
        }

        print(f"    Exported {len(rows)} rows (filtered {table.num_rows - data_start - len(rows)} empty)", file=sys.stderr)

# Add stats
output["_meta"]["stats"] = stats

# Write output
output_path = BASE_DIR / "export.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"\n{'='*60}", file=sys.stderr)
print(f"Export complete!", file=sys.stderr)
print(f"  Sheets: {stats['sheets_processed']}", file=sys.stderr)
print(f"  Tables processed: {stats['tables_processed']}", file=sys.stderr)
print(f"  Tables skipped: {stats['tables_skipped']}", file=sys.stderr)
print(f"  Total data rows: {stats['total_rows']}", file=sys.stderr)
print(f"  Empty rows filtered: {stats['empty_rows_filtered']}", file=sys.stderr)
print(f"  Output: {output_path}", file=sys.stderr)
print(f"  Size: {output_path.stat().st_size / 1024 / 1024:.1f} MB", file=sys.stderr)
