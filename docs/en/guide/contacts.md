# Contacts

The Contacts module is a centralized database of all people and organizations involved in deals and cases. Contacts are linked to deals and cases by their role (buyer, seller, bank, plaintiff, etc.).

## Navigating to Contacts

Click **Contacts** in the sidebar navigation to open the contact list.

## Contact List View

The contact list displays all contacts in a searchable table:

| Column | Description |
|--------|-------------|
| **Name** | Full name (person) or company name (organization) |
| **Type** | Individual or Company |
| **Email** | Primary email address |
| **Phone** | Primary phone number |
| **Linked Deals** | Count of deals this contact is associated with |

### Filtering and Search

- Filter by **type** (Individual / Company)
- Search by **name**, **email**, **phone**, or **ICO** (company ID number)
- Sort by name or number of linked deals

## Adding a New Contact

1. Click the **New Contact** button.
2. Select the contact type: **Individual** or **Company**.

### Individual Fields

- **First Name** and **Last Name** (required)
- **Date of Birth**
- **Personal ID Number** (rodne cislo) — Used in Czech legal documents
- **Email** and **Phone**
- **Address** — Permanent residence
- **Bank Account** — IBAN or Czech account number
- **Notes** — Free-text field for internal notes

### Company Fields

- **Company Name** (required)
- **ICO** (identification number) — 8-digit Czech company ID
- **DIC** (tax ID) — VAT registration number
- **Registered Office** — Company address
- **Statutory Representative** — Name of the person authorized to act
- **Email**, **Phone**, **Bank Account**, **Notes**

::: tip
When entering an ICO, RELS can automatically look up company details from the ARES registry. See [Registry Lookups](/en/guide/registry).
:::

## Contact Detail

Click a contact to open their detail view:

### Overview

- All fields listed above
- Date the contact was created and last modified

### Linked Deals and Cases

A list of all deals and cases where this contact appears as a party:

- Shows the **SP.ZN.**, **title**, and **role** (buyer, seller, plaintiff, etc.)
- Click any entry to navigate to the deal or case detail

### Linking a Contact to a Deal or Case

Contacts are typically linked when creating or editing a deal or case. However, you can also link from the contact detail:

1. Open the contact.
2. Go to the **Linked Deals** tab.
3. Click **Link to Deal** or **Link to Case**.
4. Search for the deal/case by SP.ZN. or title.
5. Select the **role** this contact plays in the deal/case.
6. Click **Save**.

## Contact Roles

When a contact is linked to a deal or case, they are assigned a role:

| Role | Used In | Description |
|------|---------|-------------|
| **Buyer** | Deals | The purchasing party |
| **Seller** | Deals | The selling party |
| **Bank** | Deals | Mortgage or financing institution |
| **Agent** | Deals | Real estate broker |
| **Plaintiff** | Cases | The party bringing the case |
| **Defendant** | Cases | The party being sued |
| **Witness** | Cases | A witness in the proceedings |
| **Representative** | Both | Legal representative of a party |

## ICO Lookup

When adding a company contact, you can use the ICO field to auto-fill:

1. Enter the **8-digit ICO** number.
2. Click the **Lookup** button next to the field.
3. RELS queries the ARES registry and fills in the company name, address, and DIC automatically.

::: warning
ARES data is provided by the Czech government and may occasionally be outdated. Always verify critical details.
:::

## Deleting a Contact

Contacts that are linked to active deals or cases cannot be deleted. To remove a contact:

1. First unlink the contact from all deals and cases.
2. Open the contact detail.
3. Click **Delete** in the action menu.
4. Confirm the deletion.
