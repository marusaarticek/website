import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from 'three';

//  Always need; 1.Scene, 2.Camera, 3.Rendere
//  --> CAMERA: 75;field of view, aspect ratio, view frustum-objects visible in corelation to camera

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //default position is center

renderer.render(scene, camera); // render == draw

//-----------------------------------------------

const geometry = new THREE.SphereGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0xF5F5F5} );
const sphere = new THREE.Mesh( geometry, material );

sphere.position.x += 5;
sphere.position.y += 5;
sphere.position.z += 15;

scene.add( sphere );


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// helpers: show position of light source-wireframe, shows grid;
const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)

// orbit controls: move around the scene, listen to dom events on the mouse
const controls = new OrbitControls(camera, renderer.domElement);

//  adding background image 
const backwall = new THREE.TextureLoader().load('pastelorange.jpg');
scene.background = backwall;

const loader = new GLTFLoader();

/*
loader.load( 'bear.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
*/

// Adding 3D glf files:
// load glb file, generate random x, y, z position for each mesh
// add number of meshes with the array

function addBear() {
  loader.load( 'bear.glb', function ( gltf ) {
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250) );
    const bear = gltf.scene;
    bear.position.set(x, y, z);
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.error( error );
  } );
}

Array(200).fill().forEach(addBear)

//-------------------------



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  camera.position.z = t * 0.01;
  camera.position.x = t * 0.01;
  camera.rotation.y = t * 0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame( animate );

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.02;
  sphere.rotation.z += 0.02;

  controls.update();

  renderer.render( scene, camera);
}
animate()