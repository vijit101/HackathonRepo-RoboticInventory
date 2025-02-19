import * as THREE from "three";

export function buildBooks(){
    const bookCover1 = new THREE.MeshStandardMaterial({
        color: 'green',
        emissive: 'limegreen',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const bookCover2 = new THREE.MeshStandardMaterial({
        color: 'blue',
        emissive: 'lightblue',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const bookCover3 = new THREE.MeshStandardMaterial({
        color: 'orange',
        emissive: 'orange',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const bookCover4 = new THREE.MeshStandardMaterial({
        color: 'lightgrey',
        emissive: 'lightgrey',
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const bookCover5 = new THREE.MeshStandardMaterial({
        color: 'plum',
        emissive: 0xff69b4,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.7
    });

    const book1 = new THREE.Mesh(
        new THREE.BoxGeometry(.8, 1.1, .2),
        bookCover1
    )

    const book2 = new THREE.Mesh(
        new THREE.BoxGeometry(.8, 1.1, .2),
        bookCover2
    )

    const book3 = new THREE.Mesh(
        new THREE.BoxGeometry(.8, 1.1, .2),
        bookCover3
    )

    const book4 = new THREE.Mesh(
        new THREE.BoxGeometry(.8, 1.1, .2),
        bookCover4
    )

    const book5 = new THREE.Mesh(
        new THREE.BoxGeometry(.8, 1.1, .2),
        bookCover5
    )

    return {book1, book2, book3, book4, book5};
}

