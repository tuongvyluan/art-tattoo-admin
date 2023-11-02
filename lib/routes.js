import {
  Home,
  Newspaper,
  Calendar,
  Template
} from "icons/solid";

const size = 18;

export const adminRoutes = [
  {
    path: "/",
    name: "dashboard",
    icon: <Home width={size} height={size} />,
  },
  {
    path: "/studio",
    name: "studio",
    icon: <Newspaper width={size} height={size} />,
  },
  {
    path: "/artist",
    name: "artist",
    icon: <Newspaper width={size} height={size} />,
  }
];

export const studioRoutes = [
  {
    path: "/",
    name: "dashboard",
    icon: <Home width={size} height={size} />,
  },
  {
    path: "/artist",
    name: "artist",
    icon: <Newspaper width={size} height={size} />,
  },
  {
    path: "/timetable",
    name: "timetable",
    icon: <Calendar width={size} height={size} />,
  },
  {
    path: "/application",
    name: "application",
    icon: <Template width={size} height={size} />,
  }
];

export const artistRoutes = [
  {
    path: "/",
    name: "dashboard",
    icon: <Home width={size} height={size} />,
  },
  {
    path: "/portfolio",
    name: "portfolio",
    icon: <Template width={size} height={size} />,
  },
  {
    path: "/timetable",
    name: "timetable",
    icon: <Calendar width={size} height={size} />,
  },
  {
    path: "/tattooProfile",
    name: "tattooProfile",
    icon: <Template width={size} height={size} />,
  },
]
