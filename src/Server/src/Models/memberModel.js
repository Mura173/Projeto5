import { pool } from "../db.js";

//listar membros do grupo
export async function getMembers(id) {
    try {
        const [membersId] = await pool.query(
            "select * from UsuarioGrupo where ID_Grupo = ?",
            [id]
        );

        if (membersId.length < 1) {
            return { error: "Integrantes nao encontrados", status_code: 404 }
            
        }

        const rows = await Promise.all(
            membersId.map(async (member) => {
                const [user] = await pool.query(
                    "select * from Usuario where ID_Usuario = ?",
                    [member.id_usuario]
                );
                return user[0];
            })
        );

        return { members: rows, status_code: 200 };

    } catch (err) {
        console.log(err);
        return { error: "Erro ao listar membros", status_code: 500 };
    }
}

//adicionar membros ao grupo
export async function addMember(data) {
    const { id_grupo, id_usuario } = data

    try {
        const [checkGroup] = await pool.query(
            "SELECT * FROM Grupo WHERE ID_Grupo = ?",
            [id_grupo]
        )

        if (checkGroup.length < 1) {
            return { error: "Grupo nao encontrado", status_code: 404 };
        }

        const [checkUser] = await pool.query(
            "SELECT * FROM Usuario WHERE ID_Usuario = ?",
            [id_usuario]
        )

        if (checkUser.length < 1) {
            return { error: "Usuário nao encontrado", status_code: 404 };
        }

        const [rows] = await pool.query(
            "INSERT INTO UsuarioGrupo (ID_Grupo, ID_Usuario) VALUES (?, ?)",
            [id_grupo, id_usuario]
        );

        return { message: "Usuário adicionado ao grupo com sucesso", status_code: 201 };

    } catch (err) {
        console.log(err)
        return { error: "Erro ao adicionar membro", status_code: 500 }
    }
}

//remover membro do grupo
export async function removeMember(data) {
    const { id_grupo, id_usuario } = data

    try {
        const [checkGroup] = await pool.query(
            "SELECT * FROM Grupo WHERE ID_Grupo = ?",
            [id_grupo]
        )

        if (checkGroup.length < 1) {
            return { error: "Grupo nao encontrado", status_code: 404 };
        }

        const [checkUser] = await pool.query(
            "SELECT * FROM Usuario WHERE ID_Usuario = ?",
            [id_usuario]
        )

        if (checkUser.length < 1) {
            return { error: "Usuário nao encontrado", status_code: 404 };
        }

        const [rows] = await pool.query(
            "DELETE FROM UsuarioGrupo WHERE ID_Grupo = ? AND ID_Usuario = ?",
            [id_grupo, id_usuario]
        )

        return { message: "Usuário removido do grupo com sucesso", status_code: 200 };

    } catch (err) {
        console.log(err)
        return { error: "Erro ao remover membro", status_code: 500 }
    }
}

//realocar membro
export async function relocateMember(data) {
    const { id_grupo, id_usuario } = data

    try {
        const [checkGroup] = await pool.query(
            "SELECT * FROM Grupo WHERE ID_Grupo = ?",
            [id_grupo]
        )

        if (checkGroup.length < 1) {
            return { error: "Grupo nao encontrado", status_code: 404 };
        }

        const [checkUser] = await pool.query(
            "SELECT * FROM Usuario WHERE ID_Usuario = ?",
            [id_usuario]
        )

        if (checkUser.length < 1) {
            return { error: "Usuário nao encontrado", status_code: 404 };
        }

        const [rows] = await pool.query(
            "UPDATE UsuarioGrupo SET ID_Grupo = ? WHERE ID_Usuario = ?",
            [id_grupo, id_usuario]
        )

        return { message: "Usuário movido ao grupo com sucesso", status_code: 200 };

    } catch (err) {
        console.log(err)
        return { error: "Erro ao mover membro", status_code: 500 }
    }
}