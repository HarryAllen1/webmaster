<script lang="ts">
	import { onMount } from 'svelte';
	import type { Event, Object3D } from 'three';

	let ready = false;
	let canvas: HTMLCanvasElement;

	const sizes = {
		width: 500,
		height: 500,
	};

	onMount(async () => {
		const {
			Scene,
			TextureLoader,
			AmbientLight,
			DirectionalLight,
			PerspectiveCamera,
			WebGLRenderer,
			PCFSoftShadowMap,
		} = await import('three');
		const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
		const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

		const scene = new Scene();

		// Models
		let gem: Object3D<Event>;
		let light;

		const gltfLoader = new GLTFLoader();
		gltfLoader.load('/gem.gltf', (gltf) => {
			// Gem
			gem = gltf.scene.children[6];

			// Material setup
			const textureLoader = new TextureLoader();
			const roughnessTexture = textureLoader.load('/roughness.webp');
			// @ts-ignore
			gem.material.roughnessMap = roughnessTexture;
			// @ts-ignore
			gem.material.displacementScale = 0.15;
			// @ts-ignore
			gem.material.emissiveIntensity = 0.4;
			// @ts-ignore
			gem.material.refractionRatio = 1;
			gem.rotation.z = 0;
			scene.add(gem);

			light = gltf.scene.children[0];
			scene.add(light);
			ready = true;
		});

		// Lights
		const ambientLight = new AmbientLight(0xffffff, 2);
		scene.add(ambientLight);

		const directionalLight = new DirectionalLight(0xffffff, 3);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);

		const directionalLight2 = new DirectionalLight(0xffffff, 3);
		directionalLight2.position.set(-1, -1, -1);
		scene.add(directionalLight2);

		// Base camera
		const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
		camera.position.set(2, 2, 6);
		scene.add(camera);

		// Controls
		const controls = new OrbitControls(camera, canvas);
		controls.enableZoom = true;
		controls.target.set(0, 0.75, 0);
		controls.enableDamping = true;
		controls.enablePan = false;
		controls.minDistance = 5;
		controls.maxDistance = 13;
		controls.rotateSpeed = 2;

		// Render
		const renderer = new WebGLRenderer({
			antialias: true,
			canvas,
			alpha: true,
		});
		renderer.setClearColor(0x000000, 0);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
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

<div class="relative w-[{sizes.width}px] h-[{sizes.height}px]">
	<canvas
		width={sizes.width}
		height={sizes.height}
		bind:this={canvas}
		class="absolute outline-0 w-48 h-48 opacity-0 transition-opacity duration-1000 ease-in-out"
		style="opacity: {ready ? 1 : 0}"
	/>
</div>
