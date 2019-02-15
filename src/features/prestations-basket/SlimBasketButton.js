import React, { useState, useEffect, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Badge from '@material-ui/core/Badge'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = theme => ({
  badge: {
    top: '50%',
    right: -3,
    lineHeight: 20,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
})

const BasketButton = props => {
  const { classes, basket } = props

  return (
    <Badge badgeContent={basket.length} color="primary" classes={{ badge: classes.badge }}>
      <ShoppingCartIcon />
    </Badge>
  )
}

const mapStateToProps = (state, props) => {
  return {
    basket: state.basket.prestations,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BasketButton))
