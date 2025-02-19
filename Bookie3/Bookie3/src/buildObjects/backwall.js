import * as THREE from "three";
import { TIFFLoader } from 'three/addons/loaders/TIFFLoader.js';

export function createBackWall() {

    // Load the textures using the TextureLoader
    const textureLoader = new THREE.TextureLoader();
    const baseColorTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_BaseColor.png');
    const aoTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_AO.png');
    const normalTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Normal.png');
    const roughnessTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Roughness.png');
    const heightTexture = textureLoader.load('textures/BrickWall22_MR_4K/BrickWall22_4K_Height.png');

    // Create the material with the loaded textures
    const brick = new THREE.MeshStandardMaterial({
        map: baseColorTexture,       // Base color texture
        aoMap: aoTexture,           // Ambient Occlusion map
        normalMap: normalTexture,   // Normal map for bump details
        roughnessMap: roughnessTexture, // Roughness map for surface roughness
        displacementMap: heightTexture, // Height map for displacement
        displacementScale: 0.1,    // Controls how much the height map will affect geometry
    });

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(8, 5, 0.2),
        brick
    );

    return backWall;
}