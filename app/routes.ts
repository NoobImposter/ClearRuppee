// import { type RouteConfig, route} from "@react-router/dev/routes";

// export default [
//   // Map the root path "/" to your nested file
//   route("/", "./routes/screens/home/home.tsx"),
//   route("/Insights","./routes/screens/Insights/InsightsHome.tsx"),
//   route("/Transactions","./routes/screens/Transactions/Transactionindex.tsx"),
//   route("/Users","./routes/screens/users/userindex.tsx"),
//   route("/Signup","./routes/screens/auth/Loginpage.tsx")
// ] satisfies RouteConfig;


// routes.ts


// routes.ts
// import { type RouteConfig, route } from "@react-router/dev/routes";

// export default [
//   // Auth routes
//   route("/login", "routes/screens/auth/Loginpage.tsx"),
//    route("/Signup","./routes/screens/auth/Signuppage.tsx"),
  
//   // Protected routes
//   route("/", "./routes/screens/home/home.tsx"),
//   route("/Insights","./routes/screens/Insights/InsightsHome.tsx"),
//   route("/Transactions","./routes/screens/Transactions/Transactionindex.tsx"),
//   route("/Users","./routes/screens/users/userindex.tsx"),
//   // route("/Signup","./routes/screens/auth/Loginpage.tsx")
// ] satisfies RouteConfig;



// export default [
//   // Auth routes
//   route("/login", "./routes/screens/auth/Loginpage.tsx"),
//   route("/signup", "./routes/screens/auth/SignupPage.tsx"),
  
//   // Protected routes (add auth guard middleware)
//   route("/", "./routes/screens/home/home.tsx"),
//   route("/insights", "./routes/screens/Insights/InsightsHome.tsx"),
//   route("/transactions", "./routes/screens/Transactions/Transactionindex.tsx"),
//   route("/users", "./routes/screens/users/userindex.tsx"),
// ] satisfies RouteConfig;


// routes.ts
// import { type RouteConfig, route } from "@react-router/dev/routes";

// export default [
//   // 1. Root Entry: Enforce Signup page to render first by default
//   route("/", "./routes/screens/auth/Signuppage.tsx"),
  
//   // Auth routes
//   route("/login", "routes/screens/auth/Loginpage.tsx"),
  
//   // Protected dashboard routes
//   route("/dashboard", "./routes/screens/home/home.tsx"),
//   route("/Insights", "./routes/screens/Insights/InsightsHome.tsx"),
//   route("/Transactions", "./routes/screens/Transactions/Transactionindex.tsx"),
//   route("/Users", "./routes/screens/users/userindex.tsx"),
// ] satisfies RouteConfig;
// routes.ts
import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  // 1. Unprotected / Global Auth Routes (No Navbar rendered here)
  route("/", "./routes/screens/auth/Signuppage.tsx"),
  route("/login", "routes/screens/auth/Loginpage.tsx"),
  
  // 2. Protected Dashboard Routes (Navbar applies ONLY to these)
  layout("./routes/layouts/dashboardLayout.tsx", [
    route("/dashboard", "./routes/screens/home/home.tsx"),
    route("/Insights", "./routes/screens/Insights/InsightsHome.tsx"),
    route("/Transactions", "./routes/screens/Transactions/Transactionindex.tsx"),
    route("/Users", "./routes/screens/users/userindex.tsx"),
  ]),
] satisfies RouteConfig;