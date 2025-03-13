import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./container/Home";
import Create from "./container/Create";
import Update from "./container/Update";

function App() {
  // const { id } = useParams();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
