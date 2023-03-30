import {
	AmbientLight,
	Box3,
	DirectionalLight,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer,
} from 'https://esm.sh/three@0.150.1';
import { OrbitControls } from 'https://esm.sh/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://esm.sh/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

customElements.define(
	'wm-andante-model',
	class extends HTMLElement {
		constructor() {
			super();

			const renderer = new WebGLRenderer();

			// set the size of the renderer
			renderer.setSize(window.innerWidth, window.innerHeight);

			// create the scene
			const scene = new Scene();

			// create the camera
			const camera = new PerspectiveCamera(
				75,
				window.innerWidth / window.innerHeight,
				0.1,
				1000,
			);

			// create the controls
			const controls = new OrbitControls(camera, renderer.domElement);

			controls.enableZoom = false;

			//start the camera a bit further away
			camera.position.z = 5;

			// set the camera position
			camera.position.z = 5;

			// create the ambient light but make it really strong
			const ambientLight = new AmbientLight(0xffffff, 1);
			scene.add(ambientLight);

			// create the directional light but make it really strong
			const directionalLight = new DirectionalLight(0xffffff, 1);
			scene.add(directionalLight);

			// load the adante model
			const loader = new GLTFLoader();

			loader.load(
				'../../assets/models/adante/adante.gltf',
				(gltf) => {
					const object = gltf.scene;
					//scale down the model a lot
					object.scale.set(0.001, 0.001, 0.001);
					//center the model
					const box = new Box3().setFromObject(object);

					// deno-lint-ignore no-unused-vars
					const boxSize = box.getSize(new Vector3()).length();
					const boxCenter = box.getCenter(new Vector3());
					object.position.x = -boxCenter.x;
					object.position.y = -boxCenter.y;
					object.position.z = -boxCenter.z;

					//add the model to the scene
					scene.add(object);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				},
				console.error,
			);

			// render the scene
			const render = () => {
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			};
			render();

			// make the background transparent
			renderer.setClearColor(0x000000, 0);

			// add the renderer to the DOM
			renderer.domElement.classList.add('max-w-lg', 'z-10');
			this.attachShadow({ mode: 'open' });
			this.shadowRoot?.appendChild(renderer.domElement);
		}
	},
);
