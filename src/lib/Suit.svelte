<script lang="ts">
	import { onMount } from 'svelte';
	import type { Object3D, Event } from 'three';

	let ready = false;
	let canvas: HTMLCanvasElement;

	onMount(async () => {
		const THREE = await import('three').then((m) => m.default || m);
		const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js').then(
			(m) => m.default || m
		);

		const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js').then(
			(m) => m.default || m
		);

		// Scene
		const scene = new THREE.Scene();

		// Models
		let suit: Object3D<Event>;

		const gltfLoader = new GLTFLoader();
		gltfLoader.load('/JohnHalo.glb', (gltf) => {
			// Gem
			gltf.scene.children.forEach((child) => {
				scene.add(child);
			});

			ready = true;
		});

		// let strawberry: Object3D<Event>;
		// gltfLoader.load('/Strawberry_gltf.gltf', (gltf) => {
		// 	// Gem
		// 	strawberry = gltf.scene.children[0];

		// 	//Material setup
		// 	const textureLoader = new THREE.TextureLoader();
		// 	const roughnessTexture = textureLoader.load('/roughness.webp');
		// 	// @ts-ignore
		// 	strawberry.material.roughnessMap = roughnessTexture;
		// 	// @ts-ignore
		// 	strawberry.material.displacementScale = 0.15;
		// 	// @ts-ignore
		// 	strawberry.material.emissiveIntensity = 0.4;
		// 	// @ts-ignore
		// 	strawberry.material.refractionRatio = 1;
		// 	scene.add(strawberry);
		// 	ready = true;
		// });
		// Settings
		const sizes = {
			width: 900,
			height: 900,
		};

		// Base camera
		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
		camera.position.set(0, 1, 0);
		scene.add(camera);

		// Controls
		const controls = new OrbitControls(camera, canvas);
		controls.enableZoom = true;
		controls.target.set(0, 1, 0);
		controls.enableDamping = true;
		controls.enablePan = false;
		controls.minDistance = 1;
		controls.maxDistance = 9;
		controls.rotateSpeed = 2;

		const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		// Render
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas,
			alpha: true,
		});
		renderer.setClearColor(0x000000, 0);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const tick = () => {
			// Update controls
			controls.update();

			// Render
			renderer.render(scene, camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	});
</script>

<canvas
	bind:this={canvas}
	class="outline-0 w-48 h-48 opacity-0 transition-opacity duration-1000 ease-in-out"
	style="opacity: {ready ? 1 : 0}"
/>
