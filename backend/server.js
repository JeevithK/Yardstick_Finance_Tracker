import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import recordmodel from "./models/recordmodel.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://yardstick-finance-tracker-2.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.post("/createrecord", (req, res) => {
  const newrecord = recordmodel.create(req.body);
  res.status(202).json({ message: "Done Created the record" });
});

app.get("/getrecordbyid/:id", async(req, res) => {
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

app.get("/getallrecord", async (req, res) => {
  try {
    const allrecord = await recordmodel.find({});
    res.status(202).json(allrecord);
    console.log(allrecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ Error: err });
  }
});

app.put("/editrecord/:id", async (req, res) => {
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

app.delete("/deleterecord/:id", async (req, res) => {
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
