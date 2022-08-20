import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <Spin tip="chargement des données">
        Merci de patienter
    </Spin>
  )
}

export default Loading