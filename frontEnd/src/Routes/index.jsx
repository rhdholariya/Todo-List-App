import React from "react";
import { useRoutes } from "react-router-dom";

const TodoList = React.lazy(() => import("../Screens/TodoList"));

const Routes = () => {
  let element = [{ path: "/", element: <TodoList /> }];
  return useRoutes(element);
};

export default Routes;
