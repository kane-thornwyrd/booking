import React, { useState } from 'react'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Paper from '@material-ui/core/Paper'

import Navigator from './Navigator'
import Header from './Header'
import BottomNavigation from './BottomNavigation'

const drawerWidth = 256

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  'paper-root': {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px calc(1em + ${65 +
      theme.spacing.unit * 2}px)`,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      paddingBottom: theme.spacing.unit,
      margin: `0px 0px calc(1em + ${65 + theme.spacing.unit * 2}px)`,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0`,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
})

const Layout = ({ children, classes }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDrawer = () => setMobileOpen(!mobileOpen)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            togglecallback={toggleDrawer}
          />
        </Hidden>
        <Hidden xsDown implementation="css">
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </Hidden>
      </nav>
      <div className={classes.appContent}>
        <Header onDrawerToggle={() => setMobileOpen(!mobileOpen)} />
        <Paper square className={classes['paper-root']}>
          <main className={classes.mainContent}>{children}</main>
        </Paper>
        <BottomNavigation />
      </div>
    </div>
  )
}

export default withStyles(styles)(Layout)
