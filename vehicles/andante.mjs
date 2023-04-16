import {
	AmbientLight,
	Box3,
	DirectionalLight,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer,
	PointLight,
	Raycaster,
	Vector2,
	Plane,
} from 'https://esm.sh/three@0.151.3?bundle';
import { OrbitControls } from 'https://esm.sh/three@0.151.3/examples/jsm/controls/OrbitControls.js?bundle';
import { GLTFLoader } from 'https://esm.sh/three@0.151.3/examples/jsm/loaders/GLTFLoader.js?bundle';

customElements.define(
	'wm-andante-model',
	class extends HTMLElement {
		constructor() {
			super();
			this.classList.add('w-full');
			const renderer = new WebGLRenderer();
			//make the renderer a fixed ratio, not dependent on the window size
			renderer.setSize(800, 600);
			const scene = new Scene();
			const camera = new PerspectiveCamera(
				75,
				renderer.domElement.width / renderer.domElement.height,
				0.1,
				1000
			);
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableZoom = false;
			camera.position.z = 5;
			const ambientLight = new AmbientLight(0xffffff, 5);
			scene.add(ambientLight);
			const directionalLight = new DirectionalLight(0xffffff, 1);
			directionalLight.position.set(0, 0, 1);
			scene.add(directionalLight);
			const directionalLight2 = new DirectionalLight(0xffffff, 1);
			directionalLight2.position.set(0, 0, -1);
			scene.add(directionalLight2);
			const loader = new GLTFLoader();
			loader.load(
				'../../assets/models/adante/adante.gltf',
				(gltf) => {
					const object = gltf.scene;
					object.scale.set(0.001, 0.001, 0.001);
					const box = new Box3().setFromObject(object);
					const boxCenter = box.getCenter(new Vector3());
					object.position.x = -boxCenter.x;
					object.position.y = -boxCenter.y;
					object.position.z = -boxCenter.z;
					scene.add(object);
				},
				(xhr) => {
					console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				},
				console.error
			);

			const raycaster = new Raycaster();
			const mouse = new Vector2();
			const intersectPoint = new Vector3();

			const plane = new Plane(new Vector3(0, 0, 0), 0);

			/**
			 * @param {PerspectiveCamera} camera
			 */
			function updatePlane(camera) {
				const forward = new Vector3();
				camera.getWorldDirection(forward);

				plane.normal.copy(forward);

				const cameraPos = new Vector3();
				camera.getWorldPosition(cameraPos);
				plane.constant = cameraPos.dot(forward);
				//move the plane closer to the camera, so that the light doesn't get too bright when the mouse is far away from the model
				plane.constant += 5;
			}

			/**
			 * @param {MouseEvent | TouchEvent} event
			 */
			function onMouseMove(event) {
				const rect = renderer.domElement.getBoundingClientRect();
				mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
			}

			/**
			 * @param {PerspectiveCamera} camera
			 * @param {import('https://esm.sh/three@0.151.3?bundle').Object3D} model
			 */
			function updateIntersectPoint(camera, model) {
				updatePlane(camera);
				raycaster.setFromCamera(mouse, camera);
				raycaster.params.Line.threshold = 0.5;
				const modelIntersects = raycaster.intersectObject(model, true);
				if (modelIntersects.length > 0) {
					intersectPoint.copy(modelIntersects[0].point);
					//move the point a little bit away from the model, relative to the camera
					const cameraPos = new Vector3();
					camera.getWorldPosition(cameraPos);
					const direction = intersectPoint.clone().sub(cameraPos).normalize();
					intersectPoint.sub(direction.multiplyScalar(0.5));
				} else {
					raycaster.ray.intersectPlane(plane, intersectPoint);
				}
			}

			globalThis.addEventListener('mousemove', onMouseMove, false);
			globalThis.addEventListener('touchmove', onMouseMove, false);

			const pointLight = new PointLight(0x0505ff, 50, 1);
			//make the light brighter when it's closer to the model
			pointLight.distance = 150;
			pointLight.decay = 100;

			function animate() {
				requestAnimationFrame(animate);
				updateIntersectPoint(camera, scene);
				updatePlane(camera);
				pointLight.position.copy(intersectPoint);
			}
			animate();
			scene.add(pointLight);

			const render = () => {
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			};
			render();
			renderer.setClearColor(0x000000, 0);
			renderer.domElement.classList.add('!w-full', 'z-10');
			this.innerHTML = '';
			this.append(renderer.domElement);
		}
	}
);
