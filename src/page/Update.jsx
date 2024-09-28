import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UpdateTodo({ task, onUpdate, SetUpdating }) {
  const [Title, SetTitle] = useState("");
  const [Description, SetDescription] = useState("");
  const [Priority, SetPriority] = useState("");
  const [Loading, SetLoading] = useState(false);
  const [Due, SetDue] = useState("");
  const [Status, SetStatus] = useState(false);

  // Prefill the form with the current task data
  useEffect(() => {
    if (task) {
      SetTitle(task.Title);
      SetDescription(task.Description);
      SetPriority(task.Priority);
      SetDue(task.Due);
      SetStatus(task.Status);
    }
  }, [task]);

  async function SubmitHandler(e) {
    e.preventDefault();

    try {
      SetLoading(true);
      const res = await axios.post(
        "https://taskmanager-backend-q1kf.onrender.com/update",
        {
          id: task._id,
          Title,
          Description,
          Priority,
          Due,
          Status,
        }
      );
      console.log(res.data);
      alert("Task updated successfully");

      // Update the task list after successful update
      if (onUpdate) {
        onUpdate(res.data);
      }
    } catch (e) {
      console.log(e);
      alert("Failed to update task");
    } finally {
      SetLoading(false);
      SetUpdating(false);
    }
  }

  return (
    <div className={`flex flex-col items-center my-20 gap-y-12 justify-center`}>
      <h1 className="font-black text-xl">Update Your Task</h1>
      {Loading ? (
        <div className="mx-auto text-center text-red-500 font-semibold text-xl">
          Please wait, updating your task...
        </div>
      ) : (
        ""
      )}
      <div className={`w-full max-w-xl ${Loading ? "opacity-60" : ""}`}>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded border-black mx-auto"
          onClick={() => SetUpdating(false)}
        >
          Go to Dashboard
        </Link>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={SubmitHandler}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              value={Title}
              onChange={(e) => SetTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Description"
              value={Description}
              onChange={(e) => SetDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Priority
            </label>
            <select
              value={Priority}
              onChange={(e) => SetPriority(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">SELECT PRIORITY</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Due date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={Due}
              onChange={(e) => SetDue(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
            <select
              value={Status}
              onChange={(e) => SetStatus(e.target.value === "true")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              disabled={Loading}
            >
              {Loading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTodo;
