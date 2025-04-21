import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import recordmodel from "./models/recordmodel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.post("https://yardstick-finance-tracker-2.onrender.com/createrecord", (req, res) => {
  const newrecord = recordmodel.create(req.body);
  res.status(202).json({ message: "Done Created the record" });
});

app.get("https://yardstick-finance-tracker-2.onrender.com/getrecordbyid/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const record = await recordmodel.findOne({ _id:id });
        res.status(202).json(record);
    }
    catch (err)
    {
        res.status(400).json({ message: err });
    }
});

app.get("https://yardstick-finance-tracker-2.onrender.com/getallrecord", async (req, res) => {
  try {
    const allrecord = await recordmodel.find({});
    res.status(202).json(allrecord);
    console.log(allrecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ Error: err });
  }
});

app.put("https://yardstick-finance-tracker-2.onrender.com/editrecord/:id", async (req, res) => {
  try {
    const updatedRecord = await recordmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(202).json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Update failed", details: err });
  }
});

app.delete("https://yardstick-finance-tracker-2.onrender.com/deleterecord/:id", async (req, res) => {
    try {
        const deleterecord = await recordmodel.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "Deleted Successfully" });    
    }
    catch (err)
    {        
        res.status(404).json({ message: "Deletion failed" });  
    }
    
})

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("this is from 5001");
});
