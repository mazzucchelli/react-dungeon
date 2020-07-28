const fs = require("fs");
var sizeOf = require("image-size");

const baseDir = "./public/assets";
const dirs = ["mobs", "potions"];

function getExtension(filename) {
  var i = filename.lastIndexOf(".");
  return i < 0 ? "" : filename.substr(i);
}

async function asyncForEach(arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    await cb(arr[i], i, arr);
  }
}

(async () => {
  try {
    const res = {};

    await asyncForEach(dirs, async (dir) => {
      const files = await fs.promises.readdir(`${baseDir}/${dir}`);
      for (const file of files) {
        const ext = getExtension(file);
        const fileName = file.replace(".png", "");
        if (ext === ".png") {
          const dimensions = sizeOf(`${baseDir}/${dir}/${file}`);
          res[fileName] = {};
          res[fileName].width = dimensions.width;
          res[fileName].height = dimensions.height;
          res[fileName].frames = dimensions.width / dimensions.height;
        }
      }
    });

    fs.writeFile("src/mocks/spriteData.json", JSON.stringify(res, null, 4), function (err) {
      if (err) return console.log(err);
    });
  } catch (err) {
    console.error("Error:", err);
  }
})();
