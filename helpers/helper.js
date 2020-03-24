const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = {
  insertUserfunction(object) {
    return new Promise((resolve, reject) => {
      new User(object)
        .save()
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
