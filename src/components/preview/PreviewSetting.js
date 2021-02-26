import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { COMPONENT_TYPES } from 'helper/commonNames'

export default function PreviewSetting({ item }) {
  return (
    item ? (
      <div>
        <h1>Settings</h1>
      </div>
    ) : (<></>)
  )
}
