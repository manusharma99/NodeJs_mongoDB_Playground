// calculate total money particular user have try to user aggregation
// group users on the basis of vehicle and then get the total cash
const mongoose = require('mongoose');
const Scehma = mongoose.Schema;

const bankSchema = new Scehma(
  {
    bankName: {
      type: String,
      required: true
    },
    accNo:{
        type:Number,
        required:true
    },
    cash:{
        type:Number
    },
    accountOwner: { 
      type: Scehma.Types.ObjectId,
      ref:'users'
    },
})

mongoose.model('bankdetails',bankSchema,'bankdetails');