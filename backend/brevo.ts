import * as brevo from '@getbrevo/brevo';

async function sendEmail(email: string, name: string, file: Express.Multer.File) {  
   
    if (!file) {
        throw new Error("El archivo es obligatorio");
    }

    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY || '' // Asegúrate de que la variable de entorno esté configurada
    );

    const smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = 'Hola piloto, te enviamos tus credenciales';
    smtpEmail.to = [{ email: email, name: name }];
    smtpEmail.htmlContent = '<h1>Te enviamos tus credenciales</h1>';
    smtpEmail.sender = { email: 'kevinreyes240122@gmail.com', name: 'RovertApplication' };

 
    const base64String = file.buffer.toString('base64');  
    
    smtpEmail.attachment = [
        {
            content: base64String,
            name: file.originalname, 
        },
    ];

    try {
        const response = await apiInstance.sendTransacEmail(smtpEmail);
        return { message: 'Email sent successfully', response, ok: true };
    } catch (error) {
        return { message: 'Error sending email', ok: false, error };
    }
}


export { sendEmail }