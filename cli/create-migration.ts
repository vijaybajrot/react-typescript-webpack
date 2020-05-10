/* eslint-disable prefer-const */
/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";

import * as moment from "moment";

const migrationsPath = path.resolve("server/database/migrations");

const template = `
    module.exports.up = (queryInterface, DataTypes) => {
        return queryInterface.createTable("tablename", {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            // columns
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
        return queryInterface.dropTable("tablename");
    };
`;

function createFilename(name: string): string {
	const prefix = moment().format("YYYYMMDDhhmmss");
	return `${prefix}-${name.split(" ").join("-")}.js`;
}

// Get Arguments from command
const cmdArgs = process.argv.slice(2);
function getArgs(): object {
	const params = {};
	for (let i = 0; i < cmdArgs.length; i++) {
		const param = cmdArgs[i] ? cmdArgs[i].split("=") : null;
		if (!param) {
			continue;
		}
		let [key, value] = param;
		key = key.replace("--", "");
		params[key] = value;
	}
	return params;
}

const args = getArgs();
function arg<T = string>(name: string, defaultVal?: string): T {
	return args[name] || defaultVal;
}

// Get migration name
const name = arg("name");
if (!name) {
	console.log(
		'Please provide migration name like `--name="create posts table"`.',
	);
	process.exit(0);
}

// Create migration
const filename = createFilename(name.toLowerCase());
fs.writeFileSync(path.join(migrationsPath, filename), template);

console.log(`Migration '${filename}' Created Successfully`);
