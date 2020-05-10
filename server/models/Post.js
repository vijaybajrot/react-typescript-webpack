"use strict";

module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		"Post",
		{
			id: {
				allowNull: false,
				autoIncrement: false,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			body: {
				allowNull: true,
				type: DataTypes.STRING,
			},
		},
		{ tableName: "posts" },
	);

	model.associate = models => {
		model.user = model.belongsTo(models.User);
	};

	return model;
};
