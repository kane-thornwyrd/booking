import React from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import Typography from '@material-ui/core/Typography'
import FadingText from './FadingText'

const messages = defineMessages({
  commonLoadingBody: {
    id: 'core.loading.body',
    defaultMessage: 'Loading...',
  },
})

export default injectIntl(({ intl: { formatMessage } }) => (
  <Typography variant="body1" gutterBottom>
    <FadingText shadowcolor="#fff">{formatMessage(messages.commonLoadingBody)}</FadingText>
  </Typography>
))
