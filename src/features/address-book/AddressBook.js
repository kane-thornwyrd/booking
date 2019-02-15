import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik, Form } from 'formik'
import { flatMap, reduce, assign } from 'lodash'
import * as Yup from 'yup'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import HomeIcon from '@material-ui/icons/Home'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import EventIcon from '@material-ui/icons/Event'
import DeleteIcon from '@material-ui/icons/Delete'

import AddressInput, { fieldsConf } from './AddressInput'
import { actions as addressBookActions } from './'

const styles = theme => ({
  root: {
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: `${theme.spacing.unit * 2}px 0`,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  item: {
    margin: theme.spacing.unit,
    border: '1px solid rgba(0,0,0,0.34)',
    '&:first-of-type': {
      marginLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 2}px 0`,
      width: '100%',
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})

const extractValueToNewObject = target => valueName =>
  reduce(flatMap(target, n => ({ [n.id]: n[valueName] })), assign)

const AddressBook = props => {
  const {
    actions: { addToAddressBook, removeFromAddressBook },
    addresses,
    classes,
    children,
  } = props

  const [value, setValue] = useState(null)

  const handleChange = e => setValue(e.target.value)

  const handleDelete = address => e => removeFromAddressBook(address)

  const fieldConfExtractor = extractValueToNewObject(fieldsConf)

  return (
    <Fragment>
      <Typography variant="h5">Adresse</Typography>
      <Formik
        enableReinitialize
        onSubmit={addToAddressBook}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <AddressInput {...props} />
          </Form>
        )}
        initialValues={fieldConfExtractor('initialValue')}
        validationSchema={Yup.object().shape(fieldConfExtractor('schema'))}
      />
      <FormControl component="fieldset" className={classes.root}>
        <RadioGroup
          row
          aria-label="Address"
          name="AddressSelected"
          value={value}
          onChange={handleChange}
          className={classes.wrapper}
        >
          {addresses.map((address, i) => (
            <FormControlLabel
              key={i}
              className={classNames({ vcard: true, [classes.item]: true })}
              value={String(i)}
              control={
                <Radio color="primary" icon={<HomeOutlinedIcon />} checkedIcon={<HomeIcon />} />
              }
              label={
                <div className={classes.wrapper}>
                  <address
                    className={'adr'}
                    itemProp="address"
                    itemScope="itemscope"
                    itemType="http://data-vocabulary.org/Address/"
                  >
                    <span className={'street-address'} itemProp="street-address">
                      {address.houseNameNumber},&nbsp;
                      {address.addressLine1}
                      <br />
                      {address.addressLine2}
                    </span>
                    <span className={'locality'} itemProp="locality">
                      {address.city}
                      <br />
                    </span>
                    <abbr className={'postal-code'} itemProp="postal-code" title={address.zip}>
                      {address.zip}
                    </abbr>
                  </address>
                  <IconButton color="secondary" aria-label="Effacer cette adresse">
                    <DeleteIcon onClick={handleDelete(address)} />
                  </IconButton>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
      {!!addresses.length && (
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          component={Link}
          to={'/date'}
        >
          <EventIcon className={classes.leftIcon} />
          Date
        </Button>
      )}
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {
  return {
    addresses: state.addressBook.addresses,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addToAddressBook: addressBookActions.addToAddressBook,
        removeFromAddressBook: addressBookActions.removeFromAddressBook,
      },
      dispatch
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddressBook))
