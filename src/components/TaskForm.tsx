// useState stores local form values and validation errors.
import { useState } from "react";
// Shared form/task types for strict TypeScript safety.
import type { TaskFormData, TaskFormErrors, TaskStatus } from "../types/task";

// Reusable form contract so create/edit pages can share this component.
interface TaskFormProps {
  // Starting values (blank for create, existing values for edit).
  initialData: TaskFormData;
  // Callback executed only when validation passes.
  onSubmit: (data: TaskFormData) => void;
  // Button/header label so parent controls wording.
  submitText: string;
}

// Shared Task form used by both create and edit pages.
export default function TaskForm({
  initialData,
  onSubmit,
  submitText,
}: TaskFormProps) {
  // Controlled form state: every input reads/writes this object.
  const [formData, setFormData] = useState<TaskFormData>(initialData);
  // Error object keyed by field name.
  const [errors, setErrors] = useState<TaskFormErrors>({});

  // Generic field update handler.
  const handleChange = (field: keyof TaskFormData, value: string) => {
    // Clear the current field error as soon as user edits that field.
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));

    // Status is a union type, so cast from string to TaskStatus safely.
    if (field === "status") {
      setFormData((prev) => ({ ...prev, status: value as TaskStatus }));
      return;
    }

    // For text/date fields, write plain string value.
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validates current formData and stores user-facing error messages.
  const validate = (): boolean => {
    // Fresh error object for this validation pass.
    const newErrors: TaskFormErrors = {};

    // Title required + minimum length rule.
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    // Description required + minimum length rule.
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Due date must be selected.
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    // Save errors to state so UI can render them.
    setErrors(newErrors);

    // Form is valid only when error object has no keys.
    return Object.keys(newErrors).length === 0;
  };

  // Handles native form submit event.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent browser page reload on submit.
    event.preventDefault();

    // Stop submit flow if any validation rule fails.
    if (!validate()) {
      return;
    }

    // Pass valid form data back to parent page.
    onSubmit(formData);
  };

  return (
    // onSubmit wired to our validated handler.
    <form className="card panel" onSubmit={handleSubmit}>
      {/* Reusable heading/button text provided by parent. */}
      <h2>{submitText}</h2>
      <p className="muted">Fill in all required fields before submitting.</p>

      <div className="form-grid">
        <div className="field field-wide">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(event) => handleChange("title", event.target.value)}
            style={{ width: "100%" }}
          />
          {/* Field-level validation message appears only when present. */}
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="field field-wide">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            style={{ width: "100%", minHeight: "100px" }}
          />
          {/* Field-level validation message appears only when present. */}
          {errors.description && (
            <div className="error">{errors.description}</div>
          )}
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due Date</label>
          <input
            style={{ width: "100%" }}
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(event) => handleChange("dueDate", event.target.value)}
          />
          {/* Field-level validation message appears only when present. */}
          {errors.dueDate && <div className="error">{errors.dueDate}</div>}
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            style={{ width: "100%" }}
            id="status"
            value={formData.status}
            onChange={(event) => handleChange("status", event.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Native submit button triggers form onSubmit handler. */}
      <button className="btn btn-primary" type="submit">
        {submitText}
      </button>
    </form>
  );
}
