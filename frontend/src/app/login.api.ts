import Cookies from 'js-cookie'
import { toast } from "sonner"

async function login(credentialData: any) {
    const response =  await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentialData),
    } )
    const data = await response.json()
    if (data.access_token) {
        Cookies.set('authToken', data.access_token, { expires: 1/24, secure: false }); // Guarda el token por 1 hora
    }
    return data   
}


async function Register(credentialData: any) {
    const response =  await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentialData),
    } )
    console.log(credentialData)
    const data = await response.json()
    return data   
}

async function UploadFile(filesToUpload: any) {
    const formData = new FormData();

    for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('files', filesToUpload[i]); // 'files' Contar los archivos
    }

    try {
        const response = await fetch('http://localhost:4000/api/files/uploadFiles', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        toast.error("Credential Incorrect", {
            position: "top-right",
            description: `Error uploading files: ${error}` ,
            action: {
              label: "Ok",
              onClick: () => console.log("Undo"),
            },
        });        
        throw error; 
    }


}


async function GetProfile(emailUser: any) {
    const response =  await fetch('http://localhost:4000/api/user/getProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        },
        body: JSON.stringify(emailUser),
    } )
    
    const data = await response.json()
    console.log(data)
    return data   
}

async function GetEmail() {
    const response =  await fetch('http://localhost:4000/api/auth/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        }
    } )
    
    const data = await response.json()
    console.log(data)
    return data   
}

async function SendEmail(email: string, name: string, file: File) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("file", file);

    console.log("Datos enviados en FormData:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    const response = await fetch("http://localhost:4000/api/auth/sendEmail", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    return data;
}

async function uploadFilesMeta(filesToUpload: any){
    const formData = new FormData();
    formData.append('files', filesToUpload); // 'Archivo a subir'
    formData.append('messaging_product', 'whatsapp');
    formData.append('type', 'document');
    try {
        const response = await fetch('https://graph.facebook.com/v22.0/649052608286501/media', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Devuelve el ID del archivo subido

    } catch (error) {
        toast.error("Credential Incorrect", {
            position: "top-right",
            description: `Error uploading file to meta: ${error}` ,
            action: {
              label: "Ok",
              onClick: () => console.log("Undo"),
            },
        });        
        throw error; 
    }    
}


async function SendPdfNumber(number: number, name: string, idFile: string) {
    const response = await fetch('https://graph.facebook.com/v17.0/649052608286501/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}`
        },
        body: JSON.stringify({
            messaging_product: "whatsapp",
            to: number.toString(),
            type: "template",
            template: {
                name: "enviocarnet",
                language: {
                    code: "es-MX"
                },
                components: [
                    {
                        type: "header",
                        parameters: [
                            {
                                type: "document",
                                document: {
                                    id: idFile,
                                    filename: "Carnet UMG 2025"
                                }
                            }
                        ]
                    },
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: name
                            }
                        ]
                    }
                ]
            }
        })
    });

    const data = await response.json();
    console.log("Response:", data);
}



export { login, Register, UploadFile, GetProfile, GetEmail, SendEmail, uploadFilesMeta, SendPdfNumber }