import * as THREE from "three";

export function createBookcase() {
    // Create bookshelf material
    const sidePanelMaterial = new THREE.MeshStandardMaterial({
        color: '#fd34b2',  // Hot pink
        emissive: 0xff69b4,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const shelfMaterial = new THREE.MeshStandardMaterial({
        color: '#fd5dc1',  // Hot pink
        emissive: 0xff69b4,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const frame = new THREE.Group();
    
    // Top panel
    const topPanel = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.2, 1),
        shelfMaterial
    );
    topPanel.position.y = 1.5;
    frame.add(topPanel);
    
    // Bottom panel
    const bottomPanel = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.2, 1),
        shelfMaterial
    );
    bottomPanel.position.y = -1.5;
    frame.add(bottomPanel);
    
    // Left side
    const leftSide = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3, 1),
        sidePanelMaterial
    );
    leftSide.position.x = -1.9;
    frame.add(leftSide);
    
    // Right side
    const rightSide = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3, 1),
        sidePanelMaterial
    );
    rightSide.position.x = 1.9;
    frame.add(rightSide);
    
    // Middle shelf
    const middleShelf = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.2, 1),
        shelfMaterial
    );
    frame.add(middleShelf);
    
    return frame;
}