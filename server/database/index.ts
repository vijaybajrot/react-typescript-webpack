import * as fs from "fs";
import * as path from "path";

import { Sequelize, Model, ModelCtor } from "sequelize";

export const sequelize = new Sequelize(
	process.env.DB_DATABASE || "react_typescript",
	process.env.DB_USER || "root",
	process.env.DB_PASSWORD || "",
	{
		dialect: "mysql",
		host: process.env.DB_HOST || "localhost",
		logging: true,
	},
);

export function connectDatabase(): Promise<void> {
	return sequelize.authenticate();
}

interface DatabaseModel {
	User: ModelCtor<Model>;
}

const dbModels = {};
const modelsDir = path.resolve("server/models");
fs.readdirSync(modelsDir).forEach(function (file) {
	const model = sequelize.import(path.join(modelsDir, file));
	dbModels[model.name] = model;
});

export const db: DatabaseModel = dbModels;
