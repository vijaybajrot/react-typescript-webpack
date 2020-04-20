const path = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname + "../../.env") });

module.exports = {
	development: {
		username: "root",
		password: "",
		database: "react_typescript",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "root",
		password: "",
		database: "react_typescript",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
