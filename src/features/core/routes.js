import PageNotFound from './PageNotFound'

export const ROUTE_CORE_PAGE_NOT_FOUND = '*'

export default {
  path: ROUTE_CORE_PAGE_NOT_FOUND,
  name: 'Page not Found',
  component: PageNotFound,
  isIndex: true,
}
