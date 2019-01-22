import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import { ConnectedRouter } from 'connected-react-router'
import moment from 'moment'
import { MuiThemeProvider } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import configureStore, { history } from './store'
import { themes } from './themes'
import initialState from './initialState'

import frLocaleData from 'react-intl/locale-data/fr'
import enLocaleData from 'react-intl/locale-data/en'
addLocaleData(frLocaleData)
addLocaleData(enLocaleData)

import translations from './i18n/locales'

import App from './App'

const store = configureStore(initialState)

const localeTld = (/^.+\.([^.]+)$/.exec(window.location.hostname) || [null, 'fr'])[1]
let locale = 'fr'
if (localeTld && ['fr', 'en'].includes(localeTld)) locale = localeTld
const messages = translations[locale]
document.getElementsByTagName('html')[0].setAttribute('lang', locale)
moment.locale(locale)

export default function renderApp() {
  const App = require('./App').default
  render(<IntlProvider locale={locale} key={locale} messages={messages}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={themes.paperbase}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </IntlProvider>, app)
}

renderApp()
