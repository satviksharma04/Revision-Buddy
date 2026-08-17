import { LayoutDashboard, FileText, History, User, } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Documents",
    path: "/documents",
    icon: FileText,
  },
  {
    title: "History",
    path: "/history",
    icon: History,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];