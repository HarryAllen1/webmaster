import { GLTFLoader } from 'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js?bundle';
import {
	AmbientLight,
	Box3,
	DirectionalLight,
	PerspectiveCamera,
	Plane,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'https://esm.sh/three@0.152.2?bundle';
//if not mobile
if (!globalThis.matchMedia('(pointer: coarse)').matches) {
	customElements.define(
		'wm-vehicle-model',
		class extends HTMLElement {
			constructor() {
				super();
				this.classList.add('w-full');
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
				renderer.domElement.classList.add('!w-full', 'z-10');
				this.innerHTML = '';
				this.append(renderer.domElement);
			}
		}
	);
}
else {
	
}

