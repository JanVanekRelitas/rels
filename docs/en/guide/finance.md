# Finance

The Finance module provides a financial overview of the office, including invoicing, payment tracking, fee management, and per-deal financial summaries.

## Navigating to Finance

Click **Finance** in the sidebar navigation for the global financial overview. You can also view deal-specific finances from the **Finance tab** in any deal detail.

## Financial Overview

The main Finance page shows:

- **Total revenue** for the selected period
- **Outstanding invoices** — Invoices not yet paid
- **Overdue payments** — Invoices past their due date
- **Monthly breakdown** — Revenue chart by month

### Filtering

- Select a **date range** (month, quarter, year, or custom)
- Filter by **deal** (SP.ZN.), **client**, or **payment status**

## Invoices

### Creating an Invoice

1. Click **New Invoice** from the Finance page, or go to a deal's Finance tab and click **Add Invoice**.
2. Fill in the fields:
   - **Client** — Select the invoiced party from contacts
   - **Linked Deal** — Associate with a deal (optional but recommended)
   - **Items** — Add line items with description, quantity, unit price, and VAT rate
   - **Due Date** — Payment deadline
   - **Notes** — Optional text to appear on the invoice
3. Click **Save** to create the invoice as a draft.
4. Click **Finalize** to assign an invoice number and lock the invoice for editing.

::: tip
Finalized invoices receive a sequential invoice number automatically. Draft invoices can be edited freely before finalization.
:::

### Invoice Statuses

| Status | Description |
|--------|-------------|
| **Draft** | Invoice created but not yet finalized |
| **Issued** | Invoice finalized and sent to the client |
| **Paid** | Payment received in full |
| **Partially Paid** | Some payment received, balance outstanding |
| **Overdue** | Past due date without full payment |
| **Cancelled** | Invoice voided (a credit note is generated) |

### Recording a Payment

1. Open the invoice detail.
2. Click **Record Payment**.
3. Enter the **amount received**, **date**, and **payment method** (bank transfer, cash, etc.).
4. Click **Save**.
5. If the full amount is received, the status changes to **Paid** automatically.

## Fee Management

RELS tracks fees charged for legal services:

- **Fixed fees** — A flat rate for a specific service (e.g., deal management)
- **Hourly fees** — Based on time tracked in the [Attendance](/en/guide/attendance) module
- **Court fees** — Fees paid to courts or administrative bodies (reimbursable)

### Adding a Fee to a Deal

1. Open the deal detail and go to the **Finance** tab.
2. Click **Add Fee**.
3. Select the **fee type** and enter the **amount**.
4. Add a **description** of the service.
5. Click **Save**.

Fees appear in the deal's financial summary and can be included in invoices.

::: warning
Only users with the lawyer role can create or modify invoices and fees. Assistants can view financial data but cannot make changes.
:::

## Financial Reports per Deal

Each deal's Finance tab shows a complete financial summary:

- **Total fees** charged
- **Invoices** issued for this deal
- **Payments** received
- **Outstanding balance**
- **Escrow status** (linked from the [Escrow](/en/guide/escrow) module)

## Export

Financial data can be exported for accounting purposes:

1. Go to the Finance page.
2. Set the desired **date range** and **filters**.
3. Click **Export**.
4. Choose the format: **CSV** or **PDF**.
5. The file downloads to your computer.
