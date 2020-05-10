module.exports.up = (queryInterface, DataTypes) => {
	return queryInterface.createTable("posts", {
		id: {
			allowNull: false,
			autoIncrement: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	});
};

module.exports.down = queryInterface => {
	return queryInterface.dropTable("posts");
};
