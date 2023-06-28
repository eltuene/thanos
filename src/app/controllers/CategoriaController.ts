import { Request, Response, Router } from "express"
import Categorias from "../entities/Categorias"
import CategoriaRepository from "../repositories/CategoriaRepository"
import ICategoria from "../interfaces/ICategoria"

const categoriasRouter = Router()

categoriasRouter.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const categorias = await CategoriaRepository.getCategorias()

    return res.status(200).json(categorias)
  }
)

categoriasRouter.get("/:id", async (req: Request, res: Response): Promise<Response> =>{
    const {id} = req.params;
    const categoria = await CategoriaRepository.getCategoriaById(Number(id));
    return res.status(200).json(categoria)

})

categoriasRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const categoriaCriado = await CategoriaRepository.createCategoria(req, res)
      return res.status(201).json(categoriaCriado)
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar categoria" })
    }
  }
)

categoriasRouter.put("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { nome } = req.body;

  const atualizarCategoria: ICategoria = {
    nome,
  };

  try {
    const categoriaAtualizado = await CategoriaRepository.updateCategoria(Number(id), atualizarCategoria);

    if (!categoriaAtualizado) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }

    return res.status(200).json(categoriaAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar categoria" });
  }
});

categoriasRouter.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const categoriaRemovido = await CategoriaRepository.deleteCategoria(Number(id));

    if (!categoriaRemovido) {
      return res.status(404).json({ message: "Categoria não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro ao remover categoria" });
  }
});

export default categoriasRouter
