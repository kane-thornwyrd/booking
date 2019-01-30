import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home, { ROUTE_APPROOT } from './features/home'

import { themes } from './themes'

// import moduleRoute from './features/module/route';
import { routes as prestationsCatalogRoutes } from './features/prestations-catalog'
import { routes as coreRoutes } from './features/core'

const childRoutes = [
  //moduleRoute,
  prestationsCatalogRoutes,
  coreRoutes,
]

export const routes = [
  {
    path: ROUTE_APPROOT,
    component: Home,
    childRoutes: [...childRoutes].filter(
      r => r.component || (r.childRoutes && r.childRoutes.length > 0)
    ),
  },
]

// Handle isIndex property of route config:
//  Duplicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export function renderRouteConfig(parentRoutes, contextPath) {
  const children = []

  const renderRoute = (item, routeContextPath) => {
    let newContextPath
    if (/^\//.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    newContextPath = newContextPath.replace(/\/+/g, '/')
    if (item.component && item.childRoutes && !!item.childRoutes.length) {
      const childRoutes = renderRouteConfig(item.childRoutes, newContextPath)
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />
      )
    } else if (item.component) {
      children.push(
        <Route key={newContextPath} component={item.component} path={newContextPath} exact />
      )
    } else if (item.render) {
      children.push(<Route key={newContextPath} render={item.render} path={newContextPath} exact />)
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  parentRoutes.forEach(item => renderRoute(item, contextPath))

  return <Switch>{children}</Switch>
}
