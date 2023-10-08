
# three-kml-loader

**three-kml-loader** is a cross platform [GeoJSON](https://www.rfc-editor.org/rfc/rfc7946.html) file loader for THREE.js. It takes URL of a GeoJSON file or object of GeoJSON data as an input and returns THREE.js Object3D entities. This library works out of the box with cross platform react-native and react-three-fibre as well.

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

### Author

[Prolincur Technologies](https://prolincur.com)
