import "./App.css";
import Form from "./form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./table";
import { useState, useEffect } from "react";
import firebaseDb from "./firebase";

function App() {
  const [getData, setGetData] = useState("");
  useEffect(() => {
    firebaseDb.child("form").on("value", (details) => {
      setGetData(details.val());
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route
            path="/table"
            element={getData ? <Table data={getData} /> : <h2>loading</h2>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
