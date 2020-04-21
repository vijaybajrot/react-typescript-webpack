import * as path from "path";

import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
	dialect: "mysql",
	host: "localhost",
	username: "root",
	password: "",
	database: "react_typescript",
	dialectOptions: {},
	models: [path.resolve(__dirname + "/models")],
});

export default sequelize;
