import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

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
    canActivate: [guestGuard]
  },
  {
    path: "register",
    loadComponent: () =>
      import("./features/auth/register/register").then((m) => m.Register),
    canActivate: [guestGuard]
  },
  {
    path: "profile",
    loadComponent: () =>
      import("./features/profile/profile").then((m) => m.Profile),
      canActivate: [authGuard],
  },
  {
    path: "events",
    loadComponent: () =>
      import("./features/catalog/catalog").then((m) => m.CatalogComponent),
  },
  {
    path: "events/:id",
    loadComponent: () =>
      import("./features/event-details/event-details").then((m) => m.EventDetails),
  },
  {
    path: "create",
    loadComponent: () =>
      import("./features/event-add/event-add").then((m) => m.EventAdd),
      canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./features/event-add/event-add').then(m => m.EventAdd),
      canActivate: [authGuard],
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then(m => m.Contact)
  },
  {
    path: "**",
    loadComponent: () =>
      import("./features/not-found/not-found").then((m) => m.NotFound),
  },
];
