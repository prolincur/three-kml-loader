/*
 * Copyright (c) 2020-23 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import * as THREE from 'three'
import ToGeoJson from '@mapbox/togeojson'
import { GeoJsonLoader } from 'three-geojson-loader'

class KmlLoader extends THREE.FileLoader {
  constructor(manager) {
    super(manager)
    this.color = 0xffffff
    this.transform = new THREE.Matrix4()
  }

  setColor(color) {
    this.color = color
    return this
  }

  setTransform(transform) {
    if (transform instanceof THREE.Matrix4) {
      this.transform = transform
    }
    return this
  }

  load(url, onLoad, onProgress, onError) {
    const scope = this
    return super.load(
      url,
      (text) => {
        try {
          const entities = scope.parse(text)
          onLoad(entities)
        } catch (error) {
          onError(error)
        }
      },
      onProgress,
      onError
    )
  }

  parse(text) {
    const scope = this
    const geojson = scope.parseToGeoJson(text)
    if (!geojson) return null

    const loader = new GeoJsonLoader()
    loader.setColor(scope.color)
    loader.setTransform(scope.transform)

    return loader.parse(geojson)
  }

  parseToGeoJson(text) {
    if (!text) return null
    let xmlDoc = null
    const win = window || {}
    if (typeof text === 'string') {
      const parser = new DOMParser()
      xmlDoc = parser.parseFromString(text, 'text/xml')
    } else if (win.Node && text instanceof win.Node) {
      xmlDoc = text
    } else {
      console.warn('Unsupported input', text)
      xmlDoc = text
    }

    const geojson = ToGeoJson.kml(xmlDoc, { styles: true })
    return geojson
  }
}

export { KmlLoader }
