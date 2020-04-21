import { Table, Column, Model } from "sequelize-typescript";

@Table
export class User extends Model<User> {
	@Column({
		allowNull: false,
		autoIncrement: false,
		primaryKey: true,
	})
	id: number;

	@Column
	name: string;
}
