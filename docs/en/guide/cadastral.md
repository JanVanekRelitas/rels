# Cadastral

The Cadastral module provides access to property information from the Czech Cadastral Registry (Katastr nemovitosti). It allows you to look up ownership certificates (LV), property details, and ownership history without leaving RELS.

## Navigating to Cadastral

Click **Registries** in the sidebar navigation, then select the **Cadastral** tab. You can also access cadastral information from a deal's property section.

## What Is the Cadastral Registry?

The Czech Cadastral Registry (managed by CUZK) is the official register of real property in the Czech Republic. It records:

- Land parcels and buildings
- Ownership rights
- Encumbrances (mortgages, easements, liens)
- Pending proceedings (plomby)

## LV (Ownership Certificate) Lookup

LV (list vlastnictvi) is the ownership certificate that groups all properties owned by the same person or entity in a given cadastral area.

### How to Search by LV

1. Go to **Registries** > **Cadastral**.
2. Select **LV Lookup**.
3. Enter the **cadastral area** (katastralni uzemi) — search by name or code.
4. Enter the **LV number**.
5. Click **Search**.

### LV Results

The lookup returns:

- **Owners** — Names, birth dates or ICO, and ownership shares
- **Land parcels** — Parcel numbers, areas (m2), land type
- **Buildings** — Building type, address, usage
- **Encumbrances (Section C)** — Mortgages, easements, pre-emptive rights
- **Pending proceedings (Plomby)** — Active changes being processed by the registry

::: warning
Pending proceedings (plomby) indicate that a change is being processed. This is critical information for deals — if a plomba exists, the property status may change. Always check this before proceeding with a transaction.
:::

## Property Lookup by Parcel

You can also search for a specific parcel:

1. Go to **Registries** > **Cadastral**.
2. Select **Parcel Lookup**.
3. Enter the **cadastral area** and **parcel number**.
4. Click **Search**.

Results show the parcel details, ownership, and the LV it belongs to.

## Key Fields Explained

| Field | Description |
|-------|-------------|
| **Katastralni uzemi** | Cadastral area (administrative division) |
| **LV** | Ownership certificate number |
| **Parcela** | Land parcel number (can be "st." for building parcels) |
| **Vymera** | Area in square meters |
| **Druh pozemku** | Land type (garden, arable, built-up, etc.) |
| **Vlastnik** | Owner name and identification |
| **Podil** | Ownership share (e.g., 1/2) |
| **Omezeni** | Restrictions and encumbrances |
| **Plomba** | Pending proceeding flag |

## Using Cadastral Data in Deals

When creating or editing a deal, you can link cadastral data:

1. Open the deal detail.
2. Go to the **Overview** tab.
3. In the **Property** section, click **Lookup from Cadastre**.
4. Search by LV or parcel number.
5. Select the correct property.
6. The property details are automatically filled into the deal record.

::: tip
Linking cadastral data to a deal allows RELS to periodically check for changes (new plomby, ownership changes) and notify you.
:::

## Data Freshness

- Cadastral data is fetched in real time from CUZK when you perform a search.
- Results are cached for a short period to reduce load on the government servers.
- Always perform a fresh lookup before critical steps like contract signing or cadastral submission.
