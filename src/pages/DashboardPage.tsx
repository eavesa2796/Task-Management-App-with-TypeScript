// Hooks for memoized derived values and local UI state.
import { useMemo, useState } from "react";
// Link for client-side navigation.
import { Link } from "react-router-dom";
// Access task data and delete action from global context.
import { useTasks } from "../context/TaskContext";
// Task status type used for strongly-typed filtering.
import type { TaskStatus } from "../types/task";

// Maps internal status values to readable UI text.
const statusLabelMap: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

// Main dashboard: list, search, filter, stats, and actions.
export default function DashboardPage() {
  // Pull current tasks and delete action from context.
  const { tasks, deleteTask } = useTasks();
  // Search query typed by the user.
  const [query, setQuery] = useState("");
  // Status filter value; "all" means no status restriction.
  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatus>("all");

  // Derive filtered task list only when dependencies change.
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Combine searchable fields and compare in lowercase for case-insensitive search.
      const searchText = `${task.title} ${task.description}`.toLowerCase();
      const matchesQuery = searchText.includes(query.trim().toLowerCase());
      // Match selected status unless "all" is selected.
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      // Keep only tasks matching both filters.
      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, statusFilter]);

  // Derive quick stats cards from current task list.
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      inProgress: tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    };
  }, [tasks]);

  // Ask for confirmation before deleting to prevent accidental removals.
  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    const confirmed = window.confirm(`Delete task \"${taskTitle}\"?`);
    if (confirmed) {
      // Remove task from global state.
      deleteTask(taskId);
    }
  };

  return (
    <main className="container page-shell">
      {/* Header card with title and create-task shortcut. */}
      <section className="card">
        <div className="split">
          <div>
            <h1>Task Dashboard</h1>
            <p className="muted">
              Track your workflow and keep deadlines visible.
            </p>
          </div>
          <Link className="btn btn-primary" to="/create">
            New Task
          </Link>
        </div>
      </section>

      {/* Stats overview section. */}
      <section className="stats-grid" aria-label="Task statistics">
        <article className="stat">
          <span className="muted">Total Tasks</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat">
          <span className="muted">To Do</span>
          <strong>{stats.todo}</strong>
        </article>
        <article className="stat">
          <span className="muted">In Progress</span>
          <strong>{stats.inProgress}</strong>
        </article>
        <article className="stat">
          <span className="muted">Done</span>
          <strong>{stats.done}</strong>
        </article>
      </section>

      {/* Search and status filter controls. */}
      <section className="card">
        <div className="form-grid">
          <div className="field field-wide">
            <label htmlFor="search">Search tasks</label>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title or description"
              style={{ width: "100%" }}
            />
          </div>

          <div className="field">
            <label htmlFor="statusFilter">Filter by status</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "all" | TaskStatus)
              }
              style={{ width: "100%" }}
            >
              <option value="all">All statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </section>

      {/* Empty state if no task matches current filters. */}
      {filteredTasks.length === 0 ? (
        <div className="card">No tasks yet. Create your first task.</div>
      ) : (
        // Render one card per filtered task.
        filteredTasks.map((task) => (
          <div className="card" key={task.id}>
            <div className="split">
              <h3>{task.title}</h3>
              <span className={`status-pill ${task.status}`}>
                {statusLabelMap[task.status]}
              </span>
            </div>
            <p className="muted">{task.description}</p>
            <p>
              <strong>Due:</strong> {task.dueDate}
            </p>
            <div className="row">
              {/* Detail route for full task information. */}
              <Link className="btn btn-soft" to={`/tasks/${task.id}`}>
                View Details
              </Link>
              {/* Edit route for updating this task. */}
              <Link className="btn btn-soft" to={`/edit/${task.id}`}>
                Edit
              </Link>
              {/* Destructive action with confirmation handler. */}
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteTask(task.id, task.title)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
