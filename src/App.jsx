import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import CreateTodo from "./page/CreateTodo";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreateTodo />} path="/create" />
      </Routes>
    </Router>
  );
}

export default App;
