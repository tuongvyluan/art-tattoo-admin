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
    name: "Trang chủ",
    icon: <Home width={size} height={size} />,
  },
  {
    path: "/studio",
    name: "Tiệm xăm",
    icon: <Newspaper width={size} height={size} />,
  },
  {
    path: "/package",
    name: "Gói",
    icon: <Newspaper width={size} height={size} />,
  }
];

export const studioRoutes = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <Home width={size} height={size} />,
  },
  {
    path: "/package",
    name: "Gói",
    icon: <Newspaper width={size} height={size} />,
  },
  {
    path: "/booking",
    name: "Booking",
    icon: <Calendar width={size} height={size} />,
  },
  {
    path: "/tattoo",
    name: "Hình xăm",
    icon: <Template width={size} height={size} />,
  },
];