const path = require("path");
const usersData = require(path.resolve("./public/users.json"));
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Bankdetails = mongoose.model("bankdetails");
const insertUserfunction = require("../helpers/helper").insertUserfunction;


module.exports = {
  index: (req, res) => {
    res.status(200).send({
      error: false,
      message: `It's Working`
    });
  },
  /**Write down a method that will insert users ## Try to make use of promise Do not use mongodb insert many */
  insertUsers: (req, res) => {
    const users = req.body.data;
    var promiseArray = [];
    users.map(user => {
      promiseArray.push(insertUserfunction(user));
    });
    Promise.all(promiseArray)
      .then(resp => {
        res.status(200).send({
          error: false,
          data: resp
        });
      })
      .catch(err => {
        res.json({
          message: err.message
        });
      });
  },

  getAllUsers: (req, res) => {
    User.find({ percentage: { $exists: true } })
    .then(user => {
      res.status(200).send({ // always try to send status along with the response and handle errors using catch
        error: false,
        data: user
      });
    })
    .catch(err => {
      res.status(400).send({
        error:true,
        message:err
      })
    })
  },

  insertBankDetails: (req,res) => {
    Bankdetails.insertMany(req.body.data)
    .then(data => {
      res.status(200).send({
        error:false,
        data:data
      })
    })
    .catch(err => {
      res.status(400).send({
        error:true,
        message:err
      })
    })
  },

  getBankDetails:(req,res) => {
    Bankdetails.aggregate([
      {
        $lookup:{ // same as populate
          from:'users',
          localField:'accountOwner',
          foreignField:'_id',
          as:'accountOwner'
        }
      },
      {
        $unwind:{
          path:'$accountOwner'
        }
      },
      {
        $project:{
          bankName:1,
          accNo:1,
          "accountOwner.name":1
        }
      }
      // {
      //   $group:{
      //     _id:"$accountOwner.name",
      //      data:{$push:"$bankName"} // "$$ROOT it will push all the pipeline data exactly"
      //     //totalAccount:{$sum:1}
      //   }
      // }
    ])
    .then(details => {
      res.status(200).send({
        error:false,
        data:details
      })
    })
    .catch(err => {
      res.status(400).send({
        error:true,
        message:err
      })
    })
  },

  getBankDetailsManu:(req,res) => {
    
  }
};
