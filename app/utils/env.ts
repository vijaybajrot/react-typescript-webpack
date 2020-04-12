const variables = Object.create(null);

function getValue<T>(name: string): T | void {
  return variables[name];
}

function setValue<T>(name: string, value: T) {
  variables[name] = value;
}

export default { get: getValue, set: setValue };

if (module.hot) {
  module.hot.dispose((data) => {
    data.variables = variables;
  });
  if (module.hot.data && module.hot.data.variables) {
    Object.assign(variables, module.hot.data.variables);
  }
}
