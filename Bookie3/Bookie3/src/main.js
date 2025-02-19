import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createBookcase } from "./buildObjects/bookshelf.js";
import { createBackWall } from "./buildObjects/backwall.js";
import { createRobot } from "./buildObjects/robot.js";
import { buildBooks } from "./buildObjects/books.js";

// initialize the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

// grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// initialize the main camera
const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    200
);
camera.position.z = 15;
camera.position.y = 4;

// initialize the main renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.autoClear = false; // Important for multiple views

// Robot camera views setup
const robotViewSize = {
    width: Math.floor(window.innerWidth / 4),
    height: Math.floor(window.innerHeight / 4)
};

const robotView1 = new THREE.WebGLRenderer({ antialias: true });
const robotView2 = new THREE.WebGLRenderer({ antialias: true });

robotView1.setSize(robotViewSize.width, robotViewSize.height);
robotView2.setSize(robotViewSize.width, robotViewSize.height);

// Style robot views
function setupRobotView(view, position, label) {
    view.domElement.style.position = 'absolute';
    view.domElement.style.bottom = '20px';
    view.domElement.style.left = position;
    view.domElement.style.border = '2px solid white';
    view.domElement.style.borderRadius = '5px';
    document.body.appendChild(view.domElement);

    const labelDiv = document.createElement('div');
    labelDiv.textContent = label;
    labelDiv.style.position = 'absolute';
    labelDiv.style.top = '5px';
    labelDiv.style.left = '5px';
    labelDiv.style.color = 'white';
    labelDiv.style.fontFamily = 'Arial';
    labelDiv.style.fontSize = '14px';
    view.domElement.parentElement.appendChild(labelDiv);
}

setupRobotView(robotView1, '20px', 'Front Camera');
setupRobotView(robotView2, `${robotViewSize.width + 40}px`, 'Rear Camera');

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Add objects to scene
const backWall = createBackWall();
backWall.position.set(0, 2.5, -1.5);
scene.add(backWall);

const bookcase = createBookcase();
bookcase.position.y = 1.6;
scene.add(bookcase);

const books = buildBooks();
scene.add(books.book1);
scene.add(books.book2);
scene.add(books.book3);
scene.add(books.book4);
scene.add(books.book5);

// Position books:
books.book1.position.set(1, 2, 0);
books.book2.position.set(2, 0, 0);
books.book3.position.set(0, 3, 0);
books.book4.position.set(0, 2, 0);
books.book5.position.set(0, .75, 0);

const robot = createRobot();
robot.position.set(5, 0, 5);
scene.add(robot);

// Robot movement controls
const robotControls = {
    speed: 0.1,
    rotationSpeed: 0.03,
    movement: {
        forward: false,
        backward: false,
        left: false,
        right: false
    },
    update() {
        // Calculate forward direction based on robot's rotation
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(robot.quaternion);
        
        if (this.movement.forward) {
            robot.position.add(direction.multiplyScalar(this.speed));
        }
        if (this.movement.backward) {
            robot.position.add(direction.multiplyScalar(-this.speed));
        }
        if (this.movement.left) {
            robot.rotateY(this.rotationSpeed);
        }
        if (this.movement.right) {
            robot.rotateY(-this.rotationSpeed);
        }
    }
};

// Keyboard controls
const handleKeyEvent = (event, isKeyDown) => {
    const keyMap = {
        'w': 'forward',
        'ArrowUp': 'forward',
        's': 'backward',
        'ArrowDown': 'backward',
        'a': 'left',
        'ArrowLeft': 'left',
        'd': 'right',
        'ArrowRight': 'right'
    };

    const movement = keyMap[event.key];
    if (movement) {
        robotControls.movement[movement] = isKeyDown;
        event.preventDefault();
    }
};

window.addEventListener('keydown', e => handleKeyEvent(e, true));
window.addEventListener('keyup', e => handleKeyEvent(e, false));

// Handle window resize
function handleResize() {
    // Update main camera and renderer
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Update robot camera views
    const newWidth = Math.floor(window.innerWidth / 4);
    const newHeight = Math.floor(window.innerHeight / 4);
    
    robotView1.setSize(newWidth, newHeight);
    robotView2.setSize(newWidth, newHeight);
    robotView2.domElement.style.left = `${newWidth + 40}px`;
}

window.addEventListener("resize", handleResize);

// Animation/render loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls and robot
    controls.update();
    robotControls.update();

    // Clear all renderers
    renderer.clear();
    robotView1.clear();
    robotView2.clear();

    // Render main view
    renderer.render(scene, camera);

    // Render robot camera views
    if (robot.camera1) robotView1.render(scene, robot.camera1);
    if (robot.camera2) robotView2.render(scene, robot.camera2);
}

animate();