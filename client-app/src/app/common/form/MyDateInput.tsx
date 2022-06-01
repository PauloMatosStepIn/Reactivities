import { useField } from 'formik'
import React from 'react'
import { string } from 'yup/lib/locale'
import Form from 'react-bootstrap/Form'
import { Row } from 'react-bootstrap'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

interface Props {
  placeholder: string
  name: string
  label?: string
}

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!)
  return (
    <div className="p-2">
      <Row>
        <ReactDatePicker className={meta.touched && !!meta.error ? `FullWidth form-control is-invalid` : `FullWidth form-control`} {...field} {...props} onChange={value => helpers.setValue(value)} selected={(field.value && new Date(field.value)) || null} />
      </Row>
      <Row className="pt-1 sm">{meta.touched && !!meta.error && <span className="btn btn-danger btn-sm ">{meta.error}</span>}</Row>
    </div>
  )
}
