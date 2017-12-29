// tslint:disable-next-line:no-var-requires
const fontJson = require("./fonts/Open_Sans_Bold.json");
import "./index.scss";

import * as THREE from "three";
(window as any).THREE = THREE;
import "./controls/OrbitControls";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(scene.position);

const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const textGeometry = new THREE.TextGeometry("Hello amigo", {
  font: new THREE.Font(fontJson),
  size: 80,
  height: 5,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 10,
  bevelSize: 8,
});
const textMesh = new THREE.Mesh(textGeometry, textMaterial);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
scene.add(textMesh);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  renderer.render(scene, camera);
});

renderer.render(scene, camera);
