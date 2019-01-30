import React from 'react'

export default ({ is, children }) => <React.Fragment>{is ? children : ''}</React.Fragment>
