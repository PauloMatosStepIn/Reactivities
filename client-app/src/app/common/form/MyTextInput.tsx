import { useField } from 'formik'
import React from 'react'
import { string } from 'yup/lib/locale'
import Form from 'react-bootstrap/Form'
import { Row } from 'react-bootstrap'

interface Props {
  placeholder: string
  name: string
  type?: string
  label?: string
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name)
  return (
    <div className="p-2">
      <Row>
        <span style={{ fontStretch: 'condensed', padding: '0px', color: 'primary', fontSize: '10px' }}>{props.label}</span>
        <input className={meta.touched && !!meta.error ? `form-control is-invalid` : `form-control`} {...field} {...props} />
      </Row>
      <Row className="pt-1 sm">{meta.touched && !!meta.error && <span className="btn btn-danger btn-sm ">{meta.error}</span>}</Row>
    </div>
  )
}
