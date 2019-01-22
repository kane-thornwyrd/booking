import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PublicIcon from '@material-ui/icons/Public'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import TimerIcon from '@material-ui/icons/Timer'
import SettingsIcon from '@material-ui/icons/Settings'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'

import UniverseContext from '../../common/contexts/UniverseContext'

import { Loading, Utils } from '../../common'

import { APPROOT } from '../../routes'

const styles = theme => ({
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    textDecoration: 'inherit',
    color: 'inherit',
  },
  itemCategory: {
    boxShadow: '0 -1px 0 #000 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  itemActiveItem: {
    color: theme.palette.secondary.main,
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
})

const universeToNavigatorFilter = ({ categories, reference, title }) => [
  { categories, reference, title },
]

const Navigator = ({ classes, ...other }) => {
  const universeContext = useContext(UniverseContext)

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <Link to={APPROOT} style={{ color: '#000', textDecoration: 'inherit' }}>
          <ListItem button className={classNames(classes.item, classes.itemCategory)}>
            Booking
          </ListItem>
        </Link>
        {!universeContext ? (
          <Loading />
        ) : (
          universeToNavigatorFilter(universeContext).map(({ categories, reference, title }) => (
            <React.Fragment key={reference}>
              <NavLink
                exact
                strict
                key={reference}
                to={Utils.makeUrl(reference)}
                activeClassName={classes.itemActiveItem}
                className={classNames(classes.item)}
              >
                <ListItem button>
                  <ListItemText disableTypography>{title}</ListItemText>
                </ListItem>
              </NavLink>
              {categories.map(({ reference: subRef, title: subTitle }) => (
                <NavLink
                  exact
                  strict
                  key={subRef}
                  to={Utils.makeUrl(reference, subRef)}
                  activeClassName={classes.itemActiveItem}
                  className={classNames(classes.item)}
                >
                  <ListItem button dense>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                        textDense: classes.textDense,
                      }}
                    >
                      {subTitle}
                    </ListItemText>
                  </ListItem>
                </NavLink>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))
        )}
      </List>
    </Drawer>
  )
}

const mapStateToProps = state => ({
  navigator: state.core.navigator,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navigator))
