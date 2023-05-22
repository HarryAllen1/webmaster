import { OrbitControls } from 'https://esm.sh/three@0.152.2/examples/jsm/controls/OrbitControls.js?bundle';
import { GLTFLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js?bundle';
import {
	AmbientLight,
	Box3,
	DirectionalLight,
	PerspectiveCamera,
	Plane,
	PointLight,
	Raycaster,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'https://esm.sh/three@0.152.2?bundle';

customElements.define(
	'wm-vehicle-model',
	globalThis.matchMedia('(pointer: coarse)').matches
		? class extends HTMLElement {
				constructor() {
					super();
					this.classList.add('w-[400px]');
					const renderer = new WebGLRenderer();
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
					const directionalLight = new DirectionalLight(0xfff9ff, 1);
					directionalLight.position.set(0, 0, 1);
					scene.add(directionalLight);
					const directionalLight2 = new DirectionalLight(0xfffff9, 1);
					directionalLight2.position.set(0, 0, -1);
					scene.add(directionalLight2);
					const loader = new GLTFLoader();
					loader.load(
						this.dataset.filepath ?? '',
						(gltf) => {
							const object = gltf.scene;
							object.scale.set(0.001, 0.001, 0.001);
							const box = new Box3().setFromObject(object);
							const boxCenter = box.getCenter(new Vector3());
							object.position.x = -boxCenter.x;
							object.position.y = -boxCenter.y;
							object.position.z = -boxCenter.z;
							//reduce the shine
							object.traverse(
								/** @param {any} child */ (child) => {
									if (child.isMesh) {
										child.material.metalness = 0.9;
										child.material.roughness = 0.9;
									}
								}
							);
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
						plane.constant += 5;
					}

					/**
					 * @param {PerspectiveCamera} camera
					 * @param {import('https://esm.sh/three@0.152.2?bundle').Object3D} model
					 */
					function updateIntersectPoint(camera, model) {
						updatePlane(camera);
						raycaster.setFromCamera(mouse, camera);
						if (raycaster.params.Line?.threshold) {
							raycaster.params.Line.threshold = 0.5;
						}
						const modelIntersects = raycaster.intersectObject(model, true);
						if (modelIntersects.length > 0) {
							intersectPoint.copy(modelIntersects[0].point);
							const cameraPos = new Vector3();
							camera.getWorldPosition(cameraPos);
							const direction = intersectPoint
								.clone()
								.sub(cameraPos)
								.normalize();
							intersectPoint.sub(direction.multiplyScalar(0.5));
						} else {
							raycaster.ray.intersectPlane(plane, intersectPoint);
						}
					}

					globalThis.addEventListener('mousemove', (event) => {
						const rect = renderer.domElement.getBoundingClientRect();
						mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
						mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
					});

					const pointLight = new PointLight(0x00ffff, 5, 1);
					pointLight.distance = 150;
					pointLight.decay = 100;

					function animate() {
						requestAnimationFrame(animate);
						updateIntersectPoint(camera, scene);
						updatePlane(camera);
						pointLight.position.copy(intersectPoint);
					}
					animate();
					//scene.add(pointLight);

					const render = () => {
						requestAnimationFrame(render);
						renderer.render(scene, camera);
					};
					render();
					renderer.setClearColor(0x000000, 0);
					renderer.domElement.classList.add('!w-[400px]', 'z-10');
					this.innerHTML = '';
					this.append(renderer.domElement);
				}
		  }
		: class extends HTMLElement {
				constructor() {
					super();
					this.classList.add('w-[400px]');
					const renderer = new WebGLRenderer();
					renderer.setSize(800, 600);
					const scene = new Scene();
					const camera = new PerspectiveCamera(
						75,
						renderer.domElement.width / renderer.domElement.height,
						0.1,
						1000
					);
					camera.position.z = 5;
					const ambientLight = new AmbientLight(0xffffff, 0.3);
					scene.add(ambientLight);
					const directionalLight = new DirectionalLight(0xfff9ff, 0.3);
					directionalLight.position.set(1, 0, 0);
					scene.add(directionalLight);
					const loader = new GLTFLoader();
					/** @type {import('https://esm.sh/three@0.152.2?bundle').Group} */
					let object;
					loader.load(
						this.dataset.filepath ?? '',
						(gltf) => {
							object = gltf.scene;
							object.scale.set(0.001, 0.001, 0.001);
							const box = new Box3().setFromObject(object);
							const boxCenter = box.getCenter(new Vector3());
							object.position.x = -boxCenter.x;
							object.position.y = -boxCenter.y;
							object.position.z = -boxCenter.z;
							//reduce the shine
							object.traverse(
								/** @param {any} child */ (child) => {
									if (child.isMesh) {
										child.material.metalness = 0.9;
										child.material.roughness = 0.9;
									}
								}
							);
							scene.add(object);
						},
						(xhr) => {
							console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
						},
						console.error
					);
					const mouse = new Vector2();

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
						plane.constant += 5;
					}

					globalThis.addEventListener('mousemove', (event) => {
						const rect = renderer.domElement.getBoundingClientRect();
						mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
						mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
					});

					function updateDirectionalLight() {
						directionalLight.position.set(mouse.x * 4, mouse.y * 4, 1);
					}

					/**
					 * @param {number} num
					 * @param {number} min
					 * @param {number} max
					 */
					function clamp(num, min, max) {
						return num <= min ? min : num >= max ? max : num;
					}

					/** @param {import('https://esm.sh/three@0.152.2?bundle').Group | undefined} obj */
					function updateObjRotation(obj) {
						if (obj) {
							obj.rotation.x = clamp(-mouse.y * 0.3, -0.3, 0.3);
							obj.rotation.y = clamp(mouse.x * 0.3, -0.3, 0.3);
						}
					}

					function animate() {
						requestAnimationFrame(animate);
						updateDirectionalLight();
						updateObjRotation(object);
						updatePlane(camera);
					}
					animate();

					const render = () => {
						requestAnimationFrame(render);
						renderer.render(scene, camera);
					};
					render();
					renderer.setClearColor(0x000000, 0);
					renderer.domElement.classList.add('!w-[400px]', 'z-10');
					this.innerHTML = '';
					this.append(renderer.domElement);
				}
		  }
);
