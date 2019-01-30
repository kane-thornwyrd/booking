import createCachedSelector from 're-reselect'
import _ from 'lodash'

import { Utils } from '../../../common'

const getReferenceObjectsArray = (state, props) => {
  if (!state.core.getUniverse || !props.list) return []
  return state.core.getUniverse.filter(item => item.reference === props.list)
}

const getSubReferenceObjectsArray = (state, props) => {
  if (!state.core.getUniverse || !props.list || !props.sublist) return [Utils.ALL]
  return reference(state, props).categories.filter(category => category.reference === props.sublist)
}

export const reference = createCachedSelector(
  getReferenceObjectsArray,
  referenceObjectsArray => referenceObjectsArray[0]
)((state, props) => props.list)

export const subReference = createCachedSelector(
  getSubReferenceObjectsArray,
  subReferenceObjectsArray => subReferenceObjectsArray[0]
)((state, props) => props.sublist || Utils.ALL)

const constructSubRef = (ref, subRef) =>
  subRef.prestations.map(prestation => ({
    reference: ref.reference,
    subReference: subRef.reference,
    prestationReference: prestation.reference,
    categoryTitle: subRef.title,
    title: prestation.title,
    duration: prestation.duration,
    price: prestation.price,
  }))

export const prestations = createCachedSelector(reference, subReference, (ref, subRef) => {
  if (!ref) return undefined
  if (subRef === Utils.ALL)
    return _.flatten(ref.categories.map(subRef => constructSubRef(ref, subRef)))

  return _.flatten(constructSubRef(ref, subRef))
})((state, props) => `${props.list}:${props.sublist || Utils.ALL}`)
