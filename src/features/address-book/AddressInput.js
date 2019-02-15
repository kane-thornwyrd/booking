import React, { Fragment, useState } from 'react'
import { omit } from 'lodash'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'

export const fieldsConf = [
  {
    id: 'houseNameNumber',
    label: 'Lieux-dit/numéro',
    initialValue: '',
    fullWidth: true,
    schema: Yup.string().required('Champ requis'),
  },
  {
    id: 'addressLine1',
    label: 'Adresse',
    initialValue: '',
    fullWidth: true,
    schema: Yup.string().required('Champ requis'),
  },
  {
    id: 'addressLine2',
    label: "Suite de l'adresse (optionelle)",
    initialValue: '',
    fullWidth: true,
  },
  {
    id: 'city',
    label: 'Ville',
    initialValue: '',
    fullWidth: true,
    schema: Yup.string().required('Champ requis'),
  },
  {
    id: 'zip',
    label: 'Code postal',
    initialValue: '',
    fullWidth: true,
    schema: Yup.string().required('Champ requis'),
  },
]

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  margin: {
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  },
  buttonsBar: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

const makeTextField = ({ touched, errors, values, handleChange }) => ({ id, label, ...props }) => (
  <TextField
    key={id}
    id={id}
    name={id}
    helperText={touched && touched[id] ? errors[id] : ''}
    error={touched && touched[id] && !!errors[id]}
    label={label}
    value={values && values[id]}
    onChange={handleChange(id)}
    {...omit(props, ['initialValue', 'schema'])}
  />
)

const handleChangeMaker = ({ handleChange, setFieldTouched }) => id => e => {
  e.persist()
  handleChange(e)
  setFieldTouched(id, true, false)
}

const AddressInput = ({
  classes,
  touched,
  errors,
  values,
  handleChange,
  isValid,
  setFieldTouched,
  handleReset,
  handleSubmit,
  isSubmitting,
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Fragment>
      <Button
        size="small"
        color="primary"
        variant="contained"
        disabled={expanded}
        aria-label="Ajouter une adresse"
        onClick={() => setExpanded(true)}
      >
        <AddIcon className={classes.margin} /> Ajouter une adresse
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {fieldsConf.map(
          makeTextField({
            touched,
            errors,
            values,
            handleChange: handleChangeMaker({ handleChange, setFieldTouched }),
          })
        )}
        <div className={classes.buttonsBar}>
          <Button color="secondary" variant="contained" onClick={() => setExpanded(false)}>
            Annuler
          </Button>
          <Button color="default" variant="outlined" onClick={handleReset}>
            Remise à zéro
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!isValid || isSubmitting}
            onClick={e => {
              setExpanded(false)
              handleSubmit(e)
            }}
          >
            Ajouter l'adresse
          </Button>
        </div>
      </Collapse>
    </Fragment>
  )
}

export default withStyles(styles)(AddressInput)
