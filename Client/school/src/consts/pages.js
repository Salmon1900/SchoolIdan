import {
  ExitToApp,
  Group,
  Home,
  School,
  Equalizer,
  FormatListBulleted,
} from "@material-ui/icons";
import { roles } from "../roles";
import React from "react";
import { logOut } from "../api/loginApi";

export const pageList = [
  {
    roles: [roles.PRINCIPAL, roles.TEACHER],
    route: "/home",
    name: "מסך בית",
    icon: <Home color="primary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/schoolManagement",
    name: "ניהול בית ספר",
    icon: <School color="primary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/teacherManagment",
    name: "ניהול צוות מורים",
    icon: <Group color="primary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/classManagement",
    name: "ניהול כיתות",
    icon: <Group color="primary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/studentStats",
    name: "נתוני תלמידים",
    icon: <Equalizer color="primary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/studentList",
    name: "רשימת תלמידים",
    icon: <FormatListBulleted color="primary" />,
  },
  {
    roles: [roles.PRINCIPAL, roles.TEACHER],
    route: "/",
    name: "התנתק",
    icon: <ExitToApp color="primary" />,
    action: logOut(),
  },
];