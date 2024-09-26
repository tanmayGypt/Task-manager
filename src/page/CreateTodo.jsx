import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function CreateTodo() {
  const [Title, SetTitle] = useState("");

  const [Description, SetDescription] = useState("");
  const [Priority, SetPriority] = useState("");

  const [Loading, SetLoading] = useState(false);
  const [Due, SetDue] = useState("");
  //   const [Status, SetStatus] = useState(false);
  async function SubmitHandler(e) {
    e.preventDefault();

    try {
      SetLoading(true);
      let res = await axios.post(
        "https://taskmanager-backend-q1kf.onrender.com/create",
        {
          Title,
          Description,
          Priority,
          Due,
          Status: false,
        }
      );
      console.log(res);
      console.log("working");
      let previousTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      previousTasks.push({ Title, Description, Priority, Due, Status: false });
      alert("Task added Successfully");
      localStorage.setItem("tasks", JSON.stringify(previousTasks));
      console.log(previousTasks);
    } catch (e) {
      console.log(e);
    } finally {
      alert("Your task added successfully");
      SetLoading(false);
    }
  }
  return (
    <div
      className={`flex flex-col items-center my-20 gap-y-12 justify-center `}
    >
      <h1 className="font-black text-xl">Create Your Task</h1>
      {Loading ? (
        <div className="mx-auto text-center text-red-500 font-semibold text-xl">
          Please wait we are adding your task
        </div>
      ) : (
        ""
      )}
      <div className={`w-full max-w-xl ${Loading ? "opacity-60" : ""}`}>
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800  py-2 px-4 rounded border-black mx-auto"
          to="/"
        >
          Go to Dashboard
        </Link>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              priority
            </label>
            <select
              name=""
              id=""
              value={Priority}
              placeholder="priority"
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
              placeholder="Due date"
              type="date"
              value={Due}
              onChange={(e) => SetDue(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              type="button"
              onClick={(e) => SubmitHandler(e)}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
