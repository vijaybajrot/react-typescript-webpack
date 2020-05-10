import { db } from "@server/database";

async function allPosts() {
	return await db.Post.findAll();
}

async function postUser(post) {
	return await db.User.findOne({
		where: {
			id: post.userId,
		},
	});
}

export default {
	Post: {
		user: postUser,
	},
	Query: {
		allPosts,
	},
};
