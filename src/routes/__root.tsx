import { Home, InfoOutline } from '@mui/icons-material';
import { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { Navigation } from "@toolpad/core/AppProvider";
import * as React from 'react';
import packageJson from "~/../package.json";
import { NavigationParams } from '~/models/NavigationParams';
import { LayoutProvider } from '~/providers/LayoutProvider';
import { UserService } from '~/services/UserService';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
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
  beforeLoad: async () => {
    // const user = await UserService.initKeycloak();
    // return { user }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {

  const getNavigation = ({ t }: NavigationParams): Navigation => [
    {
      segment: "",
      title: "Homepage",
      icon: <Home />,
    },
    {
      segment: "/about",
      title: "About",
      icon: <InfoOutline />
    },
  ];

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <LayoutProvider
          getNavigation={getNavigation}
          title={packageJson.name}
        >
          {children}
          <Scripts />
        </LayoutProvider>
      </body>
    </html>
  )
}
