import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Recordform = ({ fetchRecords }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    category: "",
    date: "",
    paymentmethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const convertToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

        const formatteddate = convertToDDMMYYYY(formData.date);
        setFormData((prev) => ({ ...prev, date: formatteddate }));

        const postrecord = await axios.post(
        "https://yardstick-finance-tracker-2.onrender.com",
        formData
        );

      toast.success("Expense Added Successfully!!")

      fetchRecords();

      setFormData({
        description: "",
        amount: "",
        category: "",
        date: "",
        paymentmethod: "",
      });
    } catch (err) {
      toast.error("Failed to add Expense!!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5"
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Select Category</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Groceries">Groceries</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Savings">Savings</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Payment Method
        </label>
        <select
          name="paymentmethod"
          value={formData.paymentmethod}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Add Record
        </button>
      </div>
      <Toaster/>
    </form>
  );
};

export default Recordform;
