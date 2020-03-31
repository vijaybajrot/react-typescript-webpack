import * as path from "path";
import * as nodeExternals from "webpack-node-externals";

export const production = process.env.NODE_ENV === "production" ? true : false;

export const alias = {
  "@app": path.resolve("app"),
  "@server": path.resolve("server"),
  "@lib": path.resolve("lib")
};

export const externals = [nodeExternals];
