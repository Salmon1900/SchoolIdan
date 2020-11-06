import {
  ExitToApp,
  Group,
  Home,
  School,
  Equalizer,
  FormatListBulleted,
  AssignmentTurnedIn,
  RecordVoiceOver,
} from "@material-ui/icons";
import { roles } from "../roles";
import React from "react";
import { logOut } from "../api/loginApi";

export const pageList = [
  {
    roles: [roles.PRINCIPAL, roles.TEACHER],
    route: "/home",
    name: "מסך בית",
    icon: <Home color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/schoolManagement",
    name: "ניהול בית ספר",
    icon: <School color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/teacherManagment",
    name: "ניהול צוות מורים",
    icon: <RecordVoiceOver color="secondary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/classManagement",
    name: "ניהול כיתות",
    icon: <Group color="secondary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/stats",
    name: "נתוני תלמידים",
    icon: <Equalizer color="secondary" />,
  },
  {
    roles: [roles.TEACHER],
    route: "/grading",
    name: "הזנת ציונים",
    icon: <AssignmentTurnedIn color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/ins/classManagement",
    name: "ניהול כיתות - מורה",
    icon: <Group color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/ins/stats",
    name: "נתוני תלמידים - מורה",
    icon: <Equalizer color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL],
    route: "/ins/grading",
    name: "הזנת ציונים - מורה",
    icon: <AssignmentTurnedIn color="secondary" />,
  },
  {
    roles: [roles.PRINCIPAL, roles.TEACHER],
    route: "/",
    name: "התנתק",
    icon: <ExitToApp color="secondary" />,
    action: logOut(),
  },
];
