import * as THREE from "three";

export function createRobot() {
    const robot = new THREE.Group();
    
    const robotMaterial = new THREE.MeshStandardMaterial({
        color: 'yellow',
        emissive: 'yellow',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });
    
    const robotCameraMaterial = new THREE.MeshStandardMaterial({
        color: 'lightgreen',
        emissive: 'lightgreen',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });
    
    // Head
    const head = new THREE.Mesh(
        new THREE.CapsuleGeometry(.1, 3, 1),
        robotMaterial
    );
    head.position.y = 1.6;
    robot.add(head);
    
    // Body
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1, .2, 1),
        robotMaterial
    );
    body.position.y = 0.1;
    robot.add(body);
    
    // Camera boxes
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
    
    // Camera views
    const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera1.position.set(0, .7, -.1);
    robot.add(camera1);
    
    const camera2 = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera2.position.set(0, 2.3, -.1);
    robot.add(camera2);
    
    robot.camera1 = camera1;
    robot.camera2 = camera2;
    
    // Add collision box
    robot.boundingBox = new THREE.Box3().setFromObject(robot);
    
    return robot;

}