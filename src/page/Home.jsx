import { useEffect, useState } from "react";
import Table from "../components/HomeComponents/Table";

function Home() {
  const [Tasks, SetTasks] = useState([]);
  useEffect(() => {
    let alltasks = JSON.parse(localStorage.getItem("tasks"));
    SetTasks(alltasks);
  }, []);
  return (
    <div className="flex flex-col gap-y-6 my-12">
      <h1 className="font-bold text-center text-2xl">All the tasks</h1>
      <Table Tasks={Tasks} />
    </div>
  );
}

export default Home;
