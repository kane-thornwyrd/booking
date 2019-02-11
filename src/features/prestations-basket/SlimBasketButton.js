import React, { useState, useEffect, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Badge from '@material-ui/core/Badge'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const BasketButton = props => {
  const { classes, basket } = props

  return (
    <Badge badgeContent={basket.length} color="secondary">
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
)(BasketButton)
