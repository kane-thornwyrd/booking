import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

const main = createMuiTheme({
  typography: {
    fontFamily: ['Capriola', 'sans-serif'],
    useNextVariants: true,
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 400,
    h5: {
      color: 'inherit',
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#ff9d57',
      main: '#f86c28',
      dark: '#be3b00',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(255,255,255,0.1)',
      main: 'rgba(255,255,255,0.5)',
      dark: 'rgba(255,255,255,0.8)',
      contrastText: '#000',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

const paperbase = theme => ({
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#fff',
        [theme.breakpoints.up('sm')]: {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.contrastText,
        },
      },
    },
    MuiButton: {
      label: {
        textTransform: 'initial',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit,
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        margin: '0 16px',
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
          minWidth: 0,
        },
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit,
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
        backgroundColor: theme.palette.primary.main,
        fontSize: '1rem',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
    MuiGridListTileBar: {
      title: {
        fontSize: '0.8rem',
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
})

export const themes = {
  main,
  paperbase: paperbase(main),
}

export const ThemeContext = React.createContext(themes.main)
