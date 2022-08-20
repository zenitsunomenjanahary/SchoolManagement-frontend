import { Alert } from 'antd'
import React from 'react'

const Error = () => {
  return (
    <Alert message={"An error was occured"} description={"Verify your internet connexion"} type="error"/>
  )
}

export default Error