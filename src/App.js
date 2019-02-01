import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import { routes, renderRouteConfig } from './routes'

import { Layout, PageNotFound, actions } from './features/core'

const App = props => {
  const {
    locale,
    messages,
    actions: { getUniverse },
  } = props

  const [universeState, setUniverseState] = useState(null)

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(hot(module)(App))
