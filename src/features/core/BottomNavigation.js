import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { throttle, debounce } from 'lodash'
import classNames from 'classnames'
import moment from 'moment'
import mdf from 'moment-duration-format'

import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AppBar from '@material-ui/core/AppBar'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import EventIcon from '@material-ui/icons/Event'

import { SlimBasketButton, ROUTE_PRESTATION_BASKET } from '../prestations-basket'
import { Currency, Utils } from '../../common'

mdf(moment)

const styles = theme => ({
  navbar: {
    marginTop: theme.spacing.unit,
    position: 'fixed',
    bottom: `calc(1em + ${theme.spacing.unit * 2}px)`,
    width: '100%',
    boxShadow: `0 0 ${theme.spacing.unit}px rgba(0,0,0,0.2)`,
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 256px)',
      flexShrink: 0,
    },
  },
  bottom: {
    boxShadow: 'none',
  },
  basketResume: {
    bottom: 0,
    position: 'fixed',
    padding: `${theme.spacing.unit}px 0`,
    width: '100%',
    height: `calc(1em + ${theme.spacing.unit * 2}px)`,
    background: 'rgba(0,0,0,0.54)',
    color: '#fff',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 256px)',
    },
  },
})

const changeIsBottomBuilder = setisBottom =>
  throttle(
    () => setisBottom(window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2),
    100
  )

const activateTheRightNavBuilder = setSelected => {
  const activatedNav = []

  const _cleanup = debounce(() => {
    const index = activatedNav.indexOf(true)
    setSelected(index < 0 ? null : index)
  }, 100)

  function _process(index, match) {
    activatedNav[index] = !!match
    _cleanup()
  }

  return _process
}

const navConfiguration = [
  {
    route: ROUTE_PRESTATION_BASKET,
    label: 'Panier',
    icon: <SlimBasketButton />,
  },
  {
    route: '/address',
    label: 'Adresse',
    icon: <LocationOnIcon />,
  },
  {
    route: '/date',
    label: 'Date',
    icon: <EventIcon />,
  },
]

const formatDuration = duration => moment.duration(duration, 'minutes').format('h [h] mm [min.]')

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
)(
  withStyles(styles)(props => {
    const { classes, basket } = props
    const [selected, setSelected] = React.useState(null)
    const [isBottom, setisBottom] = React.useState(false)

    const activateTheRightNav = activateTheRightNavBuilder(setSelected)

    const changeIsBottom = changeIsBottomBuilder(setisBottom)

    useEffect(() => {
      window.addEventListener('scroll', changeIsBottom)
      return () => window.removeEventListener('scroll', changeIsBottom)
    }, [])

    function setActiveLink(index) {
      return match => activateTheRightNav(index, match)
    }

    const subtotal = Utils.computeTotals(['duration', 'price'])(basket)

    return (
      <Fragment>
        <BottomNavigation
          value={selected}
          showLabels
          className={classNames({
            [classes.bottom]: isBottom,
            [classes.navbar]: true,
          })}
        >
          {navConfiguration.map(({ route, label, icon }, i) => (
            <BottomNavigationAction
              key={label + i}
              isActive={setActiveLink(i)}
              component={NavLink}
              to={route}
              label={label}
              icon={icon}
            />
          ))}
        </BottomNavigation>
        <div className={classes.basketResume}>
          {formatDuration(subtotal.duration)} -&nbsp;
          <Currency value={subtotal.price / 100} currency="EUR" />
        </div>
      </Fragment>
    )
  })
)
