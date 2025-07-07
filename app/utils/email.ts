import nodemailer from 'nodemailer';

export async function sendEmailWithQR(to: string, link: string, qrBase64: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro provedor
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlContent = `
    <p>Obrigado pela compra! Acesse seu conteúdo abaixo:</p>
    <p><a href="${link}">${link}</a></p>
    <p><img src="${qrBase64}" alt="QR Code" /></p>
  `;

    await transporter.sendMail({
        from: `"Seu Site" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Seu conteúdo está pronto!',
        html: htmlContent,
    });
}
