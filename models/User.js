const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const userSchema = new Scehma(
  {
    name: {
      type: String,
      maxlength: 10,
      required: true
    },
    surname: {
      type: String,
      maxlength: 10,
      required: true
    },
    emailId: {
      type: String,
      required: true,
      match: [
        /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        "please fill the appropriate value"
      ]
    },
    phoneNo: {
      type: Number,
      required: true
    },
    fatherName: {
      type: String,
      maxlength: 20,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },
    collegeName: {
      type: String,
      maxlength: 40
    },
    schoolName: {
      type: String,
      maxlength: 30
    },
    vehicle: {
      type: String,
      default: "No vehicle"
    },
    percentage: {
      type: Number,
      required: true,
      max: 100
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: false
    }
  }
);

userSchema.pre("save", function(next) {
  if (this.name == "manu") {
    this.vehicle = "KTM";
  } else if (this.name == "harshit") {
    this.vehicle = "activa";
  }
  next();
});

userSchema.virtual("yourScoreIs").get(function() {
  if (this.percentage > 70) {
    return "excellent";
  } else if (this.percentage > 50 && this.percentage < 70) {
    return "good";
  } else if (this.percentage < 50) {
    return "average";
  }
});

mongoose.model("users", userSchema, "users");
