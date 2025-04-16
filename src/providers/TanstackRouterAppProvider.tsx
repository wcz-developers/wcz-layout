import { useLocation, useNavigate, useSearch, Link as TanstackRouterLink } from '@tanstack/react-router'
import { AppProvider, type AppProviderProps, Navigate, Router } from '@toolpad/core/AppProvider'
import { LinkProps } from '@toolpad/core/shared/Link'
import { useCallback, useMemo, forwardRef, FC } from 'react'

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const { href, history, ...rest } = props
    return <TanstackRouterLink ref={ref} to={href} replace={history === 'replace'} {...rest} />
})

export const TanstackRouterAppProvider: FC<AppProviderProps> = (props) => {
    const { pathname } = useLocation()
    const searchParams = useSearch({ strict: false })
    const _navigate = useNavigate()

    const navigate = useCallback<Navigate>(
        (url, { history = 'auto' } = {}) => {
            _navigate({ to: url.toString(), replace: history === 'replace' }).catch(console.error)
        }, [_navigate]);

    const router = useMemo<Router>(() => ({ pathname, searchParams: new URLSearchParams(searchParams), navigate, Link, }), [pathname, searchParams, navigate]);

    return <AppProvider router={router} {...props} />
}