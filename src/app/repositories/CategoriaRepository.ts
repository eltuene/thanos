import Categorias from "../entities/Categorias"
import ICategoria from "../interfaces/ICategoria"
import { AppDataSource } from "../../database/data-source"
import { Request, Response } from "express"

const categoriasRepository = AppDataSource.getRepository(Categorias)

const getCategorias = (): Promise<ICategoria[]> => {
  return categoriasRepository.find()
}

const createCategoria = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nome } = req.body

    const novoCategoria = new Categorias()
    novoCategoria.nome = nome

    const categoriaCriado = await categoriasRepository.save(novoCategoria)

    return res.status(201).json(categoriaCriado)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar o categoria" })
  }
}

const deleteCategoria = async (id: number): Promise<boolean> => {
  const categoria = await categoriasRepository.findOneBy({ id })

  if (!categoria) {
    return false
  }

  await categoriasRepository.remove(categoria)

  return true
}

const updateCategoria = async (
  id: number,
  categoriaData: Partial<Categorias>
): Promise<Categorias | null> => {
  const categoria = await categoriasRepository.findOneBy({ id })

  if (!categoria) {
    return null
  }

  const updatedCategoria = { ...categoria, ...categoriaData }

  await categoriasRepository.save(updatedCategoria)

  return updatedCategoria
}

const getCategoriaById = async (id: number): Promise<Categorias | null> => {
  const categoria = await categoriasRepository.findOneBy({ id })
  if (!categoria) {
    return null
  }
  return categoria
}

export default { getCategorias, createCategoria, deleteCategoria, updateCategoria, getCategoriaById }
