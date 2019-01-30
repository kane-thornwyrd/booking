import React from 'react'
import _ from 'lodash'

// import {
// } from './';

import PrestationList from './PrestationList'

export const ROUTE_PRESTATION_CATALOG_ROOT = 'prestations'

export const makeUrl = ({ ref, subRef }) => {
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
  if (!ref && !subRef) return `/${ROUTE_PRESTATION_CATALOG_ROOT}`
  if (!subRef) return _.template(`/${ROUTE_PRESTATION_CATALOG_ROOT}/{{ ref }}`)({ ref })
  return _.template(`/${ROUTE_PRESTATION_CATALOG_ROOT}/{{ ref }}/{{ subRef }}`)({ ref, subRef })
}

export default {
  path: ROUTE_PRESTATION_CATALOG_ROOT,
  name: 'Prestations',
  childRoutes: [
    {
      path: ':ref',
      render: ({ match }) => {
        return <PrestationList list={match.params.ref} />
      },
    },
    {
      path: ':ref/:subRef',
      render: ({ match }) => {
        return <PrestationList list={match.params.ref} sublist={match.params.subRef} />
      },
    },
  ],
}
