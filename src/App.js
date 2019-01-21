import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { IntlProvider } from 'react-intl'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import configureStore, { history } from './store'
import routes from './routes'
import { themes } from './themes'
import initialState from './initialState'
import { Layout, PageNotFound } from './features/core'

const store = configureStore(initialState)

const App = props => {
  const { locale, messages } = props
  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={themes.paperbase}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Layout>
                <Switch>
                  {routes}
                  <Route name="Page not found" component={PageNotFound} />
                </Switch>
              </Layout>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </IntlProvider>
  )
}

export default hot(module)(App)
