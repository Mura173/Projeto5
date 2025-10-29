export function sanitizeUser(u){ 
    return {
        id: u.ID_Usuario,
        name: u.nome_usuario,
        email: u.email_usuario
    }
}