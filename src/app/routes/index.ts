import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";

export const router = Router();

const moduleRouter = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  // {
  //   path: "/tour",
  //   route: TourRouter,
  // },
];
moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});
