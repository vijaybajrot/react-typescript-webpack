import { db } from "@server/database";

async function Users() {
	return db.User.findAll();
}

async function SaveUser(_, args) {
	return true;
}

export default {
	Query: {
		Users,
	},
	Mutation: {
		SaveUser,
	},
};
