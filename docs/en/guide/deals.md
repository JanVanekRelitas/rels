# Deals

The Deals module is the core of RELS. It manages real estate transactions from the first client contact through to completion and archival. Each deal is identified by a unique file reference number (SP.ZN.) starting with **500xxx**.

## Navigating to Deals

Click **Deals** in the sidebar navigation to open the deal list view.

## Deal List View

The deal list displays all deals as a filterable table:

- **SP.ZN.** — The unique file reference number (e.g., 500142)
- **Title** — Short description of the deal (e.g., "Sale of apartment, Brno")
- **Phase** — Current workflow phase
- **Status** — Active, Completed, or Archived
- **Client** — Primary client name
- **Created** — Date the deal was entered into the system

### Filtering and Sorting

- Filter by **phase**, **status**, or **assigned lawyer**
- Search by SP.ZN., title, or client name
- Sort by any column by clicking the column header

## Creating a New Deal

1. Click the **New Deal** button at the top of the deal list.
2. The system assigns the next available **SP.ZN.** in the 500xxx series automatically.
3. Fill in the required fields:
   - **Title** — Short description of the transaction
   - **Deal Type** — Sale, Purchase, Transfer, or Other
   - **Client** — Select from existing contacts or create a new one
   - **Property** — Address or parcel identification
4. Click **Save** to create the deal.

::: tip
You can also create a deal from the Dashboard using the Quick Action button.
:::

## Deal Detail

Clicking a deal in the list opens its detail view. The detail is organized into tabs:

### Overview Tab

- **SP.ZN.** and title
- **Deal type** and current **phase**
- **Property address** and cadastral information
- **Date created** and **last modified**

### Parties Tab

Lists all people and organizations involved:

- **Buyer(s)** — The purchasing party
- **Seller(s)** — The selling party
- **Bank** — Financing institution (if applicable)
- **Real estate agent** — Broker involved in the deal

Each party links to a record in the [Contacts](/en/guide/contacts) module.

### Phases Tab

Deals progress through a defined workflow. The phases are:

1. **Initial Contact** — Client inquiry received
2. **Document Collection** — Gathering contracts, title deeds, extracts
3. **Draft Preparation** — Drafting purchase contract and related documents
4. **Signing** — Parties sign the contracts
5. **Escrow Deposit** — Buyer deposits funds into escrow
6. **Cadastral Submission** — Application filed with the Cadastral Office
7. **Cadastral Approval** — Ownership transfer recorded
8. **Escrow Release** — Funds released to the seller
9. **Completion** — Deal finalized and archived

::: warning
Phases must be completed in order. You cannot skip ahead without marking the current phase as done.
:::

### Advancing a Phase

1. Open the deal detail and go to the **Phases** tab.
2. Review the current phase requirements.
3. Click **Complete Phase** when all conditions are met.
4. The deal automatically moves to the next phase.

### Tasks Tab

Shows tasks linked to this deal. You can create new tasks directly from here. See [Tasks](/en/guide/tasks) for details.

### Finance Tab

Shows financial records related to this deal, including invoices and escrow status. See [Finance](/en/guide/finance) and [Escrow](/en/guide/escrow).

## Archiving a Deal

Once a deal reaches the Completion phase, it can be archived:

1. Open the deal detail.
2. Click **Archive Deal** in the action menu.
3. Archived deals are hidden from the default list view but can be found using the status filter.
