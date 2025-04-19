import type { TabProps } from '@mui/material';
import { Tab } from '@mui/material';
import type { LinkComponent } from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';
import React from 'react';

interface MUITabLinkProps extends TabProps<'a'> { }

const MUITabLinkComponent = React.forwardRef<
    HTMLAnchorElement,
    MUITabLinkProps
>((props, ref) => <Tab ref={ref} component="a" {...props} />)

const CreatedTabLinkComponent = createLink(MUITabLinkComponent)

export const RouterTab: LinkComponent<typeof MUITabLinkComponent> = (
    props,
) => {
    return <CreatedTabLinkComponent preload={'intent'} {...props} />
}