import * as DataLoader from "dataloader";

import { db, Op } from "@server/database";

async function allPosts() {
	return await db.Post.findAll();
}

// Load users by data loader
export const userLoader = new DataLoader(userByPostIds);
async function userByPostIds(ids: Array<number>) {
	const users = await db.User.findAll({
		where: {
			id: {
				[Op.in]: ids,
			},
		},
		raw: true,
	});
	const userMap: { [key: number]: any } = {};
	users.forEach((user: any) => {
		userMap[user.id] = user;
	});
	return ids.map(id => userMap[id]);
}

export default {
	Post: {
		user: (post, _, ctx) => ctx.loaders.userLoader.load(post.id),
	},
	Query: {
		allPosts,
	},
};