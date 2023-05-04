export { default as unoCSSPresetUno } from 'https://esm.sh/@unocss/preset-uno@0.51.8?bundle&exports=default';
export { default as initUnoCSS } from 'https://esm.sh/@unocss/runtime@0.51.8?bundle&exports=default';
export {
	createApp,
	reactive,
} from 'https://esm.sh/petite-vue@0.4.1?bundle&exports=createApp,reactive';
export { default as Toastify } from 'https://esm.sh/toastify-js@1.12.0?bundle&exports=default';
export { default as AOS } from 'https://esm.sh/aos@3.0.0-beta.6?bundle&exports=default';
export { default as JSConfetti } from 'https://esm.sh/js-confetti@0.11.0?bundle&exports=default';
export { default as canvasConfetti } from 'https://esm.sh/canvas-confetti@1.6.0?bundle&exports=default';
export const loadThree = async () => {
	const { OrbitControls } = await import(
		'https://esm.sh/three@0.152.2/examples/jsm/controls/OrbitControls.js?bundle'
	);
	const { GLTFLoader } = await import(
		'https://esm.sh/three@0.152.2/examples/jsm/loaders/GLTFLoader.js?bundle'
	);
	const {
		AmbientLight,
		Box3,
		DirectionalLight,
		Object3D,
		PerspectiveCamera,
		Plane,
		PointLight,
		Raycaster,
		Scene,
		Vector2,
		Vector3,
		WebGLRenderer,
	} = await import(
		'https://esm.sh/three@0.152.2?bundle&exports=AmbientLight,Box3,DirectionalLight,PerspectiveCamera,Plane,PointLight,Raycaster,Scene,Vector2,Vector3,WebGLRenderer,Object3D'
	);
	return {
		OrbitControls,
		GLTFLoader,
		AmbientLight,
		Box3,
		DirectionalLight,
		Object3D,
		PerspectiveCamera,
		Plane,
		PointLight,
		Raycaster,
		Scene,
		Vector2,
		Vector3,
		WebGLRenderer,
	};
};
