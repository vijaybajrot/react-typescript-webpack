import { db } from "@server/database";

function dump(vars) {
	// eslint-disable-next-line no-console
	console.log(JSON.stringify(vars, null, 2));
}

async function allUsers(_, __, ctx) {
	const data = await db.User.findAll({
		include: [
			{
				as: "posts",
				association: db.User.posts,
				required: false,
			},
		],
	});
	return data;
}

async function createUser(_, args) {
	return true;
}

export default {
	Query: {
		allUsers,
	},
	Mutation: {
		createUser,
	},
};
