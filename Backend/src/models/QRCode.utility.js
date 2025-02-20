import qrcode from "qrcode";

export default class QRCodeUtility {
    static async returnQRcodeUrl(url) {
        try {
            return await qrcode.toDataURL(url);
        } catch (err) {
            console.error("QR code generation failed:", err);
            return null; // Handle errors gracefully
        }
    }
}
