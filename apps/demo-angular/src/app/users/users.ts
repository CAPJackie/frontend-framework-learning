import { Component, OnInit, signal } from '@angular/core';
import { USERS_API_URL, type User } from '@lab/reference-spec';

/**
 * CSR data fetching. The request runs in the browser in ngOnInit — the same
 * client-side pattern as the Vue demo, and the contrast to the Next hub's
 * server-side fetch. Angular SSR (@angular/ssr) would move this server-side.
 */
@Component({
  selector: 'app-users',
  template: `
    <section class="lab-card">
      <h2 style="margin-top:0">Users — fetched in the browser (CSR)</h2>
      <p style="color:var(--lab-muted);font-size:0.9rem">
        Fetched in <code>ngOnInit</code>. Angular is a CSR SPA by default; add
        <code>&#64;angular/ssr</code> for server rendering + hydration.
      </p>
      @if (loading()) {
        <p style="color:var(--lab-muted)">Loading…</p>
      } @else {
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <thead>
            <tr style="text-align:left;color:var(--lab-muted)">
              <th style="padding:0.4rem 0">Name</th>
              <th>Username</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            @for (u of users(); track u.id) {
              <tr style="border-top:1px solid var(--lab-border)">
                <td style="padding:0.4rem 0">{{ u.name }}</td>
                <td style="color:var(--lab-muted)">@{{ u.username }}</td>
                <td style="color:var(--lab-muted)">{{ u.company.name }}</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
})
export class Users implements OnInit {
  users = signal<User[]>([]);
  loading = signal(true);

  async ngOnInit() {
    this.users.set(await fetch(USERS_API_URL).then((r) => r.json()));
    this.loading.set(false);
  }
}
