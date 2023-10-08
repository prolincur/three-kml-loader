/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useLoader } from '@react-three/fiber'
import { KmlLoader } from 'three-kml-loader'

function KmlFile({ url, onRender }) {
  const group = useLoader(KmlLoader, url)
  React.useEffect(() => {
    if (group) {
      onRender(group)
    }
  }, [group, onRender])

  if (!url) return null
  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={group} />
}

KmlFile.propTypes = {
  url: PropTypes.string,
}

KmlFile.defaultProps = {
  url: '',
}

export { KmlFile }
