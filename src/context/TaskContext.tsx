// React context primitives and hooks for global state.
import { createContext, useContext, useMemo, useState } from "react";
// ReactNode type for provider children.
import type { ReactNode } from "react";
// Shared task types used by context API.
import type { Task, TaskFormData } from "../types/task";

// Public shape of data/actions available from TaskContext.
interface TaskContextValue {
  // Full task list currently in memory.
  tasks: Task[];
  // Create a new task from form payload.
  addTask: (data: TaskFormData) => void;
  // Update an existing task by ID.
  updateTask: (id: string, data: TaskFormData) => void;
  // Remove a task by ID.
  deleteTask: (id: string) => void;
  // Lookup helper for details/edit pages.
  getTaskById: (id: string) => Task | undefined;
}

// Initialize context as undefined so we can throw if hook is used incorrectly.
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// Starter data shown when app first loads.
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Finish assignment",
    description: "Complete the TypeScript task manager project",
    dueDate: "2026-03-07",
    status: "in-progress",
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    title: "Read TypeScript notes",
    description: "Review interfaces and type aliases",
    dueDate: "2026-03-04",
    status: "todo",
    createdAt: "2026-03-01",
  },
];

// Provider component wraps app and supplies task state + actions.
export function TaskProvider({ children }: { children: ReactNode }) {
  // tasks is the single source of truth for all task pages.
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Add a new task to the beginning of the list.
  const addTask = (data: TaskFormData) => {
    // Build a full Task object from form input.
    const newTask: Task = {
      // Date.now gives a simple unique ID for local/demo usage.
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      status: data.status,
      // Store creation date in YYYY-MM-DD format.
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Prepend new task so it appears near top of dashboard.
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  // Update one task in place by mapping over current list.
  const updateTask = (id: string, data: TaskFormData) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        // Replace only the matching task ID.
        if (task.id === id) {
          return {
            // Keep unchanged fields like id/createdAt.
            ...task,
            // Overwrite editable fields from form payload.
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
            status: data.status,
          };
        }
        return task;
      }),
    );
  };

  // Remove one task by filtering out matching ID.
  const deleteTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  // Read helper used by details and edit pages.
  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  // Memoize context object so consumers rerender only when tasks change.
  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [tasks],
  );

  // Expose value to all descendant components.
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Convenience hook for consuming TaskContext with safety check.
export function useTasks() {
  const context = useContext(TaskContext);

  // Throwing here catches usage outside provider during development.
  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
