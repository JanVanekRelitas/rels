# Tasks

The Tasks module helps the team track work items, deadlines, and follow-ups across all deals and cases. Tasks can be assigned to specific team members and linked to deals, cases, or kept standalone.

## Navigating to Tasks

Click **Tasks** in the sidebar navigation to open the task list.

## Task List View

The task list shows all tasks in a filterable table:

| Column | Description |
|--------|-------------|
| **Title** | Short description of the task |
| **Assigned To** | Team member responsible |
| **Due Date** | Deadline for completion |
| **Priority** | Low, Medium, or High |
| **Status** | To Do, In Progress, or Done |
| **Linked To** | Associated deal (SP.ZN.) or case, if any |

### Filtering

- **My Tasks** — Shows only tasks assigned to you (default view)
- **All Tasks** — Shows tasks for the entire team (lawyer and assistant roles)
- Filter by **status**, **priority**, **assignee**, or **due date range**
- Search by title or linked SP.ZN.

::: tip
Use the "Overdue" filter to quickly find tasks that have passed their due date without being completed.
:::

## Creating a Task

1. Click the **New Task** button at the top of the task list.
2. Fill in the fields:
   - **Title** — Clear, actionable description (e.g., "Send draft contract to buyer")
   - **Description** — Optional additional details or instructions
   - **Assigned To** — Select a team member from the dropdown
   - **Due Date** — When the task must be completed
   - **Priority** — Low, Medium, or High
   - **Link to Deal/Case** — Optionally associate the task with a deal or case
3. Click **Save**.

### Creating Tasks from a Deal or Case

You can also create tasks directly from a deal or case detail page:

1. Open the deal or case.
2. Go to the **Tasks** tab.
3. Click **Add Task**.
4. The deal or case is automatically linked.

## Task Workflow

Tasks follow a simple three-state workflow:

1. **To Do** — Task has been created but work has not started
2. **In Progress** — Task is actively being worked on
3. **Done** — Task is completed

### Updating Task Status

- Click the **status badge** on the task to cycle through states.
- Or open the task detail and select the new status from the dropdown.

## Task Detail

Click a task in the list to open its detail view:

- **Title** and **description**
- **Assigned to** and **created by**
- **Due date** and **priority**
- **Linked deal or case** (clickable link to the detail)
- **Activity log** — Shows status changes and edits

### Editing a Task

1. Open the task detail.
2. Click **Edit** or modify any field directly.
3. Changes are saved automatically.

::: warning
Only the assignee, the task creator, or a user with the lawyer role can edit or delete a task.
:::

## Automatic Tasks

RELS generates tasks automatically in certain situations:

- **Phase advancement** — When a deal moves to a new phase, tasks for that phase are created for the assigned team members.
- **Court deadlines** — When a deadline event is added to a case timeline, a corresponding task is created.
- **Escrow events** — Tasks are generated when deposits are expected or releases are due.

Automatic tasks are marked with a system badge and cannot be deleted, only completed.

## Task Notifications

- When a task is assigned to you, you receive a notification in the app.
- Overdue tasks generate reminder notifications daily.
- Task completion notifications are sent to the deal or case owner.
