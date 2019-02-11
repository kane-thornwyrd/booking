import React, { useState, useEffect, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Spring, animated } from 'react-spring'

import Badge from '@material-ui/core/Badge'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { ROUTE_PRESTATION_BASKET } from './routes'

const styles = theme => ({
  button: {
    color: theme.palette.primary.dark,
  },
  highlighted: {
    color: '#fff',
  },
})

const BasketButton = props => {
  const { classes, basket } = props

  const [basketUpdate, setBasketUpdate] = useState(false)
  const [prevBasketLength, setPrevBasketLength] = useState(null)

  useEffect(
    () => {
      if (basket.length !== prevBasketLength) {
        setPrevBasketLength(basket.length)
        setBasketUpdate(basket.length !== prevBasketLength)
      }
      setTimeout(() => setBasketUpdate(false), 2000)
    },
    [basket.length]
  )

  return (
    <Fragment>
      <Spring native from={{ x: 0 }} to={{ x: basketUpdate ? 1 : 0 }} config={{ duration: 500 }}>
        {({ x }) => (
          <animated.div
            style={{
              transform: x
                .interpolate({
                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                })
                .interpolate(x => `scale(${x})`),
            }}
          >
            <IconButton
              className={classNames({
                [classes.button]: true,
                [classes.highlighted]: basketUpdate,
              })}
              component={Link}
              to={ROUTE_PRESTATION_BASKET}
            >
              <Badge badgeContent={basket.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </animated.div>
        )}
      </Spring>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={basketUpdate}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Panier mis à jour</span>}
        TransitionProps={{
          direction: 'left',
        }}
      />
    </Fragment>
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
