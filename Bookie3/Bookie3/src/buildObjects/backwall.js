// import * as THREE from "three";
// import { TIFFLoader } from 'three/addons/loaders/TIFFLoader.js';

// export function createBackWall() {

//     // Load the textures using the TextureLoader
//     const textureLoader = new THREE.TextureLoader();
//     const baseColorTexture = textureLoader.load(
//         'textures/BrickWall22_MR_4K/BrickWall22_4K_BaseColor.png',
//         undefined,
//         undefined,
//         (error) => {
//             console.error('Error loading texture:', error);
//         }
//     );
//     // const aoTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_AO.png');
//     const normalTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Normal.png');
//     const roughnessTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Roughness.png');
//     // const heightTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Height.png');

//     // Set texture repeat to avoid stretching
//     const repeatX = 4; // Adjust these values to change the number of brick repetitions
//     const repeatY = 2;

//     [baseColorTexture, normalTexture, roughnessTexture].forEach(texture => {
//         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//         texture.repeat.set(repeatX, repeatY);
//     });

//     // // Create the material with the loaded textures
//     // const brick = new THREE.MeshStandardMaterial({
//     //     map: baseColorTexture,       // Base color texture
//     //     aoMap: aoTexture,           // Ambient Occlusion map
//     //     normalMap: normalTexture,   // Normal map for bump details
//     //     roughnessMap: roughnessTexture, // Roughness map for surface roughness
//     //     displacementMap: heightTexture, // Height map for displacement
//     //     displacementScale: 0.1,    // Controls how much the height map will affect geometry
//     // });

//      // Create the material
//      const brick = new THREE.MeshStandardMaterial({
//         map: baseColorTexture,
//         normalMap: normalTexture,
//         roughnessMap: roughnessTexture,
//         roughness: 0.8,
//         metalness: 0.2,
//     });

//     // Create geometry with proper UV coordinates
//     const geometry = new THREE.BoxGeometry(8, 5, 0.2);

//     const backWall = new THREE.Mesh(geometry, brick);

//     return backWall;
// }

// // const baseColorTexture = textureLoader.load(
// //     'textures/BrickWall22_MR_4K/BrickWall22_4K_BaseColor.png',
// //     undefined,
// //     undefined,
// //     (error) => {
// //         console.error('Error loading texture:', error);
// //     }
// // );

import * as THREE from "three";

export function createBackWall() {
    // Load the textures
    const textureLoader = new THREE.TextureLoader();
    
    // Add success callback to see if textures are loading
    const baseColorTexture = textureLoader.load(
        'textures/BrickWall22_MR_4K/BrickWall22_4K_BaseColor.png',
        (texture) => {
            console.log('Base color texture loaded successfully');
        },
        (progress) => {
            console.log('Loading base texture:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('Error loading base texture:', error);
        }
    );

    const normalTexture = textureLoader.load(
        'textures/BrickWall22_MR_4K/BrickWall22_4K_Normal.png',
        () => console.log('Normal texture loaded successfully'),
        undefined,
        (error) => console.error('Error loading normal texture:', error)
    );

    const roughnessTexture = textureLoader.load(
        'textures/BrickWall22_MR_4K/BrickWall22_4K_Roughness.png',
        () => console.log('Roughness texture loaded successfully'),
        undefined,
        (error) => console.error('Error loading roughness texture:', error)
    );

    // Set texture repeat
    [baseColorTexture, normalTexture, roughnessTexture].forEach(texture => {
        if (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3, 2);
        }
    });

    // Create the material with a fallback color
    const brick = new THREE.MeshStandardMaterial({
        color: 0x888888, // Fallback color in case texture fails to load
        map: baseColorTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        roughness: 0.8,
        metalness: 0.2,
    });

    const geometry = new THREE.BoxGeometry(8, 5, 0.2);
    const backWall = new THREE.Mesh(geometry, brick);

    return backWall;
}