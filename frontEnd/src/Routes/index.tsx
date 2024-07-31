import React, { Suspense } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
const TodoList = React.lazy(() => import("../Screens/TodoList"));

const Routes: React.FC = () => {
  const element: RouteObject[] = [{ path: "/", element: <Suspense fallback={<div>Loading...</div>}><TodoList /></Suspense> }];
  return useRoutes(element);
};

export default Routes;
