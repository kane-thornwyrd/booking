import React, { Fragment } from 'react'
import { FormattedNumber } from 'react-intl'

export default ({ value, currency, minimum = 2, maximum = 2 }) => (
  <FormattedNumber
    value={value}
    style="currency"
    currency={currency}
    minimumFractionDigits={minimum}
    maximumFractionDigits={maximum}
    children={formattedNumber => <Fragment>{formattedNumber}</Fragment>}
  />
)
