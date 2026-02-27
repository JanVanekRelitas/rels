# Attendance

The Attendance module provides time tracking for the office team. Team members log their daily work hours, and the system generates monthly overviews for reporting and payroll purposes.

## Navigating to Attendance

Click **Attendance** in the sidebar navigation.

## Who Can Use Attendance

- **Lawyers** can view and edit attendance for all team members
- **Assistants** can log and view their own attendance
- **Clients** do not have access to the Attendance module

## Daily Attendance Logging

### Logging Your Hours

1. Go to **Attendance**.
2. The current day is selected by default. To log a different day, click the date and select from the calendar.
3. Fill in the fields:
   - **Arrival Time** — When you started work
   - **Departure Time** — When you finished work
   - **Break Duration** — Total break time in minutes (default: 30)
   - **Work Type** — Office, Remote, or Client Visit
   - **Note** — Optional description of work performed
4. Click **Save**.

::: tip
If you forget to log your hours, you can go back and fill in previous days. The system highlights days that have not been logged yet.
:::

### Editing a Log Entry

1. Click on the day you want to edit in the calendar or list view.
2. Modify the fields as needed.
3. Click **Save**.

::: warning
Lawyers can edit attendance entries for any team member. Assistants can only edit their own entries, and only within the current month.
:::

## Monthly Overview

The monthly overview displays a summary table for the selected month:

| Column | Description |
|--------|-------------|
| **Date** | Each day of the month |
| **Arrival** | Start time |
| **Departure** | End time |
| **Break** | Break duration |
| **Worked** | Net hours worked (arrival to departure minus breaks) |
| **Type** | Work type (Office, Remote, Client Visit) |
| **Note** | Description of work |

### Summary Row

At the bottom of the monthly table:

- **Total Hours** — Sum of all worked hours for the month
- **Working Days** — Number of days logged
- **Average Hours/Day** — Total hours divided by working days

## Switching Between Team Members

If you have the lawyer role:

1. Open the **Attendance** page.
2. Use the **Team Member** dropdown at the top to select a different person.
3. The calendar and monthly overview update to show that person's records.

## Holidays and Absences

The attendance system recognizes the following absence types:

- **Vacation** — Paid leave
- **Sick Leave** — Illness or medical appointment
- **National Holiday** — Czech public holidays (filled automatically)
- **Other** — Conference, training, personal day

To log an absence:

1. Select the day in the calendar.
2. Instead of filling arrival/departure, select the **Absence Type**.
3. Add a **note** if needed.
4. Click **Save**.

## Export

Attendance data can be exported for payroll or record-keeping:

1. Select the **month** and **team member** (or "All" for lawyers).
2. Click **Export**.
3. Choose the format: **CSV** or **PDF**.
4. The file downloads to your computer.

The exported file includes all daily entries, totals, and absence records for the selected period.
