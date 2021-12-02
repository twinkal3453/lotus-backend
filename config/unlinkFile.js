import fs from "fs";

const unlinkFile = (fileName) => {
  if (fileName) {
    fs.unlink(`uploads/${fileName}`, function (err) {
      if (err) {
        console.log(err);
      }
      // console.log("data not found");
    });
  }
};

export default unlinkFile;
