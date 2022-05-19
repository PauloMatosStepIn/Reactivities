import React from 'react'
import { Row } from 'react-bootstrap'

interface Props {
  inverted?: boolean
  content?: string
  isButton?: boolean
}

export default function LoadingComponent({ isButton = false,   inverted = false, content = 'Loading...' }: Props) {
  if (isButton) {
    return (
      <>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> {content}
      </>
    )
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border m-5" role="status"></div>
    </div>
  )
}
