import { USERS_API_URL, type User } from "@lab/reference-spec";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// This is the SSR/ISR contrast to the CSR fetches in the Vue/Angular demos.
// The fetch runs on the SERVER (Server Component); with `revalidate` it's ISR.
export const revalidate = 3600; // rebuild this page at most once an hour

export default async function UsersPage() {
  const res = await fetch(USERS_API_URL, { next: { revalidate: 3600 } });
  const users: User[] = await res.json();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Users — fetched on the server</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          This data is fetched in a React Server Component and cached with{" "}
          <code className="text-foreground">revalidate = 3600</code> (ISR). No client JavaScript
          loads this list. Compare with <code className="text-foreground">demo-vue</code> and{" "}
          <code className="text-foreground">demo-angular</code>, which fetch in the browser after
          mount (CSR).
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.name}</TableCell>
              <TableCell className="text-muted-foreground">@{u.username}</TableCell>
              <TableCell className="text-muted-foreground">{u.company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
