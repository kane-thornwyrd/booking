import createCachedSelector from 're-reselect'
import _ from 'lodash'

import { Utils } from '../../../common'

const getReferencesObjectsArray = (state, props) => {
  if (!state.core.getUniverse) return undefined
  if (!props.list) return state.core.getUniverse
  return state.core.getUniverse.filter(item => item.reference === props.list)
}

const getSubReferencesObjectArray = (state, props) => {
  if (!state.core.getUniverse) return undefined
  if (!props.sublist) return getReferencesObjectsArray(state, props)
  return getReferencesObjectsArray(state, props).map(ref => ({
    reference: ref.reference,
    title: ref.title,
    categories: ref.categories.filter(cat => cat.reference === props.sublist),
  }))
}

export const references = createCachedSelector(getReferencesObjectsArray, referenceObjectsArray => {
  if (!referenceObjectsArray) return undefined
  return referenceObjectsArray.map(ref => ({
    title: ref.title,
    reference: ref.reference,
    categories: ref.categories.map(category => ({
      reference: category.reference,
      title: category.title,
    })),
  }))
})((state, props) => props.list || Utils.ALL)

export const prestations = createCachedSelector(
  getSubReferencesObjectArray,
  subReferencesObjectsArray => {
    if (!subReferencesObjectsArray) return undefined
    return _.flatten(
      subReferencesObjectsArray.map(ref =>
        _.flatten(ref.categories.map(subref => constructSubRef(ref, subref)))
      )
    )
  }
)((state, props) => `${props.list || Utils.ALL}:${props.sublist || Utils.ALL}`)

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
