// useNavigate enables programmatic route changes after submit.
import { useNavigate } from "react-router-dom";
// Shared task form component for collecting task data.
import TaskForm from "../components/TaskForm";
// Task context hook with addTask action.
import { useTasks } from "../context/TaskContext";
// Type for form payload shape.
import type { TaskFormData } from "../types/task";

// Blank/default values used when creating a new task.
const emptyTask: TaskFormData = {
  title: "",
  description: "",
  dueDate: "",
  status: "todo",
};

// Page for creating a brand-new task.
export default function CreateTaskPage() {
  // addTask writes into global task state.
  const { addTask } = useTasks();
  // navigate lets us redirect after successful creation.
  const navigate = useNavigate();

  // Called by TaskForm when user submits valid data.
  const handleCreateTask = (data: TaskFormData) => {
    // Persist task into context state.
    addTask(data);
    // Return user to dashboard after creation.
    navigate("/");
  };

  return (
    <main className="container page-shell">
      <section className="card panel">
        <h1>Create Task</h1>
        <p className="muted">
          Add a task with a clear title, details, and deadline.
        </p>
      </section>
      {/* Reusable form configured for "create" mode. */}
      <TaskForm
        initialData={emptyTask}
        onSubmit={handleCreateTask}
        submitText="Create Task"
      />
    </main>
  );
}
