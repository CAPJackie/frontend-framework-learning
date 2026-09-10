import { Component, signal } from '@angular/core';

/**
 * LOCAL state with a signal. `signal(0)` is Angular's reactive primitive; the
 * template reads it as `count()` and updates re-render just that binding.
 */
@Component({
  selector: 'app-counter',
  template: `
    <div style="display:flex;align-items:center;gap:0.75rem">
      <button class="lab-btn" (click)="count.set(count() - 1)">−</button>
      <span style="min-width:2.5rem;text-align:center;font-size:1.1rem;font-weight:600">
        {{ count() }}
      </span>
      <button class="lab-btn" (click)="count.set(count() + 1)">+</button>
      <button class="lab-btn" (click)="count.set(0)">reset</button>
      <span style="font-size:0.75rem;color:var(--lab-muted)">signal() local state</span>
    </div>
  `,
})
export class Counter {
  count = signal(0);
}
