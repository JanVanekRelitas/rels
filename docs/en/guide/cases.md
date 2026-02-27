# Legal Cases

The Legal Cases module tracks court proceedings, disputes, and other legal matters. Each case is identified by a unique file reference number (SP.ZN.) starting with **636xxx**, distinguishing it from deals (500xxx).

## Navigating to Cases

Click **Cases** in the sidebar navigation to open the case list.

## Case List View

The case list displays all legal cases in a table:

| Column | Description |
|--------|-------------|
| **SP.ZN.** | Unique file reference number (e.g., 636018) |
| **Title** | Short description of the case |
| **Type** | Category of legal matter (dispute, enforcement, etc.) |
| **Status** | Open, In Progress, Closed, or Archived |
| **Court** | Name of the court handling the case |
| **Client** | Primary client involved |

### Filtering

- Filter by **status**, **type**, or **court**
- Search by SP.ZN., title, or client name
- Toggle between active and archived cases

## Creating a New Case

1. Click the **New Case** button at the top of the case list.
2. The system assigns the next available **SP.ZN.** in the 636xxx series.
3. Fill in the required fields:
   - **Title** — Description of the legal matter
   - **Case Type** — Dispute, Enforcement, Administrative, or Other
   - **Court** — Select or enter the court name
   - **Client** — Select from existing contacts
   - **Court File Number** — The official court reference, if already assigned
4. Click **Save** to create the case.

::: tip
If the case relates to a real estate deal, link it immediately so all team members can see the connection.
:::

## Case Detail

Clicking a case opens its detail view with the following sections:

### Overview

- SP.ZN. and title
- Case type and current status
- Court name and official court file number
- Assigned lawyer and assistant
- Date opened and last activity

### Parties

All parties involved in the case:

- **Plaintiff / Applicant**
- **Defendant / Respondent**
- **Legal representatives**
- **Witnesses** (if tracked)

Each party links to the [Contacts](/en/guide/contacts) module.

### Timeline

The case timeline records all significant events in chronological order:

- Filings and submissions
- Hearings (scheduled and completed)
- Court decisions and rulings
- Deadlines for appeals or responses

#### Adding a Timeline Event

1. Go to the **Timeline** tab in the case detail.
2. Click **Add Event**.
3. Select the **event type** (Filing, Hearing, Decision, Deadline, Note).
4. Enter the **date**, **description**, and any **attachments**.
5. Click **Save**.

::: warning
Court deadlines are strictly enforced. When adding a deadline event, make sure the date is accurate. RELS will generate reminder tasks automatically.
:::

### Linked Deals

Cases can be linked to one or more deals in the 500xxx series:

1. Go to the **Linked Deals** tab.
2. Click **Link Deal**.
3. Search for the deal by SP.ZN. or title.
4. Select the deal and confirm.

Linked deals appear in both the case detail and the deal detail for easy cross-reference.

### Tasks

Shows tasks linked to this case. You can create case-specific tasks directly from here. See [Tasks](/en/guide/tasks).

## Closing a Case

When a case is resolved:

1. Open the case detail.
2. Click **Close Case** in the action menu.
3. Enter a **closing note** summarizing the outcome.
4. The case status changes to **Closed** and can later be archived.

## Differences Between Deals and Cases

| Aspect | Deals (500xxx) | Cases (636xxx) |
|--------|---------------|----------------|
| **Purpose** | Real estate transactions | Legal proceedings |
| **Workflow** | Phase-based (9 phases) | Event-based (timeline) |
| **Parties** | Buyer, Seller, Bank | Plaintiff, Defendant |
| **Completion** | Escrow release and archival | Court decision and closure |
