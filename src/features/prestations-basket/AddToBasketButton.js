import React, { Fragment, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { actions as prestationBasketActions } from './'

const styles = theme => ({
  icon: {
    color: theme.palette.primary.main,
  },
})

const Basket = props => {
  const {
    classes,
    item,
    actions: { addToBasket },
  } = props

  const onClickAddHandler = () => addToBasket({ prestation: item })

  return (
    <IconButton className={classes.icon} color="inherit" onClick={onClickAddHandler}>
      <AddShoppingCartIcon />
    </IconButton>
  )
}

const mapStateToProps = (state, props) => {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { addToBasket: prestationBasketActions.addToPrestationBasket },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Basket))
