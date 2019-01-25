const fs = require("fs");
const path = require("path");

module.exports.createTemp = function() {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(
      path.join(__dirname, "../", "db", "tweet"),
      (err, folder) => {
        if (err) reject(err);
        resolve(folder);
      }
    );
  });
};
