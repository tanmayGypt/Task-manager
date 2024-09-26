import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Table() {
  const [AllTasks, SetTasks] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        let data = await axios.get(
          "https://taskmanager-backend-q1kf.onrender.com/tasks"
        );
        JSON.stringify(localStorage.setItem("tasks", data.data) || "[]");
        console.log(data.data);
        SetTasks(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetch();
  }, []);
  async function Completion(index, id, Status) {
    try {
      let res = await axios.post(
        "https://taskmanager-backend-q1kf.onrender.com/mark",
        {
          id,
          Status: !Status,
        }
      );
      console.log(res);
      let data = await axios.get(
        "https://taskmanager-backend-q1kf.onrender.com/tasks"
      );
      JSON.stringify(localStorage.setItem("tasks", data.data) || "[]");
      console.log(data.data);
      SetTasks(data.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="relative w-11/12 mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
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
              due date
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
              className="text-black border-b dark:bg-white dark:border-black-700"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{Task.Title}</td>
              <td className="px-6 py-4">{Task.Description}</td>
              <td className="px-6 py-4">
                {Task.Priority === "1"
                  ? "Low"
                  : Task.Priority === "2"
                  ? "Medium"
                  : "High"}
              </td>
              <td className="px-6 py-4">{Task.Due}</td>
              <td className="px-6 py-4">
                {Task.Status ? "Completed" : "Pending"}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => Completion(index, Task._id, Task.Status)}
                  className="bg-blue-500 hover:bg-blue-700 opacity-90 text-white font-bold py-2 px-3 rounded"
                >
                  {Task.Status ? "Mark Pending" : "Mark Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
