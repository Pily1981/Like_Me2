import pool from "../db/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");  
    return rows;
  };
  
const findById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return rows[0];
  };

const createPost = async (post) => {
  const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows, rowCount } = await pool.query(query, [
    post.titulo,
    post.img,
    post.descripcion,
    post.likes,
  ]);
  if (rowCount === 1) {
    return rows[0];
  }
    return { status: false, msg: "No se pudo crear el post" };
};

const createLike = async (id) => {
    try {
        const consulta = `UPDATE posts SET likes = COALESCE(likes, 0) + 1  WHERE id = $1 RETURNING *;`;
        const { rows } = await pool.query(consulta, [id]);
        if (rows.length === 0) {
            throw { code: "404" }; 
        }
        return rows[0];
    } catch (error) {
        console.error("Error en createLike:", error.message);
    }
};

const updatePost = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const values = [id];
  const { rows, rowCount } = await pool.query(query, values);
  if (rowCount === 1) {
    return { status: true, msg: "Post actualizado", data: rows[0] };
  }
  return { status: false };
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows, rowCount } = await pool.query(query, [id]);
  if (rowCount === 1) {
    return { status: true, msg: "Post eliminado", data: rows[0] };
  }
  return { status: false };
};

export const postsModel = {findAll, findById, createPost, createLike, updatePost, deletePost };