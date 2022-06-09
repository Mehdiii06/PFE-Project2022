const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken");

/* *************************************** */

/*  Add Company  */
exports.addCompany = async (req, res) => {
    const {companyname, address, phone } = req.body;
    try {
      const company = await Company.create({companyname, address, phone });
      res.status(200).json({ results: company.length, data: { company } });
    } catch (err) {
      res.status(400).json(err);
      console.log(err.Message)
    }
  };
  
  

/* *************************************** */

/*  Get company by ID  */
exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      const error = new Error("company does not exist");
      return next(error);
    }
    res.json(company);
  } catch (err) {
    res.status(400).json({ err });
  }
};


/* *************************************** */

/*  Get all companies  */
  exports.getAllCompany = async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(201).json({  data: { companies } });
    } catch (err) {
      res.status(400).json({ err });
    }
  };

/* *************************************** */

/*  Delete company  */
  exports.delCompany = async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (company.createdBy === req.body.id) {
      try {
        await company.delete();
        res.status(200).json("Claim has been deleted !");
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };
  

/* *************************************** */

/*  Update company  */
  exports.updatecompany = async (req, res) => {
    try{
      
      const company = await Company.findById(req.params.id);
      const companyname  = req.body.companyname ;
      const address = req.body.address;
      const  phone = req.body.phone;
      if(!company){
        return res.status(404).json({ Message: "Company not exist !"})
      }
      await Company.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { companyname: companyname   , address: address , phone: phone}},
      )
      return res.status(200).json(company)
    }catch(err){
      res.status(400).json(err)
    }
  };