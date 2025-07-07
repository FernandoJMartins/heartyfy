import nodemailer from 'nodemailer';

export async function sendEmailWithQR(to: string, link: string, qrBase64: string) {
    const cleanBase64 = qrBase64.replace(/^data:image\/\w+;base64,/, '');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Seu Site" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Seu conteúdo está pronto!',
        html: `
      <p>Obrigado pela compra! Acesse seu conteúdo abaixo:</p>
      <p><a href="${link}">${link}</a></p>
      <p><img src="cid:qrimage" alt="QR Code"/></p>
    `,
        attachments: [
            {
                filename: 'qr.png',
                content: Buffer.from(cleanBase64, 'base64'),
                cid: 'qrimage' // mesmo id usado no src da imagem acima
            }
        ],
    };

    await transporter.sendMail(mailOptions);
}
