import * as express from "express";
import { Express } from "express";
import * as webpack from "webpack";
import * as nodemon from "nodemon";
import * as httpProxy from "http-proxy";
import * as webpackDevMiddleware from "webpack-dev-middleware";

function main() {
  clientBuild();
  serverBuild();
  process.once("SIGINT", () => {
    process.exit(0);
  });
}

function clientBuild() {
  const clientConfig = require("./config/dev.config").default;
  const app: Express = express();
  const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5000",
    secure: false,
  });
  let compiler;
  try {
    compiler = webpack(clientConfig);
  } catch (err) {
    console.error(err);
  }

  const devMiddleware = webpackDevMiddleware(compiler, {
    logLevel: "info",
    publicPath: clientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
  });
  app.use(devMiddleware);
  app.use(require("webpack-hot-middleware")(compiler));

  app.use((req, res) => proxy.web(req, res));
  proxy.on("error", (err, req, res) => res.status(503).send(err));
  const server = require("http").createServer(app);
  return server.listen(5001);
}

function serverBuild() {
  const inspect = process.env.APP_DEBUG || false;
  const serverConfig = require("./config/dev-server.config").default;
  const compiler = webpack(serverConfig);
  let hash = null;
  return compiler.watch(serverConfig.watchOptions, (err: any, stats: any) => {
    if (err) {
      console.log(err.details || err);
    }
    if (!stats.hasErrors()) {
      if (hash === null) {
        nodemon(
          (inspect ? "--inspect" : "") +
            " build/main.js" +
            " --watch build --watch backend"
        );
      }
      hash = stats.hash;
    } else {
      console.error(stats.toString("minimal"));
    }
  });
}

main();
