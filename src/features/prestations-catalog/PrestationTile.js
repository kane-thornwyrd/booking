import React, { Fragment, useState } from 'react'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import { Image } from '../../common'

import { AddToBasketButton } from '../prestations-basket'

const PrestationTile = props => {
  const { key, title, prestations, classes, isGreaterThanSM, isReferenceRoot } = props

  const [arrowRef, setArrowRef] = useState(null)
  let subtitle
  if (!isReferenceRoot) subtitle = prestations[0].categoryTitle
  return (
    <Fragment>
      <GridListTile key="Subheader" style={{ height: 'auto', width: '100%' }}>
        <Typography variant="h5">{isReferenceRoot ? title : `${title} - ${subtitle}`}</Typography>
      </GridListTile>
      {prestations.map(prestation => (
        <Tooltip
          key={`${prestation.reference}:${prestation.subReference}:${
            prestation.prestationReference
          }`}
          title={
            <React.Fragment>
              {isReferenceRoot
                ? `${prestation.categoryTitle}
                - ${prestation.title}`
                : prestation.title}
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
          <GridListTile style={{ height: '180px' }}>
            <Image
              source={`https://loremflickr.com/g/${isGreaterThanSM ? 180 : 300}/180/${
                prestation.reference
              },${prestation.subReference}/all?random=${prestation.reference}-${
                prestation.subReference
              }-${prestation.prestationReference}`}
              alt={`${prestation.categoryTitle} - ${prestation.title}`}
              width={isGreaterThanSM ? 180 : 300}
              height={180}
            />
            <GridListTileBar
              title={
                isReferenceRoot
                  ? `${prestation.categoryTitle}
                  - ${prestation.title}`
                  : prestation.title
              }
              subtitle={
                <span>
                  {prestation.duration}min. - {prestation.price / 100} €
                </span>
              }
              actionIcon={<AddToBasketButton item={{ ...prestation, ...{ mainTitle: title } }} />}
            />
          </GridListTile>
        </Tooltip>
      ))}
    </Fragment>
  )
}

export default PrestationTile
