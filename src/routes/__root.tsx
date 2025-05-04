import { Home, InfoOutline } from '@mui/icons-material';
import { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { Navigation } from "@toolpad/core/AppProvider";
import packageJson from "~/../package.json";
import { NavigationParams } from '~/models/NavigationParams';
import { LayoutProvider } from '~/providers/LayoutProvider';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8', },
      { name: 'viewport', content: 'width=device-width, initial-scale=1', },
      { name: "title", content: packageJson.name },
      { name: "og:type", content: "website" },
      { name: "og:title", content: packageJson.name },
      { name: "og:image", content: "/favicon-32x32.png" },
    ],
    links: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png', },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png', },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png', },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const getNavigation = ({ t }: NavigationParams): Navigation => [
    {
      segment: "",
      title: t("Layout.Homepage"),
      icon: <Home />,
    },
  ];

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <Scripts />
        <LayoutProvider
          getNavigation={getNavigation}
          title={packageJson.name}
        >
          <Outlet />
        </LayoutProvider>
      </body>
    </html>
  );
}
