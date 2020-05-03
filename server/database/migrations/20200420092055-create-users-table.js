module.exports.up = (queryInterface, DataTypes) => {
	return queryInterface.createTable("users", {
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
	return queryInterface.dropTable("users");
};
