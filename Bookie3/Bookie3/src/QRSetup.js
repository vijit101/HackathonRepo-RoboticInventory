import jsQR from 'jsqr';

export function setupQRScanning(camera, renderer, scene) {
    // Create a render target
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    
    // Function to check for QR codes
    function scanForQRCode() {
        // Render the camera view to the target
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        
        // Get the pixel data
        const pixels = new Uint8Array(512 * 512 * 4);
        renderer.readRenderTargetPixels(renderTarget, 0, 0, 512, 512, pixels);
        
        // Scan for QR code
        const code = jsQR(pixels, 512, 512);
        
        if (code) {
            console.log("Found QR code:", code.data);
        }
        
        // Reset render target
        renderer.setRenderTarget(null);
    }
    
    // Call this function in your animation loop
    return scanForQRCode;
}