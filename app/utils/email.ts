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
        from: `"Equipe HeartFy" <${process.env.EMAIL_USER}>`,
        to,
        subject: '🎁 Seu conteúdo exclusivo está pronto para acesso!',
        html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #007BFF;">Olá!</h2>
        <p>Obrigado por sua compra. Seu conteúdo personalizado está pronto para ser acessado.</p>
        <p style="margin-top: 20px;">
          <strong>🔗 Link de acesso:</strong><br/>
          <a href="${link}" style="color: #007BFF; word-break: break-all;">${link}</a>
        </p>
        

        <p style="margin-top: 30px;">
          <strong>📲 Como acessar com QR CODE:</strong>
        </p>

        <ol style="margin-left: 20px; color: #333; line-height: 1.6;">
  <li>Baixe a imagem do QR Code abaixo (clique e segure no QRCODE abaixo, e depois em <em>"Salvar imagem..."</em>).</li>
  <li>Imprima a imagem.</li>
  <li>Abra a câmera do seu celular.</li>
  <li>Aponte para o QR Code com a câmera até aparecer o link na tela.</li>
  <li>Clique no link e desbloqueie seu presente.</li>
        </ol>
        <img src="cid:qrimage" alt="QR Code" style="margin-top: 10px; width: 200px; height: auto;" />
        <p style="margin-top: 40px; font-size: 0.9em; color: #666;">
          Se você tiver qualquer dúvida ou problema, não hesite em nos contatar.
        </p>
        <p style="margin-top: 10px;">Atenciosamente,<br/>Equipe HeartFy</p>
      </div>
    `,
        attachments: [
            {
                filename: 'qr.png',
                content: Buffer.from(cleanBase64, 'base64'),
                cid: 'qrimage'
            }
        ],
    };

    await transporter.sendMail(mailOptions);
}
