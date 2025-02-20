import * as THREE from "three";

export function createRobot() {
    const robot = new THREE.Group();

    // Create robot material
    const robotMaterial = new THREE.MeshStandardMaterial({
        color: 'yellow',  // Red
        emissive: 'yellow',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const robotCameraMaterial = new THREE.MeshStandardMaterial({
        color: 'light green',  // Red
        emissive: 'light green',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    // Create robot head
    const head = new THREE.Mesh(
        new THREE.CapsuleGeometry(.1, 3, 1),
        robotMaterial
    );

    head.position.y = 1.6;
    robot.add(head);

    // Create robot body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1, .2, 1),
        robotMaterial
    );

    body.position.y = 0.1;
    robot.add(body);

    const cameraBox1 = new THREE.Mesh(
        new THREE.BoxGeometry(.3, .3, .3),
        robotCameraMaterial
    );

    cameraBox1.position.set(0, .8, -.1);
    robot.add(cameraBox1);

    const cameraBox2 = new THREE.Mesh(
        new THREE.BoxGeometry(.3, .3, .3),
        robotCameraMaterial
    );

    cameraBox2.position.set(0, 2.3, -.1);
    robot.add(cameraBox2);

    // Create cameras with proper aspect ratio
    const aspect = window.innerWidth / 4 / (window.innerHeight / 4); // Match the view dimensions

    // Tie two cameras along the length of the robot's body--set at adjustable heights to be able to see into each shelf
    const robotView1 = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    robotView1.position.set(0, .8, -.1);
    robotView1.rotateY(-Math.PI/2); // Make camera face the bookshelf
    robot.add(robotView1);

    const robotView2 = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    robotView2.position.set(0, 2.3, -.1);
    robotView2.rotateY(-Math.PI/2); // Make camera face the bookshelf
    robot.add(robotView2);

    // Store cameras as properties on the robot
    robot.camera1 = robotView1;
    robot.camera2 = robotView2;

    return robot;

}