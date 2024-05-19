import fs, { writeFile, readFile } from "node:fs";
import "./model.js";
import { train_4 } from "./train_4.js";
import { initial } from "./fixData/initialData.js";
const config = {
  binaryThresh: 0.5,
  hiddenLayers: [30], // array of ints for the sizes of the hidden layers in the network
  activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.05, // supported for activation type 'leaky-relu'
};
const net = new brain.NeuralNetwork(config);
const loadModel = readFile("./model_v5.json", "utf-8", (err, data) => {
  net.fromJSON(JSON.parse(data));
  const test = normalisasi(
    [
      { bandwidth: 500, variant: 1233 },
      { bandwidth: 1990, variant: 1233 },
      { bandwidth: 4662, variant: 3151 },
      { bandwidth: 2064, variant: 2004 },
      { bandwidth: 5084, variant: 4845 },
    ],
    "bandwidth",
    "variant"
  );
  const stast = net.train(test);
  console.log(stast);
  const result = net.run({ 1900: 1 });
  let hightnestResult = 0;
  let final = "";
  for (const key in result) {
    const prop = result[key];
    if (prop > hightnestResult) {
      hightnestResult = result[key];
      final = key;
    }
  }
  console.log(final);
  // const jsonModel = net.toJSON();
  // fs.writeFileSync("model_v5.json", JSON.stringify(jsonModel));
});
// net.fromJSON();
// Convert the trained model to JSON format and save it to a file

function normalisasi(data, input, output) {
  let result = [];
  for (let index in data) {
    result.push({
      input: { [data[index][input]]: 1 },
      output: { [data[index][output]]: 1 },
    });
  }
  return result;
}
// [4845, 3151, 2004, 1233]
function generateRandomNumber(quantity) {
  // fungsi tersebut akan menerima jumlah random number yang ingin di output ke
  var numbers = []; // buat sebuah empty array untuk menampung semua bilangaan acuan Random dari

  for (var i = 5000; i < quantity; i++) {
    numbers.push({
      bandwidth: i,
      variant: 4845,
    });
  } // nanti, jika ini aja bisa digunakan sebagai default value.
  writeFile("file5.json", JSON.stringify(numbers), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  return numbers; // kembali nilainya, jika ini aja bisa digunakan
} // nanti, jika ini aja bisa digunakan sebagai default value.
