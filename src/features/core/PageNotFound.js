import React from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import { FadingText } from '../../common'

const messages = defineMessages({
  corePageNotFoundTitle: {
    id: 'core.pageNotFound.title',
    defaultMessage: 'Page not found',
  },
})

const PageNotFound = ({ intl: { formatMessage } }) => {
  return <React.Fragment>
      <h1>
        <FadingText>{formatMessage(messages.corePageNotFoundTitle)}</FadingText>
      </h1>
    </React.Fragment>
}

export default injectIntl(PageNotFound)
