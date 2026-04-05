// Routing hooks and Link component.
import { Link, useNavigate, useParams } from "react-router-dom";
// Shared task form component.
import TaskForm from "../components/TaskForm";
// Task context actions/selectors.
import { useTasks } from "../context/TaskContext";
// Type for form payload.
import type { TaskFormData } from "../types/task";

// Page for editing one existing task.
export default function EditTaskPage() {
  // Dynamic route param from /edit/:id.
  const { id } = useParams();
  // Programmatic navigation helper.
  const navigate = useNavigate();
  // Context helpers for reading/updating tasks.
  const { getTaskById, updateTask } = useTasks();

  // Fetch the task from context if ID exists.
  const task = id ? getTaskById(id) : undefined;

  // Guard: show fallback UI if task ID is invalid or missing.
  if (!task) {
    return (
      <main className="container page-shell">
        <section className="card panel">
          <h2>Task not found</h2>
          <Link className="btn btn-soft" to="/">
            Back to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  // Pre-fill form with existing task values.
  const initialData: TaskFormData = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    status: task.status,
  };

  // Called by TaskForm when user submits valid updated values.
  const handleUpdateTask = (data: TaskFormData) => {
    // Persist updates into context state.
    updateTask(task.id, data);
    // Navigate to details page for the updated task.
    navigate(`/tasks/${task.id}`);
  };

  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Edit Task</h1>
        <p className="muted">Update fields below and save your changes.</p>
      </section>
      {/* Reusable form configured for edit mode. */}
      <TaskForm
        initialData={initialData}
        onSubmit={handleUpdateTask}
        submitText="Update Task"
      />
    </main>
  );
}
