import Cookies from 'js-cookie';

async function GetRoles() {
    const response =  await fetch('http://localhost:4000/api/roles/GetRoles', {
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

export interface Role {
  IdRol: number;
  NombreRol: string;
}

export { GetRoles}