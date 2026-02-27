# Settings

The Settings module provides administration tools for managing users, roles, and system configuration. Access to Settings is restricted to users with the **lawyer** role.

## Navigating to Settings

Click **Settings** in the sidebar navigation. This menu item is only visible to users with the lawyer role.

::: warning
Settings changes affect the entire system and all users. Make changes carefully and verify the results.
:::

## User Management

### Viewing Users

The user list displays all registered accounts:

| Column | Description |
|--------|-------------|
| **Name** | User's display name |
| **Email** | Login email address |
| **Role** | Lawyer, Assistant, or Client |
| **Status** | Active or Disabled |
| **Last Login** | Date and time of last authentication |

### Adding a New User

1. Go to **Settings** > **Users**.
2. Click **Add User**.
3. Fill in the required fields:
   - **Email** — The user's email address (used for login)
   - **Display Name** — Full name as shown in the app
   - **Role** — Select Lawyer, Assistant, or Client
4. Click **Create**.
5. The user receives an email with instructions to set their password.

::: tip
For client accounts, you can link the user to a specific contact record so that the client portal shows only their relevant deals.
:::

### Editing a User

1. Click a user in the list to open their detail.
2. Modify the **display name**, **role**, or **status**.
3. Click **Save**.

### Role Assignment

Roles determine what a user can access:

| Role | Dashboard | Deals | Cases | Tasks | Contacts | Finance | Attendance | Registries | Settings |
|------|-----------|-------|-------|-------|----------|---------|------------|------------|----------|
| **Lawyer** | Full | Full | Full | Full | Full | Full | All members | Full | Full |
| **Assistant** | Full | Edit | Edit | Edit | Edit | View | Own only | Full | None |
| **Client** | Limited | Own only | None | None | None | None | None | None | None |

### Disabling a User

To prevent a user from logging in without deleting their account:

1. Open the user detail.
2. Change the **Status** to **Disabled**.
3. Click **Save**.

The user will be logged out and unable to sign in until re-enabled.

## Office Configuration

### Office Details

Set the basic office information used in invoices and correspondence:

- **Office Name** — Legal practice name
- **Address** — Office street address
- **ICO** — Company identification number
- **DIC** — VAT identification number
- **Bank Account** — Default account for invoices
- **Phone** and **Email** — Office contact information

### Invoice Settings

Configure invoice defaults:

- **Invoice Number Prefix** — e.g., "2026" for invoices numbered 2026001, 2026002, etc.
- **Default VAT Rate** — Standard VAT percentage applied to new invoice items
- **Payment Terms** — Default number of days until invoice due date
- **Invoice Footer Text** — Text printed at the bottom of every invoice

## System Settings

### SP.ZN. Counters

View and manage the file reference number counters:

- **Deal Counter (500xxx)** — Shows the next available deal SP.ZN.
- **Case Counter (636xxx)** — Shows the next available case SP.ZN.

::: warning
Do not manually adjust counters unless you need to skip numbers for a specific reason. Incorrect counter values can cause duplicate SP.ZN. numbers.
:::

### Data Backup

- RELS data is stored in Firebase Firestore with automatic backups.
- The Settings page shows the **last backup timestamp**.
- Lawyers can trigger a **manual backup export** that downloads a JSON snapshot of all data.

### Notification Preferences

Configure how the system sends notifications:

- **In-App Notifications** — Always enabled
- **Email Notifications** — Toggle on/off for task assignments, deadlines, and escrow events
- **Daily Digest** — Receive a daily summary email of pending tasks and upcoming deadlines

## Audit Log

The audit log records all significant actions in the system:

- User logins and logouts
- Deal and case creation, modification, and deletion
- Role changes and user management actions
- Invoice creation and payment recording

### Viewing the Audit Log

1. Go to **Settings** > **Audit Log**.
2. Filter by **user**, **action type**, or **date range**.
3. Click any entry to see the full details, including before/after values for edits.

The audit log is read-only and cannot be modified or deleted.
