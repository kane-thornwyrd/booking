import React from 'react'
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

import { APPROOT } from '../../routes'

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
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

const Navigator = ({ classes, navigator, ...other }) => (
  <Drawer variant="permanent" {...other}>
    <List disablePadding>
      <ListItem className={classNames(classes.item, classes.itemCategory)}>
        <Link to={APPROOT} style={{ color: '#000', textDecoration: 'inherit' }}>
          Booking
        </Link>
      </ListItem>
      {navigator.map(({ id, children }) => (
        <React.Fragment key={id}>
          <ListItem className={classes.categoryHeader}>
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              {id}
            </ListItemText>
          </ListItem>
          {children.map(({ id: childId, to }) => (
            <NavLink
              exact
              strict
              key={childId}
              to={to}
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
                  {childId}
                </ListItemText>
              </ListItem>
            </NavLink>
          ))}
          <Divider className={classes.divider} />
        </React.Fragment>
      ))}
    </List>
  </Drawer>
)

const mapStateToProps = state => ({
  navigator: state.core.navigator,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navigator))
