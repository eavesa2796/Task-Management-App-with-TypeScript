// All allowed status values for a task.
export type TaskStatus = "todo" | "in-progress" | "done";

// Full persisted task shape used across app state and pages.
export interface Task {
  // Unique identifier used in routes and update/delete operations.
  id: string;
  // Short summary displayed in dashboard cards.
  title: string;
  // Longer details shown in dashboard/details pages.
  description: string;
  // Due date in YYYY-MM-DD format.
  dueDate: string;
  // Current workflow status.
  status: TaskStatus;
  // Creation date in YYYY-MM-DD format.
  createdAt: string;
}

// Editable task fields collected by the form.
export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

// Optional validation errors keyed by form field.
export interface TaskFormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}
