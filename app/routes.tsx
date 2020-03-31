import { RouteProps } from "react-router-dom";
import { loadable } from "@app/lib/loadable";

interface RouterProps extends RouteProps {}

const routes: Array<RouterProps> = [
  {
    path: "/",
    component: loadable(async () => (await import("@app/pages/Home")).Home),
    exact: true
  },
  {
    path: "/about",
    component: loadable(async () => (await import("@app/pages/About")).About)
  },
  {
    path: "/contact",
    component: loadable(
      async () => (await import("@app/pages/Contact")).Contact
    )
  }
];

export default routes;
