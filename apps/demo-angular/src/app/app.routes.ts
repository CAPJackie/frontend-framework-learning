import { Routes } from '@angular/router';
import { Todos } from './todos/todos';
import { Users } from './users/users';

// :filter drives the todo view (all|active|done), mirroring /demo/[filter] in the hub.
export const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'users', component: Users },
  { path: ':filter', component: Todos },
];
