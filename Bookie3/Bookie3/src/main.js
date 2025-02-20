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
camera.position.set(0, 4, 15);

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
bookcase.add(books); // Add books to your bookcase

const robot = createRobot();
robot.position.set(0, 0, 2);
scene.add(robot);

// Create collision objects
const collisionObjects = [];

// Add collision boxes for bookcase and wall
function createCollisionBox(object, margin = 0.5) {
    const bbox = new THREE.Box3().setFromObject(object);
    const collisionBox = {
        min: bbox.min.clone(),
        max: bbox.max.clone()
    };
    
    // Add margin around objects
    collisionBox.min.x -= margin;
    collisionBox.min.z -= margin;
    collisionBox.max.x += margin;
    collisionBox.max.z += margin;
    
    return collisionBox;
}

// Add collision boxes after creating objects
collisionObjects.push(createCollisionBox(bookcase));
collisionObjects.push(createCollisionBox(backWall));

// Robot movement controls
const robotControls = {
    speed: 0.01,
    rotationSpeed: 0.03,
    movement: {
        forward: false,
        backward: false,
        left: false,
        right: false,
        strafeLeft: false,
        strafeRight: false
    },

    checkCollision(newPosition) {
        // Create a small collision box around the robot
        const robotRadius = 0.5; // Adjust based on robot size
        const robotBox = {
            min: new THREE.Vector3(
                newPosition.x - robotRadius,
                newPosition.y,
                newPosition.z - robotRadius
            ),
            max: new THREE.Vector3(
                newPosition.x + robotRadius,
                newPosition.y + 1,
                newPosition.z + robotRadius
            )
        };

        // Check collision with all objects
        for (const obj of collisionObjects) {
            if (this.boxesIntersect(robotBox, obj)) {
                return true; // Collision detected
            }
        }
        return false; // No collision
    },

    boxesIntersect(box1, box2) {
        return (box1.min.x <= box2.max.x && box1.max.x >= box2.min.x) &&
               (box1.min.y <= box2.max.y && box1.max.y >= box2.min.y) &&
               (box1.min.z <= box2.max.z && box1.max.z >= box2.min.z);
    },

    update() {
        // Calculate forward direction based on robot's rotation
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(robot.quaternion);

        // Right direction (for strafing)
        const rightDirection = new THREE.Vector3(1, 0, 0);
        rightDirection.applyQuaternion(robot.quaternion);
        
        if (this.movement.forward) {
            robot.position.add(direction.multiplyScalar(this.speed));
        }
        if (this.movement.backward) {
            robot.position.add(direction.multiplyScalar(-this.speed));
        }
        if (this.movement.strafeLeft) {
            robot.position.add(rightDirection.clone().multiplyScalar(-this.speed));
        }
        if (this.movement.strafeRight) {
            robot.position.add(rightDirection.clone().multiplyScalar(this.speed));
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
        'q': 'strafeLeft',
        'e': 'strafeRight',
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