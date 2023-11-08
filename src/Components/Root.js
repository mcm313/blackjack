import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Game from "../Pages/Game";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    children: [
      {
        path: "game",
        element: <Game />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
