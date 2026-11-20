# demo-angular — Angular 20 (standalone) + Signals + Router

The reference feature (counter + todo + filter routes + users fetch) built the Angular way,
using modern standalone components and Signals (no NgModules).

Run it: `pnpm dev:angular` (from repo root) → http://localhost:4200

## Look here for…

| Concept              | File                         | What to notice                                                         |
| -------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| **Two-way binding**  | `src/app/todos/todos.ts`     | `[(ngModel)]` — the "banana in a box".                                 |
| **Local state**      | `src/app/counter/counter.ts` | `signal(0)`, read as `count()` in the template.                        |
| **Global state**     | `src/app/todos.store.ts`     | `@Injectable({ providedIn: 'root' })` service of signals + DI.         |
| **Routing**          | `src/app/app.routes.ts`      | `Routes` config; `withComponentInputBinding()` feeds params as inputs. |
| **Props from route** | `src/app/todos/todos.ts`     | `filter = input.required<TodoFilter>()`.                               |
| **Rendering**        | `src/app/users/users.ts`     | CSR: fetch in `ngOnInit` (browser).                                    |
| **Control flow**     | templates                    | `@if` / `@for` built-in control flow blocks.                           |

## The Angular difference

Angular is the batteries-included one: router, forms (`[(ngModel)]`), and DI all ship in the
framework. State is a DI-provided service holding **signals** — no external store library
needed. This app is CSR; `@angular/ssr` adds server rendering + incremental hydration.
