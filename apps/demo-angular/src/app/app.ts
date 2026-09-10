import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Counter],
  template: `
    <div class="lab-shell">
      <div class="lab-container">
        <header style="margin-bottom:1.5rem">
          <p style="color:var(--fw-angular);font-weight:600;letter-spacing:0.02em">Angular demo</p>
          <h1 style="font-size:1.75rem;margin:0.25rem 0">Counter + Todo (Signals + DI)</h1>
          <p style="color:var(--lab-muted)">
            Same reference feature as the other four apps. Notice
            <code>[(ngModel)]</code> two-way binding and the DI-provided signals store.
          </p>
          <nav class="lab-nav" style="margin-top:0.75rem">
            <a routerLink="/all">Todos</a>
            <a routerLink="/users">Users (CSR fetch)</a>
          </nav>
        </header>

        <section class="lab-card" style="margin-bottom:1rem">
          <h2 style="font-size:0.9rem;color:var(--lab-muted);margin-top:0">Local state · Counter</h2>
          <app-counter />
        </section>

        <router-outlet />
      </div>
    </div>
  `,
})
export class App {}
