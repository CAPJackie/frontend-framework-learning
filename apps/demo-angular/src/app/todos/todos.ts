import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TODO_FILTERS, type TodoFilter } from '@lab/reference-spec';
import { TodosStore } from '../todos.store';

/**
 * Todos view. Two things to notice:
 *  1. `[(ngModel)]` — Angular's genuine two-way binding (the "banana in a box").
 *  2. `filter = input.required()` — the route param arrives as a signal input
 *     thanks to withComponentInputBinding() in app.config.ts.
 */
@Component({
  selector: 'app-todos',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="lab-card">
      <h2 style="font-size:0.9rem;color:var(--lab-muted);margin-top:0">
        Global state · Todo (Signals service, persisted, filtered by route)
      </h2>

      <form style="display:flex;gap:0.5rem;margin:0.75rem 0" (ngSubmit)="submit()">
        <!-- [(ngModel)] keeps state and input in sync, both directions -->
        <input
          class="lab-input"
          name="newTitle"
          [(ngModel)]="newTitle"
          placeholder="What needs doing?"
        />
        <button class="lab-btn" type="submit">Add</button>
      </form>

      <nav class="lab-nav" style="margin-bottom:0.75rem">
        @for (f of filters; track f) {
          <a [routerLink]="'/' + f" style="text-transform:capitalize">{{ f }}</a>
        }
      </nav>

      <ul
        style="list-style:none;padding:0;margin:0;border:1px solid var(--lab-border);border-radius:8px"
      >
        @if (visible().length === 0) {
          <li style="padding:1.25rem;text-align:center;color:var(--lab-muted)">Nothing here.</li>
        }
        @for (t of visible(); track t.id) {
          <li
            style="display:flex;align-items:center;gap:0.6rem;padding:0.5rem 0.75rem;border-top:1px solid var(--lab-border)"
          >
            <input type="checkbox" [checked]="t.done" (change)="store.toggle(t.id)" />
            @if (editingId() === t.id) {
              <input
                class="lab-input"
                style="flex:1"
                name="draft"
                [(ngModel)]="draft"
                (blur)="commitEdit(t.id)"
                (keydown.enter)="commitEdit(t.id)"
              />
            } @else {
              <span
                style="flex:1;cursor:pointer"
                [style.textDecoration]="t.done ? 'line-through' : 'none'"
                [style.color]="t.done ? 'var(--lab-muted)' : 'inherit'"
                (dblclick)="startEdit(t.id, t.title)"
                >{{ t.title }}</span
              >
            }
            <button class="lab-btn" style="font-size:0.75rem" (click)="store.remove(t.id)">
              delete
            </button>
          </li>
        }
      </ul>

      <div
        style="display:flex;justify-content:space-between;margin-top:0.6rem;font-size:0.75rem;color:var(--lab-muted)"
      >
        <span>{{ store.remaining() }} remaining</span>
        <button class="lab-btn" style="font-size:0.75rem" (click)="store.clearCompleted()">
          clear completed
        </button>
      </div>
    </section>
  `,
})
export class Todos {
  readonly store = inject(TodosStore);
  readonly filters = TODO_FILTERS;

  // Route param bound as a signal input (see withComponentInputBinding()).
  filter = input.required<TodoFilter>();
  visible = this.store.visible(this.filter);

  // Plain properties for [(ngModel)] — the banana-in-a-box reassigns the field,
  // which is exactly the two-way binding we want to showcase.
  newTitle = '';
  draft = '';
  editingId = signal<string | null>(null);

  submit() {
    this.store.add(this.newTitle);
    this.newTitle = '';
  }
  startEdit(id: string, title: string) {
    this.editingId.set(id);
    this.draft = title;
  }
  commitEdit(id: string) {
    const current = this.store.todos().find((t) => t.id === id);
    this.store.edit(id, this.draft.trim() || current!.title);
    this.editingId.set(null);
  }
}
