import * as THREE from 'three';

customElements.define(
  'wm-models-page',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open',
      });
      // Scene
      const scene = new THREE.Scene();

      // Add a cube to the scene
      const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
      const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);

      // Set up lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      directionalLight.position.set(10, 20, 0); // x, y, z
      scene.add(directionalLight);

      // Camera
      const width = 10;
      const height = width * (window.innerHeight / (window.innerWidth * 0.5));
      const camera = new THREE.OrthographicCamera(
        width / -2, // left
        width / 2, // right
        height / 2, // top
        height / -2, // bottom
        1, // near
        100 // far
      );

      camera.position.set(4, 4, 4);
      camera.lookAt(0, 0, 0);

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth * 0.5, window.innerHeight);
      renderer.render(scene, camera);

      this.shadowRoot?.appendChild(renderer.domElement);
    }
  }
);
