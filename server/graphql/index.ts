import * as expressGraphql from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";

import modules from "@server/modules";

import rootSchema from "./schema.graphql";

const schemas = [rootSchema];
const resolvers = [];
modules.forEach(mod => {
	if (mod.schema) {
		schemas.push(mod.schema);
	}
	if (mod.resolver) {
		resolvers.push(mod.resolver);
	}
});

const schema = makeExecutableSchema({
	typeDefs: schemas,
	resolvers,
});

export default function () {
	return expressGraphql({
		schema,
		graphiql: true,
	});
}
