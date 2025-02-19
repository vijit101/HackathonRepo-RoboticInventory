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

    // Tie two cameras along the length of the body
    const robotView1 = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    robotView1.position.z = 0.5;
    robotView1.position.y = 1.5;
    robot.add(robotView1);

    const robotView2 = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    robotView2.position.z = -0.5;
    robotView2.position.y = 4.5;
    robot.add(robotView2);

    body.position.y = 0.1;
    robot.add(body);

    return robot;

}