import resolver, { userLoader } from "./resolver";
import schema from "./schema.graphql";

export default {
	resolver,
	schema,
	loaders: {
		userLoader,
	},
};
