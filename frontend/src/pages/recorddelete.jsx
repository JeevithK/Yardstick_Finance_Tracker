import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Recorddelete = () => {
  const [recdet, setrecdet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `https://finance-tracker-by-jk1.onrender.com/getrecord/${id}`
        );
        setrecdet(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load record details");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  const handledelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://finance-tracker-by-jk1.onrender.com/deleterecord/${id}`
      );
      toast.success("Successfully Deleted the Expense!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Error deleting record:", err);
      toast.error("Error deleting expense!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (!recdet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          Record not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-600">
          Delete Record
        </h2>
        <form onSubmit={handledelete} className="space-y-4">
          <div>
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              value={recdet.description || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Amount:</label>
            <input
              type="number"
              value={recdet.amount || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Category:</label>
            <input
              type="text"
              value={recdet.category || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              value={recdet.date ? recdet.date.split('T')[0] : ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700">Payment Method:</label>
            <input
              type="text"
              value={recdet.paymentmethod || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Recorddelete;
