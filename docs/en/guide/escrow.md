# Escrow

The Escrow module manages escrow accounts (uschova) used in real estate transactions. Escrow is a critical step where the buyer's funds are held securely until the property transfer is officially recorded by the Cadastral Office.

## Navigating to Escrow

Click **Escrow** in the sidebar navigation, or access escrow information from the **Finance tab** of a specific deal.

## Escrow List View

The escrow list displays all escrow accounts:

| Column | Description |
|--------|-------------|
| **Escrow ID** | Unique identifier for the escrow account |
| **Linked Deal** | SP.ZN. of the associated deal |
| **Amount** | Total escrow amount (CZK) |
| **Status** | Pending, Funded, Partially Released, Released, or Cancelled |
| **Created** | Date the escrow was set up |

### Filtering

- Filter by **status** or **date range**
- Search by **Escrow ID** or **linked deal SP.ZN.**

## Creating an Escrow Account

1. Click the **New Escrow** button, or create from a deal's Finance tab.
2. Fill in the required fields:
   - **Linked Deal** — Select the deal (SP.ZN. 500xxx) this escrow serves
   - **Escrow Amount** — The total expected deposit amount in CZK
   - **Depositor** — The party depositing funds (typically the buyer)
   - **Beneficiary** — The party who will receive funds (typically the seller)
   - **Escrow Account Number** — The bank account designated for this escrow
   - **Release Conditions** — Description of conditions that must be met before release (e.g., "Ownership transfer recorded in cadastre")
3. Click **Save**.

::: tip
RELS automatically creates a task for the assignee to verify when escrow deposit conditions are met.
:::

## Escrow Detail

Click an escrow entry to open its detail view:

### Overview

- All fields listed above
- Current balance and status
- Links to the associated deal and contacts (depositor, beneficiary)

### Transaction Log

A chronological record of all movements on the escrow account:

| Transaction | Description |
|-------------|-------------|
| **Deposit** | Funds received into escrow |
| **Partial Release** | A portion of funds released to the beneficiary |
| **Full Release** | All remaining funds released |
| **Return** | Funds returned to the depositor (deal fell through) |

#### Recording a Deposit

1. Open the escrow detail.
2. Click **Record Deposit**.
3. Enter the **amount**, **date**, and **reference** (bank transaction ID).
4. Click **Save**.
5. The escrow status updates automatically (Pending becomes Funded when the full amount is received).

#### Releasing Funds

1. Open the escrow detail.
2. Verify that the **release conditions** have been met.
3. Click **Release Funds**.
4. Choose **Full Release** or **Partial Release**.
5. For partial release, enter the **amount** to release.
6. Enter the **date** and any **notes**.
7. Click **Confirm Release**.

::: warning
Fund releases are irreversible in the system. Double-check the amount and conditions before confirming. Only users with the lawyer role can authorize a release.
:::

## Escrow Status Flow

The escrow account progresses through these statuses:

1. **Pending** — Escrow created, awaiting deposit
2. **Funded** — Full amount deposited
3. **Partially Released** — Some funds released, remainder held
4. **Released** — All funds distributed
5. **Cancelled** — Escrow cancelled (funds returned to depositor)

## Linking to Deal Phases

Escrow is closely tied to deal phases:

- **Phase 5 (Escrow Deposit)** — Buyer deposits funds; escrow status should become Funded
- **Phase 8 (Escrow Release)** — After cadastral approval, funds are released to the seller

When escrow status changes, RELS can automatically advance the linked deal to the corresponding phase.
