import React from "react";
import HomePage from "./components/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
