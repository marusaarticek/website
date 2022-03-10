import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from 'three';




const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);

/*
const loader = new GLTFLoader();
loader.load('alpaca.glb', function(gltf) {
  scene.add(gltf.scene);
});
*/


const geometry = new THREE.SphereGeometry( 10, 10, 10 );
//geometry.position.set(15, 30, 10);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

const backwall = new THREE.TextureLoader().load('envi.jpg');
scene.background = backwall;

const loader = new GLTFLoader();

loader.load( 'alpaca.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );


function animate() {
  requestAnimationFrame( animate );

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}
animate()