import { db } from '@server/database';

async function allUsers(_, __, ctx) {
	const data = await db.User.findAll({
		include: [
			{
				as: 'posts',
				association: (db.User as any).posts,
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
