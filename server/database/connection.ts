import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
	dialect: "mysql",
	host: "localhost",
	username: "root",
	password: "",
	database: "react_typescript",
	dialectOptions: {},
	models: [__dirname + "/models"],
});

//sequelize.authenticate();

export default sequelize;
