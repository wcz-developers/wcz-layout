import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { RouterError } from './components/router/RouterError';
import { RouterNotFound } from './components/router/RouterNotFound';
import { routeTree } from './routeTree.gen';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

export function createRouter() {
  const queryClient = new QueryClient()

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: 'intent',
      defaultErrorComponent: RouterError,
      defaultNotFoundComponent: RouterNotFound,
    }),
    queryClient,
  )
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
