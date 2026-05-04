Place real protected source documents here for the local prototype.

The application links documents through `/api/document/[id]`, which checks the
session cookie before serving files. The `proxy.ts` file also guards
`/documents/*` paths.
