// Routing helpers for reading task ID and linking to other pages.
import { Link, useParams } from "react-router-dom";
// Task context lookup helper.
import { useTasks } from "../context/TaskContext";

// Local map from internal status code to user-friendly label.
const statusLabelMap = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

// Task details page for one selected task.
export default function TaskDetailsPage() {
  // Extract :id parameter from URL.
  const { id } = useParams();
  // Pull getter from context.
  const { getTaskById } = useTasks();

  // Find task by ID if present.
  const task = id ? getTaskById(id) : undefined;

  // Guard: show fallback card if no matching task exists.
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

  return (
    <main className="container page-shell">
      <section className="card panel">
        {/* Main task heading. */}
        <h1>{task.title}</h1>
        <p>
          {/* Colored status badge based on task status class name. */}
          <span className={`status-pill ${task.status}`}>
            {statusLabelMap[task.status]}
          </span>
        </p>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Created At:</strong> {task.createdAt}
        </p>

        <div className="row">
          {/* Route to edit this specific task. */}
          <Link className="btn btn-primary" to={`/edit/${task.id}`}>
            Edit Task
          </Link>
          {/* Quick route back to dashboard. */}
          <Link className="btn btn-soft" to="/">
            Back
          </Link>
        </div>
      </section>
    </main>
  );
}
