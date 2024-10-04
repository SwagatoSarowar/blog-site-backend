const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const db = process.env.DB_URL.replace("<DB_PASSWORD>", process.env.DB_PASSWORD);

app.listen(port, () => console.log(`App running on port ${port}...`));
mongoose.connect(db).then(() => console.log("DB connected..."));
