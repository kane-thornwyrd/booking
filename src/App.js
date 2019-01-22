import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import * as actions from './features/core/redux/actions'

import routes from './routes'
import { Layout, PageNotFound } from './features/core'

const App = props => {
  const {
    locale,
    messages,
    actions: { getUniverse },
  } = props
  useEffect(() => {
    getUniverse()
  }, [])

  return (
    <Layout>
      <Switch>
        {routes}
        <Route name="Page not found" component={PageNotFound} />
      </Switch>
    </Layout>
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
