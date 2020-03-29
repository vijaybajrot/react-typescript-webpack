import * as React from "react";
import { RouteProps } from "react-router-dom";

import { Home } from "@app/pages/Home";
import { About } from "@app/pages/About";
import { Contact } from "@app/pages/Contact";

import loadable from "@loadable/component";
//import { loadable } from "@app/loadable";

interface RouterProps extends RouteProps {}

// const Loadpage = page => {
//   return (
//     <Loadable load={() => import(page)}>
//       {(Component: React.ComponentClass) =>
//         Component === null
//           ? React.createElement("h1", null, "Loading..")
//           : React.createElement(Component, null)
//       }
//     </Loadable>
//   );
// };
const Loading = () => <h2>Loading...</h2>;
const routes: Array<RouterProps> = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/contact",
    component: Contact
  }
];

export default routes;
