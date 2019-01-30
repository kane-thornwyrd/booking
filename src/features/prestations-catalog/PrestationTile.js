import React, { Fragment, useState } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { Image } from '../../common'

export default props => {
  const { title, prestations, classes, isGreaterThanSM } = props
  const [arrowRef, setArrowRef] = useState(null)

  return (
    <Fragment>
      <GridListTile key="Subheader" style={{ height: 'auto', width: '100%' }}>
        <ListSubheader component="div">{title}</ListSubheader>
      </GridListTile>
      {prestations.map(prestation => (
        <Tooltip
          key={`${prestation.reference}:${prestation.subReference}:${
            prestation.prestationReference
          }`}
          title={
            <React.Fragment>
              {prestation.categoryTitle} - {prestation.title}
              <span className={classes.arrow} ref={setArrowRef} />
            </React.Fragment>
          }
          classes={{ popper: classes.arrowPopper }}
          PopperProps={{
            popperOptions: {
              modifiers: {
                arrow: {
                  enabled: Boolean(arrowRef),
                  element: arrowRef,
                },
              },
            },
          }}
        >
          <GridListTile>
            <Image
              source={`https://loremflickr.com/g/${isGreaterThanSM ? 180 : 360}/180/${
                prestation.reference
              },${prestation.subReference}/all?random=${prestation.reference}-${
                prestation.subReference
              }-${prestation.prestationReference}`}
              alt={`${prestation.categoryTitle} - ${prestation.title}`}
              width={isGreaterThanSM ? 180 : 360}
              height={180}
            />
            <GridListTileBar
              title={`${prestation.categoryTitle} - ${prestation.title}`}
              subtitle={
                <span>
                  {prestation.duration}min. - {prestation.price / 100} €
                </span>
              }
              actionIcon={
                <IconButton className={classes.icon}>
                  <AddShoppingCartIcon />
                </IconButton>
              }
            />
          </GridListTile>
        </Tooltip>
      ))}
    </Fragment>
  )
}
