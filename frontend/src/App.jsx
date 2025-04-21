import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Editrecord from "./pages/recordedit";
import Deleterecord from "./pages/recorddelete";
import Header from "./components/header";
import { useState } from "react";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editrecord/:id" element={<Editrecord />} />
        <Route path="/deleterecord/:id" element={<Deleterecord />} />
      </Routes>
    </>
  );
}

export default App;
