import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import { routes, renderRouteConfig } from './routes'

import { contexts as commonContexts } from './common'
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

  useEffect(
    () => {
      setUniverseState(props.core.getUniverse)
    },
    [props.core.getUniverse]
  )

  return (
    <commonContexts.UniverseContext.Provider value={universeState}>
      <Layout>{renderRouteConfig(routes, '/')}</Layout>
    </commonContexts.UniverseContext.Provider>
  )
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
