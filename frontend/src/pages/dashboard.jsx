import React from "react";
import Recordform from "../components/recordform";
import { useState,useEffect } from "react";
import Recordlist from "../components/recordlist";
import axios from "axios"
import Recordchart from "../components/recordchart";

const Dashboard = () => {
//   const [total, settotal] = useState(0);
    const [records, setrecords] = useState([]);
    
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getallrecord");
        setrecords(response.data);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    useEffect(() => {
      fetchRecords();
    }, []);

    const total = records.reduce(
      (sum, record) => sum + Number(record.amount),
      0
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
          <h2 className="mt-2 text-xl text-gray-600">
            Total Expenses: ₹ {total}
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <Recordchart records={records} />
          </div>

          <div className="flex-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <Recordform fetchRecords={fetchRecords} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <Recordlist records={records} fetchRecords={fetchRecords} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
