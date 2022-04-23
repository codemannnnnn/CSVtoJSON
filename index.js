const csv = require("csv-parser");
const fs = require("fs");

const convert = (filePath) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);

      const masterList = fs.createWriteStream("./output/masterlist.json");
      masterList.write(JSON.stringify(results));
      masterList.end();

      for (let i = 0; i < results.length; i++) {
        var fileName = fs.createWriteStream(`./output/item_${i}.json`);
        fileName.write(JSON.stringify(results[i]));
        fileName.end();
      }
    });
};

convert("./data/data.csv");
