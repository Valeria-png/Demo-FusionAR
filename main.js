import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
const viewer = document.getElementById("viewer");
//otros elementos
const decrement = document.getElementById("decrement");
const increment = document.getElementById("increment");
const quantity = document.getElementById("quantity");

const img1Btn = document.getElementById("img1btn");
const img2Btn = document.getElementById("img2btn");
const img3Btn = document.getElementById("img3btn");
const viewerBtn = document.getElementById("view3d");


decrement.addEventListener("click", ()=>{
    quantity.value > 1 ? quantity.value-- : quantity.value = 1;
})

increment.addEventListener("click", () =>quantity.value++);

img2Btn.addEventListener("click", ()=>{
    img1.classList.add("hidden");
    img2.classList.remove("hidden");
    img3.classList.add("hidden");
    viewer.classList.add("hidden");
})

img1Btn.addEventListener("click", ()=>{
    img1.classList.remove("hidden");
    img2.classList.add("hidden");
    img3.classList.add("hidden");
    viewer.classList.add("hidden");
})

img3Btn.addEventListener("click", ()=>{
    img1.classList.add("hidden");
    img2.classList.add("hidden");
    img3.classList.remove("hidden");
    viewer.classList.add("hidden");
})

viewerBtn.addEventListener("click", ()=>{
    img1.classList.add("hidden");
    img2.classList.add("hidden");
    img3.classList.add("hidden");
    viewer.classList.remove("hidden");
})


//visor 3d
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xebf8ff);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(68,55,88);
// camera.lookAt(100,100,10);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth*.55, window.innerHeight*.75 );
viewer.appendChild(renderer.domElement);
viewer.style.borderRadius = "30px";

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableRotate = true;
controls.enablePan = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.75);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-5, 5, 10);
directionalLight.lookAt(10,1,1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight2.position.set(10,3,-15);
directionalLight2.lookAt(-5, 5, 10);
scene.add(directionalLight, directionalLight2);

const loader = new FBXLoader();

loader.load( 'fridhult2.fbx', function (object) {
    object.position.set(-77,0,0);
    object.scale.set(1, 1,1);
    scene.add(object);
})

// loader.load( 'fridhult2.fbx', function ( fbx ) {
//     console.log('loaded');
    
// 	scene.add( fbx.scene );
// gltf.position.set(0,0,0);
// }, undefined, function ( error ) {

// 	console.error( error );

// } );

function onResize() {
    var width = window.innerWidth *.50;
    if (window.innerWidth< 1024){
        width = window.innerWidth*.80;
    }
    else{
        width = window.innerWidth*.50;
    }
    const height = width * .75;

    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

}

window.addEventListener( 'resize', onResize );
onResize();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();





