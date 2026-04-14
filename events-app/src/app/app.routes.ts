import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "home",
        loadComponent: () =>
            import("./features/home/home").then((m) => m.Home),
    },
    {
        path: "login",
        loadComponent: () =>
            import("./features/auth/login/login").then((m) => m.Login),
    },
    {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register").then((m) => m.Register),
    },
    {
    path: "events",
    loadComponent: () =>
      import("./features/catalog/catalog").then((m) => m.CatalogComponent),
  },
];
