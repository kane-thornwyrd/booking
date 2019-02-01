import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { NavLink, Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import { Loading } from '../../common'

import { selectors as coreSelectors } from '../core'

import { ROUTE_APPROOT } from '../home'
import { makeUrl as prestationCatalogMakeUrl } from '../prestations-catalog'

const styles = theme => ({
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    textDecoration: 'inherit',
    color: 'inherit',
  },
  itemActiveItem: {
    color: theme.palette.primary.light,
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

const Navigator = ({ classes, togglecallback, references, ...other }) => (
  <Drawer variant="permanent" {...other}>
    <List disablePadding>
      {!references ? (
        <Loading />
      ) : (
        references.map(({ categories, reference, title }) => (
          <React.Fragment key={reference}>
            <NavLink
              exact
              strict
              key={reference}
              to={prestationCatalogMakeUrl({ ref: reference })}
              activeClassName={classes.itemActiveItem}
              className={classNames(classes.item)}
              onClick={togglecallback}
            >
              <ListItem button component="span">
                <Typography align="center" variant="h5">
                  {title}
                </Typography>
              </ListItem>
            </NavLink>
            {categories.map(({ reference: subRef, title: subTitle }) => (
              <NavLink
                exact
                strict
                key={subRef}
                to={prestationCatalogMakeUrl({ ref: reference, subRef })}
                activeClassName={classes.itemActiveItem}
                className={classNames(classes.item)}
                onClick={togglecallback}
              >
                <ListItem button dense component="span">
                  {subTitle}
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

const mapStateToProps = (state, props) => {
  return {
    references: coreSelectors.references(state, props),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navigator))
