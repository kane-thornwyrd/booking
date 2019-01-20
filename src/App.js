import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { IntlProvider } from 'react-intl'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import configureStore, { history } from './store'
import Routes from './routes'
import { themes } from './themes'
import initialState from './initialState'

const store = configureStore(initialState)

const App = props => {
  const { locale, messages } = props
  return (
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MuiThemeProvider theme={themes.main}>
              <Routes />
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </ConnectedRouter>
      </Provider>
    </IntlProvider>
  )
}

export default hot(module)(App)
