import resolver from "./resolver";
import schema from "./schema.graphql";

export default {
	resolver,
	schema,
	loaders: {
		x() {
			return "X";
		},
		y() {
			return "Y";
		},
	},
};
