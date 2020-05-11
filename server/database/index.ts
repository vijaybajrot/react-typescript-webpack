import * as fs from "fs";
import * as path from "path";

import { Sequelize, Model, ModelCtor } from "sequelize";

import { env } from "@server/utils";

export { Op } from "sequelize";
export const sequelize = new Sequelize(
	env("DB_DATABASE", "react_typescript"),
	env("DB_USER", "root"),
	env("DB_PASSWORD", ""),
	{
		dialect: "mysql",
		host: env("DB_HOST", "localhost"),
		logging: true,
	},
);

export function connectDatabase(): Promise<void> {
	return sequelize.authenticate();
}

export interface DatabaseModel {
	User?: ModelCtor<Model>;
	Post?: ModelCtor<Model>;
}

const DBModels: DatabaseModel = {};
const modelsDir = path.resolve("server/models");
fs.readdirSync(modelsDir).forEach(function (file) {
	const model = sequelize.import(path.join(modelsDir, file));
	DBModels[model.name] = model;
});

for (const model in DBModels) {
	if (DBModels[model] && DBModels[model].associate) {
		DBModels[model].associate(DBModels);
	}
}

export const db: DatabaseModel = DBModels;
