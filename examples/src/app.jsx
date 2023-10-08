/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { KmlFile } from './kml-file'

const URL = '/sample.kml'

function App() {
  const [cameraPos, setCameraPos] = React.useState([0, 0, 0])

  const onRenderJson = React.useCallback((json) => {
    const box = new THREE.Box3()
    const bbox = box.setFromObject(json)
    const res = new THREE.Vector3()
    bbox.getCenter(res)
    setCameraPos([res.x, res.y, 100])
  }, [])

  return (
    <div style={{ height: '100vh', background: 'black' }}>
      <Canvas>
        <OrthographicCamera makeDefault position={cameraPos} />
        <ambientLight />
        <OrbitControls enableRotate={false} />
        <React.Suspense fallback={null}>
          <KmlFile onRender={onRenderJson} url={URL} />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

export default App
