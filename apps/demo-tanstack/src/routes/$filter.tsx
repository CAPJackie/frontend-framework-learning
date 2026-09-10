import { createFileRoute, redirect } from '@tanstack/react-router'
import { TODO_FILTERS } from '@lab/reference-spec'
import type { TodoFilter } from '@lab/reference-spec'
import { TodoApp } from '../components/TodoApp'

/**
 * Typed dynamic route. The $filter param is validated in beforeLoad; anything
 * that isn't all|active|done redirects to /all. TanStack Router makes params and
 * links type-safe end to end.
 */
export const Route = createFileRoute('/$filter')({
  beforeLoad: ({ params }) => {
    if (!TODO_FILTERS.includes(params.filter as TodoFilter)) {
      throw redirect({ to: '/$filter', params: { filter: 'all' } })
    }
  },
  component: TodosRoute,
})

function TodosRoute() {
  const { filter } = Route.useParams()
  return <TodoApp filter={filter as TodoFilter} />
}
