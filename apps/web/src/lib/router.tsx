import { useMemo } from 'react'
import {
    Link as RouterLink,
    type LinkProps as RouterLinkProps,
    Navigate as RouterNavigate,
    Outlet,
    useLocation,
    useNavigate,
    useParams as useRouteParams,
    useSearchParams as useRouteSearchParams,
} from 'react-router'

export type RouterLike = {
    push: (href: string) => void
    replace: (href: string) => void
}

type LinkProps = Omit<RouterLinkProps, 'to'> & {
    href: RouterLinkProps['to']
}

type NavigateProps = {
    href: string
    replace?: boolean
}

export const Link = ({
    href,
    ...props
}: LinkProps) => <RouterLink to={href} {...props} />

export const Navigate = ({
    href,
    replace,
}: NavigateProps) => (
    <RouterNavigate to={href} replace={replace} />
)

export const useRouter = (): RouterLike => {
    const navigate = useNavigate()
    
    return useMemo(() => ({
        push: (href: string) => navigate(href),
        replace: (href: string) => navigate(href, { replace: true }),
    }), [navigate])
}

export const usePathname = () => useLocation().pathname

export const useSearchParams = () => {
    const [searchParams] = useRouteSearchParams()
    
    return searchParams
}

export const useParams = useRouteParams
export { Outlet }
