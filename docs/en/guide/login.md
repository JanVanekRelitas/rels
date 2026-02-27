# Login & Authentication

RELS uses Firebase Authentication to manage user access. Every user logs in with an email address and password, and their role determines what they can see and do in the system.

## How to Log In

1. Open the RELS application URL in your browser.
2. Enter your **email address** and **password** in the login form.
3. Click **Sign In**.
4. You will be redirected to the [Dashboard](/en/guide/dashboard).

::: tip
RELS works best in modern browsers: Chrome, Firefox, Safari, or Edge. Make sure your browser is up to date.
:::

## User Roles

Each user account is assigned one of three roles. Roles are set by the administrator (lawyer) and cannot be changed by the user themselves.

### Lawyer

- Full access to every module in the system
- Can create, edit, and delete deals, cases, contacts, and tasks
- Can manage escrow accounts and finances
- Can manage users and system settings
- Can view attendance records for all team members

### Assistant

- Can view and edit deals, cases, contacts, and tasks
- Can log their own attendance
- Can perform registry lookups
- Cannot manage users or change system settings
- Cannot delete deals or cases

### Client

- Read-only access limited to their own deals
- Can view deal status and associated documents
- Cannot see other clients' data or internal notes
- Cannot access tasks, attendance, or settings

::: warning
If you see an "Access Denied" message after logging in, your account may not have a role assigned yet. Contact the office administrator.
:::

## Password Reset

If you forget your password:

1. Click the **Forgot Password?** link on the login screen.
2. Enter the email address associated with your account.
3. Check your inbox for a password reset email from Firebase.
4. Click the link in the email and set a new password.
5. Return to the login page and sign in with your new password.

::: tip
The reset email may take a few minutes to arrive. Check your spam folder if you do not see it.
:::

## Logging Out

To log out of RELS:

1. Click your **user avatar** or **name** in the top-right corner of the screen.
2. Select **Log Out** from the dropdown menu.
3. You will be returned to the login screen.

## Session Behavior

- Your session persists across browser tabs and page refreshes.
- If you close the browser and reopen it, you will remain logged in.
- Sessions expire after an extended period of inactivity for security reasons.
- If your role is changed by an administrator, the new permissions take effect on your next page load.
