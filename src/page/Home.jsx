import { useEffect, useState } from "react";
import Table from "../components/HomeComponents/Table";
import axios from "axios";

function Home() {
  const [Tasks, SetTasks] = useState([]);
  useEffect(() => {
    async function fetch() {
      try {
        let res = await axios.get("http://localhost:3000/tasks");
        JSON.stringify(localStorage.setItem("tasks", res.data));
        SetTasks(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetch();
  }, []);
  return (
    <div className="flex flex-col gap-y-6 my-12">
      <h1 className="font-bold text-center text-2xl">All the tasks</h1>
      <Table />
    </div>
  );
}

export default Home;
