import React, { Fragment, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'

import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import { actions as prestationBasketActions } from './index'

const styles = theme => ({
  icon: {
    color: theme.palette.primary.main,
  },
})

const Basket = props => {
  const {
    classes,
    item,
    index,
    actions: { removeFromBasket },
  } = props

  const onClickRemoveHandler = () => removeFromBasket({ prestation: item, index })

  return (
    <IconButton className={classes.icon} color="inherit" onClick={onClickRemoveHandler}>
      <RemoveShoppingCartIcon />
    </IconButton>
  )
}

const mapStateToProps = (state, props) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { removeFromBasket: prestationBasketActions.removeFromPrestationBasket },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Basket))
