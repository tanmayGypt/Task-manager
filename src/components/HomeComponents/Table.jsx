import { useEffect, useState } from "react";

function Table() {
  const [Tasks, SetTasks] = useState([]);
  useEffect(() => {
    let AllTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    SetTasks(AllTasks);
    console.log(JSON.parse(localStorage.getItem("tasks"))[0]);
  }, []);
  function Completion(index) {
    let AllTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    AllTasks[index].Status = true;
    localStorage.setItem("tasks", JSON.stringify(AllTasks));
  }
  return (
    <div className="relative w-11/12 mx-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {Tasks.map((index, Task) => {
            <tr
              key={index}
              className="text-black border-b dark:bg-white dark:border-black-700"
            >
              <div>{index}</div>
              <td className="px-6 py-4">{index + 1}</td>

              <td className="px-6 py-4">{Task.Title}</td>

              <td className="px-6 py-4">{Task.Description}</td>
              <td className="px-6 py-4">
                {Task.Priority == "1"
                  ? "Low"
                  : Task.Priority == "2"
                  ? "Medium"
                  : "High"}
              </td>
              <td className="px-6 py-4">{Task.Due}</td>

              <td className="px-6 py-4">
                {Task.Due ? "Completed" : "Pending"}
              </td>

              <td className="px-6 py-4">
                <button
                  onClick={Completion}
                  className="bg-blue-500 hover:bg-blue-700 opacity-90 text-white font-bold py-2 px-3 rounded"
                >
                  Done
                </button>{" "}
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
