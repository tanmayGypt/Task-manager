// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/HomeComponents/Table";
// import axios from "axios";
// import Link from "react-router-dom";
function Home() {
  // const [Tasks, SetTasks] = useState([]);
  // useEffect(() => {
  //   async function fetch() {
  //     try {
  //       let res = await axios.get("http://localhost:3000/tasks");
  //       JSON.stringify(localStorage.setItem("tasks", res.data));
  //       SetTasks(res.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetch();
  // }, []);
  return (
    <div className="flex flex-col gap-y-6 my-12">
      <h1 className="font-bold text-center text-2xl">All the tasks</h1>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  p-4 rounded border-black mx-auto"
      >
        {" "}
        <Link className="mx-auto" to="/create">
          Add new Task
        </Link>
      </button>
      <Table />
    </div>
  );
}

export default Home;
