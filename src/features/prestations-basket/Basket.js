import React, { Fragment, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import mdf from 'moment-duration-format'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { Currency, Utils } from '../../common'
import { AddToBasketButton, RemoveFromBasketButton } from './'

import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

mdf(moment)

const styles = theme => ({
  table: {
    borderCollapse: 'collapse',
    color: 'gray',
    '& th': {
      textTransform: 'uppercase',
      fontWeight: 200,
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      textAlign: 'left',
    },
    '& tr': {
      '&:nth-child(odd)': {
        backgroundColor: '#ddd',
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
      '&:last-of-type': {
        fontWeight: 900,
      },
    },
    '& td': {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
    },
  },
})

function buildId(base) {
  const known = {}
  return current => {
    if (typeof known[current] === 'undefined') {
      known[current] = 0
    } else {
      known[current]++
    }
    return `${base}${current}${known[current]}`
  }
}

const formatDuration = duration => moment.duration(duration, 'minutes').format('h [h] mm [min.]')

const Basket = props => {
  const { classes, basket } = props
  const keyMaker = buildId('')

  const subtotal = Utils.computeTotals(['duration', 'price'])(basket)

  return (
    <Fragment>
      <Typography variant="h5">Panier</Typography>
      <Table className={classes.table}>
        <Thead>
          <Tr>
            <Th>Prestation</Th>
            <Th>Durée</Th>
            <Th>Prix</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {basket.map((item, index) => {
            const {
              reference,
              subReference,
              prestationReference,
              categoryTitle,
              title,
              duration,
              price,
              mainTitle,
            } = item
            return (
              <Fade
                key={keyMaker(`${reference}${subReference}${prestationReference}`)}
                in={true}
                timeout={500 * index}
              >
                <Tr>
                  <Td>
                    {mainTitle} {categoryTitle} - {title}
                  </Td>
                  <Td>{formatDuration(duration)}</Td>
                  <Td>
                    <Currency value={price / 100} currency="EUR" />
                  </Td>
                  <Td>
                    <AddToBasketButton item={item} />
                    <RemoveFromBasketButton item={item} index={index} />
                  </Td>
                </Tr>
              </Fade>
            )
          })}
          <Tr>
            <Td>Total</Td>
            <Td>{formatDuration(subtotal.duration)}</Td>
            <Td>
              <Currency value={subtotal.price / 100} currency="EUR" />
            </Td>
            <Td />
          </Tr>
        </Tbody>
      </Table>
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
)(withStyles(styles)(Basket))
