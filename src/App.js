import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import * as actions from './features/core/redux/actions'

import UniverseContext from './common/contexts/UniverseContext'

import routes from './routes'
import { Layout, PageNotFound } from './features/core'

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


  return <UniverseContext.Provider value={universeState}>
      <Layout>
        <Switch>
          {routes}
          <Route name="Page not found" component={PageNotFound} />
        </Switch>
      </Layout>
    </UniverseContext.Provider>
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
