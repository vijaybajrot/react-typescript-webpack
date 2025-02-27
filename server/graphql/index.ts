import * as DataLoader from "dataloader";
import * as expressGraphql from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";

import modules from "@server/modules";
import { db, DatabaseModel } from "@server/database";

import rootSchema from "./schema.graphql";

let loaders = {};
const schemas = [rootSchema];
const resolvers = [];

type AppModule = {
	schema?: string;
	resolver?: any;
	loaders?: any;
};

modules.forEach((mod: AppModule) => {
	if (mod.schema) {
		schemas.push(mod.schema);
	}
	if (mod.resolver) {
		resolvers.push(mod.resolver);
	}
	if (mod.loaders) {
		loaders = { ...loaders, ...mod.loaders };
	}
});

const schema = makeExecutableSchema({
	typeDefs: schemas,
	resolvers,
	inheritResolversFromInterfaces: true,
});

export type Context = {
	database: DatabaseModel;
	loaders: {
		[key: string]: any;
	};
};

const context: Context = {
	database: db,
	loaders,
};

export default function () {
	return expressGraphql({
		schema,
		graphiql: true,
		context,
	});
}
