import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import { render } from 'react-dom'
import { addLocaleData } from 'react-intl'
import moment from 'moment'
import frLocaleData from 'react-intl/locale-data/fr'
import enLocaleData from 'react-intl/locale-data/en'
addLocaleData(frLocaleData)
addLocaleData(enLocaleData)

import translations from './i18n/locales'

import App from './App'

const localeTld = (/^.+\.([^.]+)$/.exec(window.location.hostname) || [null, 'fr'])[1]
let locale = 'fr'
if (localeTld && ['fr', 'en'].includes(localeTld)) locale = localeTld
const messages = translations[locale]
document.getElementsByTagName('html')[0].setAttribute('lang', locale)
moment.locale(locale)

export default function renderApp() {
  const App = require('./App').default
  render(<App locale={locale} messages={messages} />, app)
}

renderApp()
