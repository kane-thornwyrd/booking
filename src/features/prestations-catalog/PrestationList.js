import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withStyles, withTheme } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList'

import { contexts as commonContexts, Loading, Utils, If } from '../../common'

import { selectors as coreSelectors } from '../core'

import PrestationTile from './PrestationTile'

const styles = theme => ({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 0,
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

let smMediaQuery

const themeMediaQueryToMediaQuery = /^@media (.+)$/

const Content = ({ classes, children, theme, prestations, references, list, sublist }) => {
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

  if (!prestations || !references) return <Loading />

  return (
    <GridList spacing={0} cellHeight={180} className={classes.grid}>
      {references.map(reference => {
        return (
          <PrestationTile
            key={reference.reference}
            title={reference.title}
            prestations={prestations}
            classes={classes}
            isGreaterThanSM={isGreaterThanSM}
            isReferenceRoot={!sublist}
          />
        )
      })}
    </GridList>
  )
}

const mapStateToProps = (state, props) => {
  return {
    prestations: coreSelectors.prestations(state, props),
    references: coreSelectors.references(state, props),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme()(withStyles(styles)(Content)))
