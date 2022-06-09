const mongoose = require("mongoose");
//const bcrypt = require('bcrypt')

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    unique: true,
    required: [true, "Please enter your company name"],
  },
  address: {
    type: String,
    unique: false,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
});

const Company = mongoose.model("company", companySchema);
module.exports = Company;
