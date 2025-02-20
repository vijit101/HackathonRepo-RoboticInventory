import * as THREE from "three";

export function buildBooks() {
    const bookGeometry = new THREE.BoxGeometry(.2, 1.1, 0.8);
    
    const bookMaterials = [
        new THREE.MeshStandardMaterial({ 
            color: 0x1f4068,
            emissive: 'teal',
            emissiveIntensity: 0.5,
            roughness: 0.3,
            metalness: 0.7 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x8b0000,
            emissive: 'indigo',
            emissiveIntensity: 0.4,
            roughness: 0.3,
            metalness: 0.7 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x006400,
            emissive: 'lightblue',
            emissiveIntensity: 0.7,
            roughness: 0.3,
            metalness: 0.7 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x4b0082,
            emissive: 'olive',
            emissiveIntensity: 0.9,
            roughness: 0.3,
            metalness: 0.7 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x8b4513,
            emissive: 'orange',
            emissiveIntensity: 0.7,
            roughness: 0.3,
            metalness: 0.7 
        })
    ];

    const booksPerShelf = 14;
    const numShelves = 2;
    const totalBooks = booksPerShelf * numShelves;
    
    // Create separate instance meshes for each shelf
    const bookInstances = bookMaterials.map(material =>
        new THREE.InstancedMesh(bookGeometry, material, booksPerShelf) // Change to booksPerShelf
    );
    
    const matrix = new THREE.Matrix4();
    const group = new THREE.Group();
    
    const shelfHeights = [-0.9, 0.6];
    const bookWidth = 0.2;
    const shelfWidth = 3;

    shelfHeights.forEach((shelfY, shelfIndex) => {
        const startX = -shelfWidth / 2 + bookWidth / 2;
        
        for (let i = 0; i < booksPerShelf; i++) {
            const x = startX + (i * (shelfWidth / booksPerShelf));
            const y = shelfY + (Math.random() * 0.02);
            const z = -0.4 + (Math.random() * 0.1);
            
            const rotationY = Math.random() * 0.1 - 0.05;
            
            matrix.makeRotationY(rotationY);
            matrix.setPosition(x, y, z);
            
            // Create new instances for each shelf
            const bookType = Math.floor(Math.random() * bookMaterials.length);
            const newBookInstance = new THREE.InstancedMesh(
                bookGeometry,
                bookMaterials[bookType],
                1
            );
            
            newBookInstance.setMatrixAt(0, matrix);
            newBookInstance.instanceMatrix.needsUpdate = true;
            group.add(newBookInstance);
        }
    });

    return group;
}