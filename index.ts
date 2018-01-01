// tslint:disable-next-line:no-var-requires
const fontJson = require("./fonts/gentilis_bold.typeface.json");
import "./index.scss";

import * as THREE from "three";
(window as any).THREE = THREE;
import "./controls/OrbitControls";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1500);
camera.position.set(0, 0, 700);
const cameraTarget = new THREE.Vector3(0, 50, 0);

const textMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xffffff, flatShading: true }),
  new THREE.MeshStandardMaterial(),
];

const textGeometry = new THREE.TextGeometry("AMIGO", {
  font: new THREE.Font(fontJson),
  size: 100,
  height: 50,
  curveSegments: 12,
  bevelThickness: 2,
  bevelSize: 1,
});

textGeometry.computeBoundingBox();
textGeometry.computeVertexNormals();

const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
const textMesh = new THREE.Mesh(textGeometry, textMaterials);
textMesh.position.x = centerOffset;
scene.add(textMesh);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => {
  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);
});

camera.lookAt(cameraTarget);
renderer.clear();
renderer.render(scene, camera);
