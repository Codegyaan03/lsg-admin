import { HiOutlineHome, HiOutlinePencil, HiOutlineUsers } from "react-icons/hi";
import { TbCloudComputing } from "react-icons/tb";
import { Dashboard, PostCreate, Posts, Users, Scrape, Blogs } from "../pages";

let routes: Route[] = [
  {
    path: "dashboard",
    icon: HiOutlineHome,
    name: "Dashboard",
    isHaveChild: false,
    element: Dashboard,
    isShowInSidebar: true,
  },

  {
    path: "scrape",
    icon: TbCloudComputing,
    name: "Scrape",
    isHaveChild: false,
    element: Scrape,
    isShowInSidebar: true,
  },

  {
    path: "contents",
    icon: HiOutlinePencil,
    name: "Contents",
    isHaveChild: true,
    isShowInSidebar: true,
    child: [
      {
        path: "/editorials",
        name: "All Editorials",
        element: Posts,
      },
      {
        path: "/blogs",
        name: "All Blogs",
        element: Blogs,
      },
      {
        path: "/create",
        name: "Create Post",
        element: PostCreate,
      },
    ],
  },

  {
    path: "users",
    icon: HiOutlineUsers,
    name: "Users",
    isHaveChild: true,
    isShowInSidebar: true,
    child: [
      {
        path: "/all",
        name: "All User",
        element: Users,
      },
      {
        path: "/create",
        name: "Create User",
        element: Users,
      },
    ],
  },
  {
    isHaveChild: false,
    path: "/contents/editorials/:id",
    name: "Editorial",
    element: PostCreate,
    icon: HiOutlineUsers,
    isShowInSidebar: false,
  },
];

export default routes;
