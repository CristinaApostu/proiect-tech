var express =  require("express");
var path =  require("path");
var mongoose =  require("mongoose");
var bodyParser =  require("body-parser");
var dotenv =  require("dotenv");
var Promise =  require("bluebird");

var auth = require("./routes/auth");
var users = require("./routes/users");
var books = require("./routes/books");

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Running on localhost:8080"));