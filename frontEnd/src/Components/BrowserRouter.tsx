import * as React from "react";
import { Router } from "react-router-dom";
import { History } from "history";

interface BrowserRouterProps {
  basename?: string;
  children: React.ReactNode;
  history: History;
}

const BrowserRouter: React.FC<BrowserRouterProps> = ({ basename, children, history }) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen((update) => {
    setState({
      action: update.action,
      location: update.location,
    });
  }), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    >
      {children}
    </Router>
  );
};

export default BrowserRouter;
