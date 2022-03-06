var mongoose = require("mongoose");
var Usuario = require("./models/usuario"); 
var Faker = require("faker");
mongoose.connect("mongodb://localhost:27017/tccLevi", {
  useNewUrlParser: true,
});

async function gerarUsuarios() {
  for (let i = 0; i < 1000; i++) {
    let p = new Usuario({
      nome: Faker.name.findName(),
      nick: Faker.name.firstName(),
      senha: Faker.internet.password(),
      status: true,
    });
    try {
      await p.save();
    } catch (err) {
      throw new Error("Error generating products");
    }
  }
}
gerarUsuarios().then(() => {
  mongoose.disconnect();
  console.log("OK");
});