// /utils/qrcode.ts
import QRCode from 'qrcode';

export async function generateQrCode(url: string): Promise<string> {
    return await QRCode.toDataURL(url); // retorna base64
}