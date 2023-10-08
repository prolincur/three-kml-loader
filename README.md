
# three-kml-loader

**three-kml-loader** is a cross platform [KML](https://developers.google.com/kml/documentation/kmlreferencel) file loader for [THREE.js](https://threejs.org/). It takes URL of a KML file as an input and returns THREE.js [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity. This library works out of the box with cross platform react-native and react-three-fiber as well.

#### Install
```
yarn add three-kml-loader three
```
or
```
npm i three-kml-loader three
```

#### Usage

```javascript

import * as THREE from 'three'
import { KmlLoader } from 'three-kml-loader'

const loader = new KmlLoader();
loader.setColor(0xFF0000);
// loader.setTransform(new THREE.Matrix4());
const scene = new THREE.Scene();
onLoad = (data) => {
    scene.add(data);
}
const onError = (error) => {
  console.log(error);
}
const onProgress = (xhr) => {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
}
// url = 'http://to/my/kml/file.kml'
loader.load(url, onLoad, onProgress, onError);

```

### API 

#### `load(url, onLoad, onProgress, onError)`

Takes url of KML file as input and invokes `onLoad` when [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity is created. `onProgress` and `onError` are invokes as per the [FileLoader](https://threejs.org/docs/#api/en/loaders/FileLoader) documentation.

#### `parse(kml)`

If typeof `kml` is `string`, it will be [parsed to XML DOM](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/DOMParser). If `kml` instanceof `XML Node`, reads the specified in-memory kml.

It yields [Object3D](https://threejs.org/docs/?q=objec#api/en/core/Object3D) entity.

#### `parseToGeoJson(kml)`

If typeof `kml` is `string`, it will be [parsed to XML DOM](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/DOMParser). If `kml` instanceof `XML Node`, reads the specified in-memory kml.

It returns [GeoJSON](https://www.rfc-editor.org/rfc/rfc7946.html) object.

### Author

[Prolincur Technologies](https://prolincur.com)
