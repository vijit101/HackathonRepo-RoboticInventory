import * as THREE from "three";
import jsQR from 'jsqr';

export function setupQRScanning(renderer, robotView1, robotView2, robot, scene) {
    // Create render targets for both cameras
    const renderTarget1 = new THREE.WebGLRenderTarget(512, 512);
    const renderTarget2 = new THREE.WebGLRenderTarget(512, 512);
    
    function scanQRCode(camera, renderTarget) {
        // Render the camera view to the target
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        
        // Get pixel data
        const pixels = new Uint8Array(512 * 512 * 4);
        renderer.readRenderTargetPixels(renderTarget, 0, 0, 512, 512, pixels);
        
        // Convert to format needed by jsQR
        const imageData = new Uint8ClampedArray(pixels.buffer);
        
        // Scan for QR code
        const code = jsQR(imageData, 512, 512);
        
        if (code) {
            console.log("Found QR code:", code.data);
            // Add visual feedback
            showQRDetection(camera);
        }
        
        // Reset render target
        renderer.setRenderTarget(null);
    }
    
    // Visual feedback when QR is detected
    function showQRDetection(camera) {
        // Create a temporary green outline or indicator
        const indicator = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        );
        indicator.position.copy(camera.position);
        scene.add(indicator);
        
        // Remove after 1 second
        setTimeout(() => {
            scene.remove(indicator);
        }, 1000);
    }
    
    // Function to be called in animation loop
    function scan() {
        if (robot.camera1) {
            scanQRCode(robot.camera1, renderTarget1);
        }
        if (robot.camera2) {
            scanQRCode(robot.camera2, renderTarget2);
        }
    }
    
    return scan;
}