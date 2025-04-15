import { Home } from '@mui/icons-material';
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { Navigation } from "@toolpad/core/AppProvider";
import * as React from 'react';
import { NavigationParams } from '~/models/NavigationParams';
import { LayoutProvider } from '~/providers/LayoutProvider';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8', },
      { name: 'viewport', content: 'width=device-width, initial-scale=1', },
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
  ];

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <LayoutProvider getNavigation={getNavigation}>
          {children}
          <Scripts />
        </LayoutProvider>
      </body>
    </html>
  )
}
