import * as THREE from 'three';
import { getCube } from './utils';
import './main.css';

let scene: THREE.Scene, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera, cube;
let mouse: THREE.Vector2, raycaster: THREE.Raycaster;
let count = 5000;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const rendererDom = renderer.domElement;
  document.body.appendChild(rendererDom);
  rendererDom.addEventListener("mousedown", onMouseDown, false);

  const input = document.createElement('input');
  input.type = 'number';
  input.classList.add('main-input')
  input.value = count.toString();
  document.body.appendChild(input);
  input.addEventListener("change", onCountChange);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  addCubesToScene(count);
  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  mouse.x = e.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  const i = intersects.find(e => e.object instanceof THREE.Mesh);
  if (i && i.object instanceof THREE.Mesh) {
    const sphere = i.object;
    const color = sphere.material.color.getStyle();
    const connectedLines = sphere.userData.lineNames;
    sphere.parent.children.forEach(l => {
      if (connectedLines.includes(l.name) && l instanceof THREE.Line) {
        l.material.color.setStyle(color);
      }
    })
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onCountChange(e: Event) {
  const c = (e.target as HTMLInputElement).valueAsNumber;
  if (c === count)
    return;
  if (c < count) {
    const delNum = count - c;
    for (let i = 0; i < delNum; i++) {
      scene.remove(scene.children[0]);
    }
  }
  else {
    const addNum = c - count;
    addCubesToScene(addNum);
  }
  count = c;
}

function addCubesToScene(count: number) {
  for (let i = 0; i < count; i++) {
    cube = getCube();

    cube.position.x = Math.random() * 200 - 100;
    cube.position.y = Math.random() * 200 - 100;
    cube.position.z = Math.random() * 200 - 100;

    cube.rotation.x = Math.random() * 2 * Math.PI;
    cube.rotation.y = Math.random() * 2 * Math.PI;
    cube.rotation.z = Math.random() * 2 * Math.PI;

    cube.scale.x = cube.scale.y = cube.scale.z = Math.random() + 0.5;

    scene.add(cube);
  }
}


init();
animate();
