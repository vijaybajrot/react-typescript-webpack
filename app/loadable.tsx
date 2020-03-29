import * as React from "react";

// interface LoadableProps {
//   load: Function;
//   children: (Component: React.ComponentClass) => any;
// }

// export class Loadable extends React.PureComponent<LoadableProps, {}> {
//   public state;
//   constructor(props) {
//     super(props);
//     this.state = {
//       component: null
//     };
//   }
//   componentWillMount() {
//     this.props.load().then(_module => {
//       this.setState(() => ({
//         component: _module.default
//       }));
//     });
//   }
//   render() {
//     return this.props.children(this.state.component);
//   }
// }

const Loading = () => <h2>Loading...</h2>;

function Loader(props) {
  const { id, loader, load, forwardedProps, forwardedRef } = props;
  let [component, setComponent] = React.useState(() => props.component);
  /* eslint-disable no-undef, babel/camelcase */
  React.useEffect(() => {
    if (id && __webpack_modules__[id] && !!component) return;
    load().then(component => setComponent(() => component));
  }, [id, component, load]);
  component =
    id && __webpack_modules__[id] ? __webpack_require__(id).default : component;
  /* eslint-enable no-undef, babel/camelcase */
  if (!component) return loader;
  let componentProps = forwardedProps;
  if (forwardedRef) {
    if (forwardedProps) {
      componentProps = { ...props, ref: forwardedRef };
    } else {
      componentProps = { ref: forwardedRef };
    }
  }
  return React.createElement(component, componentProps);
}

Loader.defaultProps = {
  loader: <Loading />
};

export function loadable(load, forwardRef = false, loader = null, id = null) {
  function Component(props) {
    return (
      <Loader
        id={id}
        load={load}
        loader={loader}
        forwardedProps={props}
        component={Component._component}
      />
    );
  }
  Component.displayName = "LoadableComponent";
  const Loadable = forwardRef
    ? // eslint-disable-next-line
      React.forwardRef((props, ref) => (
        <Component {...props} forwardedRef={ref} />
      ))
    : Component;

  Loadable.component = null;
  Loadable.load = load;

  return Loadable;
}
