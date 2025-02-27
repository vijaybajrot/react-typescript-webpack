"use strict";

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		"User",
		{
			id: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{ tableName: "users" },
	);

	model.associate = models => {
		model.posts = model.hasMany(models.Post, {
			as: "posts",
		});
	};

	return model;
};
