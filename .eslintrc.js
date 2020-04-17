"use strict";

module.exports = {
	root: true,
	parser: "babel-eslint",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"prettier/react",
	],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	plugins: ["react", "babel", "import", "react-hooks"],
	rules: {
		"no-console": ["warn"],
		"react/prop-types": "off",

		"babel/camelcase": 1,
		"babel/no-invalid-this": 1,
		"babel/semi": 1,
		"babel/no-unused-expressions": 1,
		"babel/valid-typeof": 1,

		camelcase: 0,
		"no-invalid-this": 0,
		quotes: 0,
		semi: 0,
		"no-unused-expressions": 0,
		"valid-typeof": 0,

		"react-hooks/rules-of-hooks": 2,
		"react-hooks/exhaustive-deps": 1,

		"import/no-duplicates": 0,
		"import/order": [
			1,
			{
				groups: [
					"builtin",
					"external",
					"internal",
					"parent",
					"sibling",
					"index",
				],
				"newlines-between": "always",
			},
		],
	},

	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			alias: {
				map: [
					["@app", "./app"],
					["@lib", "./lib"],
					["@server", "./server"],
				],
				extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"],
			},
		},
	},
};
