import { lazy } from "react";

const Blog = lazy(() => import("pages/blog"));
const BlogDetail = lazy(() => import("pages/blog/[id]/blog-detail"));

const children = [
  {
    path: "blog",
    children: [
      {
        path: "",
        element: <Blog />,
      },
      {
        path: "blog-detail/:id",
        element: <BlogDetail />,
      },
    ],
  },
];

export default children;
