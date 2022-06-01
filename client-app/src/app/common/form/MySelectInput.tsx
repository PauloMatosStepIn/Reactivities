import { useField } from 'formik'
import React from 'react'
import { string } from 'yup/lib/locale'
import Form from 'react-bootstrap/Form'
import { Row } from 'react-bootstrap'
import { categoryOptions } from '../options/categoryOptions'

interface Props {
  placeholder: string
  name: string
  options: {
    text: string
    value: string
  }[]
  label?: string
}

export default function MySelectInput(props: Props) {
  const [field, meta, helpers] = useField(props.name)

  const { setValue, setTouched, setError } = helpers

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div className="p-2">
      <Row>
        <Form.Control as="select" onBlur={() => helpers.setTouched(true)} onChange={e => handleChange(e)} value={field.value || null} className={meta.touched && !!meta.error ? `form-control is-invalid` : `form-control`} name="{props.name}">
          <option key={'Blank'} value={''}>
            *** Choose Category ***
          </option>
          {props.options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </Form.Control>
      </Row>
      <Row className="pt-1 sm">{meta.touched && !!meta.error && <span className="btn btn-danger btn-sm ">{meta.error}</span>}</Row>
    </div>
  )
}
