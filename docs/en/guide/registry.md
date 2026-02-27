# Registry Lookups

RELS integrates with Czech government registries to provide quick access to public data about companies, addresses, and properties. This saves time by eliminating the need to manually search government websites.

## Navigating to Registry Lookups

Click **Registries** in the sidebar navigation. The page offers three tabs: **ARES**, **RUIAN**, and **Cadastral**.

## ARES (Economic Subjects Register)

ARES (Administrativni registr ekonomickych subjektu) is the Czech business register. Use it to look up company information by ICO (company identification number) or name.

### Searching ARES

1. Go to **Registries** > **ARES**.
2. Enter one of the following:
   - **ICO** — The 8-digit company identification number
   - **Company Name** — Full or partial name
3. Click **Search**.

### ARES Results

The search returns:

| Field | Description |
|-------|-------------|
| **ICO** | Company identification number |
| **Company Name** | Official registered name |
| **Legal Form** | s.r.o., a.s., OSVC, etc. |
| **Registered Office** | Official address |
| **DIC** | VAT identification number (if registered) |
| **Date of Registration** | When the entity was registered |
| **Status** | Active, In Liquidation, Dissolved |

::: tip
When adding a company contact, use the ICO lookup to auto-fill details. Click the **Import to Contacts** button in the ARES results to create a contact record directly.
:::

### ARES Data Usage

ARES data is commonly used for:

- Verifying counterparty details before signing contracts
- Auto-filling company information in contacts
- Checking if a company is still active

## RUIAN (Address Register)

RUIAN (Registr uzemni identifikace, adres a nemovitosti) is the Czech register of territorial identification, addresses, and real estate. Use it to validate and standardize addresses.

### Searching RUIAN

1. Go to **Registries** > **RUIAN**.
2. Enter search criteria:
   - **Street and number** — e.g., "Masarykova 10"
   - **City** — e.g., "Brno"
   - **ZIP Code** — e.g., "60200"
3. Click **Search**.

### RUIAN Results

| Field | Description |
|-------|-------------|
| **Address Point ID** | Unique identifier in RUIAN |
| **Full Address** | Standardized official address |
| **Municipality** | City or town name |
| **District** | City district (for larger cities) |
| **Cadastral Area** | Katastralni uzemi name and code |
| **GPS Coordinates** | Latitude and longitude |
| **Building Parcel** | Associated parcel number |

### RUIAN Data Usage

RUIAN is useful for:

- Standardizing addresses in contacts and deal records
- Finding the correct cadastral area for property lookups
- Verifying that an address exists and is valid

::: warning
RUIAN only contains officially registered address points. New buildings may not appear immediately after construction.
:::

## Cadastral Registry

The Cadastral tab provides access to property data from the Czech Cadastral Office (CUZK). For detailed documentation on cadastral lookups, see the dedicated [Cadastral](/en/guide/cadastral) page.

Quick summary of available searches:

- **LV Lookup** — Search by ownership certificate number
- **Parcel Lookup** — Search by parcel number
- **Owner Lookup** — Search by owner name or personal/company ID

## General Tips for Registry Lookups

- All registry searches query live government data and may take a few seconds.
- Results are cached briefly to improve performance on repeated searches.
- Registry data is read-only in RELS — you cannot modify government records.
- Use the **Import** buttons to transfer registry data into RELS contacts or deal records.

::: tip
If a government registry is temporarily unavailable (maintenance or outage), RELS will display a notification. Try again later.
:::

## Permissions

- **Lawyers** and **Assistants** can perform all registry lookups.
- **Clients** do not have access to the Registries module.
