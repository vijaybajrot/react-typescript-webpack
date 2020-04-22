import * as expressGraphql from "express-graphql";
import { buildSchema } from "graphql";

import schema from "./schema.graphql";

const root = {
	hello: () => "Graphql working",
};

export default function () {
	return expressGraphql({
		schema: buildSchema(schema),
		rootValue: root,
		graphiql: true,
	});
}
