import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { RouterError } from './components/router/RouterError';
import { RouterNotFound } from './components/router/RouterNotFound';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: RouterError,
    defaultNotFoundComponent: RouterNotFound,
    scrollRestoration: true,
    context: {
      queryClient
    }
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
