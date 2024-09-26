import { useState } from "react";

function CreateTodo() {
  const [Title, SetTitle] = useState("");

  const [Description, SetDescription] = useState("");
  const [Priority, SetPriority] = useState("");
  const [Due, SetDue] = useState("");
  //   const [Status, SetStatus] = useState(false);
  function SubmitHandler(e) {
    e.preventDefault();
    console.log("working");
    let previousTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    previousTasks.push({ Title, Description, Priority, Due, Status: false });

    localStorage.setItem("tasks", JSON.stringify(previousTasks));
    console.log(previousTasks);
  }
  return (
    <div className="flex flex-col items-center my-20 gap-y-12">
      <h1 className="font-black text-xl">Create Your Task</h1>
      <div className="w-full max-w-xl">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
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
              placeholder="Username"
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
              placeholder="Username"
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
