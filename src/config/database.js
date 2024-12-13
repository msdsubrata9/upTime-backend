const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://msdsubrata9:Subrata1234@namastenode.qgsag.mongodb.net/upTime"
  );
};

module.exports = connectDB;
