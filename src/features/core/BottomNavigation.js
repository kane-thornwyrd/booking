import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { throttle, debounce } from 'lodash'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import EventIcon from '@material-ui/icons/Event'

import { SlimBasketButton, ROUTE_PRESTATION_BASKET } from '../prestations-basket'

const styles = theme => ({
  navbar: {
    marginTop: theme.spacing.unit,
    position: 'fixed',
    bottom: 0,
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

export default withStyles(styles)(props => {
  const { classes } = props
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

  return (
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
  )
})
