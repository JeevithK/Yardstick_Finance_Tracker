import React from "react";
import { Link } from "react-router-dom";

const Recordlist = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Payment Method</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3">{record.description}</td>
              <td className="px-4 py-3">₹ {record.amount}</td>
              <td className="px-4 py-3">{record.category}</td>
              <td className="px-4 py-3">
                {new Date(record.date).toLocaleDateString("en-GB")}
              </td>
              <td className="px-4 py-3">{record.paymentmethod}</td>
              <td className="px-4 py-3 space-x-2">
                <Link to={`/editrecord/${record._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                </Link>
                <Link to={`/deleterecord/${record._id}`}>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recordlist;
