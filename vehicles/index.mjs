// @deno-types="npm:@types/three"
import {
	AmbientLight,
	BoxGeometry,
	DirectionalLight,
	Mesh,
	MeshLambertMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from 'https://esm.sh/three@0.150.1/build/three.module.js';

import{
	GLTFLoader,
} from 'https://esm.sh/three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js';

const scene = new Scene();

//get gltf from assets/models/adante.gltf
const loader = new GLTFLoader();
loader.load('../../assets/models/adante.gltf', (gltf) => {
	console.log(gltf);
	const model = gltf.scene;
	// model.scale.set(0.1, 0.1, 0.1);
	// model.position.set(0, 0, 0);
	scene.add(model);
});

// Set up lights
const ambientLight = new AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);

// Camera
const width = 10;
const height = width * (window.innerHeight / (window.innerWidth * 0.5));
const camera = new PerspectiveCamera(45, width / height, 1, 1000);

camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

camera.updateProjectionMatrix();


// Renderer
const renderer = new WebGLRenderer({ antialias: true });
//renderer.setClearColor( 0xffffff, 0);
renderer.setSize(window.innerWidth * 0.5, window.innerHeight);


// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

renderer.render(scene, camera);
renderer.domElement.classList.add('max-w-6xl', 'z-10');
document.querySelector('#main')?.appendChild(renderer.domElement);
