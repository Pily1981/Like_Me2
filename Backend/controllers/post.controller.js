import { postsModel } from "../models/post.models.js";
  
 const read = async (req, res) => {
    try {
      const result =  await postsModel.findAll();
      return res.json(result);
    } catch (error) {
        console.log('Error al obtener los posts:');
        res.status(500).json({error:'Error al obtener los posts.'});
    }
  };
  
const readById = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await postsModel.findById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const create = async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        if (!titulo?.trim() || !img?.trim() || !descripcion?.trim()) {
            res.status(400).json({error: 'Todos los campos son obligatorios.'});
        }
        const newPost = await postsModel.createPost({ titulo, img, descripcion });
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const result = await postsModel.updatePost({ id, titulo, img, descripcion, likes });
        res.status(200).json(result);
    } catch (error) {     
        console.log(error);
        return res.status(500).json({ message: "Error al actualizar el post" });
    }
};
  
const updateLike = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await postsModel.createLike(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};
  
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await postsModel.deletePost(id);
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al eliminar el post" });
    }
  };

export const postController = { read, readById, create, update, updateLike, remove};