import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withStyles, withTheme } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'

import { contexts as commonContexts, Loading, Utils, If } from '../../common'

import { selectors as coreSelectors } from '../core'

import PrestationTile from './PrestationTile'

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  arrowPopper: Utils.arrowGenerator(theme.palette.primary.light),
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
})

const isReferenceRoot = subReference => subReference === Utils.ALL

let smMediaQuery

const themeMediaQueryToMediaQuery = /^@media (.+)$/

const Content = ({ classes, children, theme, prestations, reference, subReference }) => {
  const [isGreaterThanSM, setGreaterThanSM] = useState(false)

  const toggleGreaterThanSM = evt => setGreaterThanSM(evt.matches)

  useEffect(() => {
    smMediaQuery = window.matchMedia(
      themeMediaQueryToMediaQuery.exec(theme.breakpoints.up('sm'))[1]
    )
    smMediaQuery.addListener(toggleGreaterThanSM)
    setGreaterThanSM(smMediaQuery.matches)
    return () => smMediaQuery.removeListener(toggleGreaterThanSM)
  }, [])

  const universeContext = useContext(commonContexts.UniverseContext)
  if (!universeContext) return <Loading />

  return (
    <Paper square elevation={1} className={classes.root}>
      <GridList cellHeight={180} className={classes.grid}>
        <If is={isReferenceRoot(subReference)}>
          <PrestationTile
            title={reference.title}
            prestations={prestations}
            classes={classes}
            isGreaterThanSM={isGreaterThanSM}
          />
        </If>

        <If is={!isReferenceRoot(subReference)}>
          <PrestationTile
            title={`${reference.title} - ${subReference.title}`}
            prestations={prestations}
            classes={classes}
            isGreaterThanSM={isGreaterThanSM}
          />
        </If>
      </GridList>
    </Paper>
  )
}

const mapStateToProps = (state, props) => {
  return {
    core: state.core,
    prestations: coreSelectors.prestations(state, props),
    reference: coreSelectors.reference(state, props),
    subReference: coreSelectors.subReference(state, props),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Content)))
