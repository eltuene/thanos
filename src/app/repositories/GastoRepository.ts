import Gastos from "../entities/Gastos"
import IGasto from "../interfaces/IGasto"
import { AppDataSource } from "../../database/data-source"
import { Request, Response } from "express"

const gastosRepository = AppDataSource.getRepository(Gastos)

const getGastos = (): Promise<IGasto[]> => {
  return gastosRepository.find()
}

const createGasto = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { descricao, valor, data } = req.body

    const novoGasto = new Gastos()
    novoGasto.descricao = descricao
    novoGasto.valor = valor
    novoGasto.data = data

    const gastoCriado = await gastosRepository.save(novoGasto)

    return res.status(201).json(gastoCriado)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar o gasto" })
  }
}

const deleteGasto = async (id: number): Promise<boolean> => {
  const gasto = await gastosRepository.findOneBy({ id })

  if (!gasto) {
    return false
  }

  await gastosRepository.remove(gasto)

  return true
}

const updateGasto = async (
  id: number,
  gastoData: Partial<Gastos>
): Promise<Gastos | null> => {
  const gasto = await gastosRepository.findOneBy({ id })

  if (!gasto) {
    return null
  }

  const updatedGasto = { ...gasto, ...gastoData }

  await gastosRepository.save(updatedGasto)

  return updatedGasto
}

const getGastoById = async (id: number): Promise<Gastos | null> => {
  const gasto = await gastosRepository.findOneBy({ id })
  if (!gasto) {
    return null
  }
  return gasto
}

export default { getGastos, createGasto, deleteGasto, updateGasto, getGastoById }
