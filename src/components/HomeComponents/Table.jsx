import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateTodo from "../../page/Update";

function Table() {
  const [AllTasks, SetTasks] = useState([]);
  const [Updating, SetUpdating] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        let data = await axios.get(
          "https://taskmanager-backend-q1kf.onrender.com/tasks"
        );
        localStorage.setItem("tasks", JSON.stringify(data.data) || "[]");
        SetTasks(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchTasks();
    refreshTasks();
  }, [Updating]);

  async function Completion(index, id, Status) {
    try {
      await axios.post("https://taskmanager-backend-q1kf.onrender.com/mark", {
        id,
        Status: !Status,
      });
      refreshTasks();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.post("https://taskmanager-backend-q1kf.onrender.com/delete", {
        id,
      });
      refreshTasks();
    } catch (e) {
      console.log(e);
    }
  }
  async function refreshTasks() {
    let data = await axios.get(
      "https://taskmanager-backend-q1kf.onrender.com/tasks"
    );
    localStorage.setItem("tasks", JSON.stringify(data.data) || "[]");
    SetTasks(data.data);
  }

  return (
    <div className="relative w-11/12 mx-auto">
      {!Updating ? (
        <>
          {" "}
          <div className="flex justify-center flex-col gap-y-4 mb-12">
            <h1 className="font-bold text-center text-2xl">All the tasks</h1>
            <button
              type="button"
              className="text-white w-2/12 mx-auto bg-blue-700 hover:bg-blue-800  px-4 py-2 rounded border-black"
            >
              {" "}
              <Link className="" to="/create">
                Add new Task
              </Link>
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
            <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Serial No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {AllTasks.map((Task, index) => (
                <tr
                  key={index}
                  className={`text-black border-b dark:border-black-700 ${
                    Task.Status ? "dark:bg-green-300" : "dark:bg-red-300"
                  }`}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{Task.Title || "Empty"}</td>
                  <td className="px-6 py-4">{Task.Description || "Empty"}</td>
                  <td className="px-6 py-4">
                    {Task.Priority === "1"
                      ? "Low"
                      : Task.Priority === "2"
                      ? "Medium"
                      : "High"}
                  </td>
                  <td className="px-6 py-4">{Task.Due || "Empty"}</td>
                  <td className="px-6 py-4">
                    {Task.Status ? "Completed" : "Pending"}
                  </td>
                  <td className="px-6 py-4 flex gap-x-2">
                    <button
                      onClick={() => Completion(index, Task._id, Task.Status)}
                      className="bg-blue-500 hover:bg-blue-700 opacity-90 text-white font-bold py-2 px-3 rounded"
                    >
                      {Task.Status ? "Mark Pending" : "Mark Complete"}
                    </button>
                    <button
                      onClick={(e) => SetUpdating(Task)}
                      className="bg-yellow-500 hover:bg-yellow-700 opacity-90 text-white font-bold py-2 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(Task._id)}
                      className="bg-red-500 hover:bg-red-700 opacity-90 text-white font-bold py-2 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <UpdateTodo task={Updating} SetUpdating={SetUpdating} />
      )}
    </div>
  );
}

export default Table;
