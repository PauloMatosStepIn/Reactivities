import { Row } from 'react-bootstrap'

interface Props {
  errors: any
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <>
      {errors && (
        <Row className="pt-1 sm">
          <span className="btn btn-danger btn-sm ">
            <ul>
              {errors.map((err: any, i: any) => (
                <li id={i}>{err}</li>
              ))}
            </ul>
          </span>
        </Row>
      )}
    </>
  )
}
