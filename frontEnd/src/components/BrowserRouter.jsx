import * as React from "react";
import { Router } from "react-router-dom";

const BrowserRouter = ({ basename, children, history }) => {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(setState),[history]);

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