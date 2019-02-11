import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { routes, renderRouteConfig } from './routes'

import { Layout, PageNotFound, actions } from './features/core'

const App = props => {
  const {
    locale,
    messages,
    actions: { getUniverse },
  } = props

  useEffect(() => {
    getUniverse()
  }, [])

  return <Layout>{renderRouteConfig(routes, '/')}</Layout>
}

const mapStateToProps = state => {
  return { core: state.core }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...actions }, dispatch) }
}

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
