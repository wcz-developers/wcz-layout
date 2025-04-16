import type { LinkProps } from '@mui/material';
import { Link } from '@mui/material';
import type { LinkComponent } from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';
import React from 'react';

interface MUILinkProps extends LinkProps { }

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, MUILinkProps>(
    (props, ref) => <Link ref={ref} {...props} />,
)

const CreatedLinkComponent = createLink(MUILinkComponent)

export const RouterLink: LinkComponent<typeof MUILinkComponent> = (props) => {
    return <CreatedLinkComponent preload={'intent'} {...props} />
}