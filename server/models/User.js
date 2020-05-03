"use strict";

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
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
};
