import { Request, Response, Router } from "express"
import Gastos from "../entities/Gastos"
import GastoRepository from "../repositories/GastoRepository"
import IGasto from "../interfaces/IGasto"

const gastosRouter = Router()

gastosRouter.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    const gastos = await GastoRepository.getGastos()

    return res.status(200).json(gastos)
  }
)

gastosRouter.get("/:id", async (req: Request, res: Response): Promise<Response> =>{
    const {id} = req.params;
    const gasto = await GastoRepository.getGastoById(Number(id));
    return res.status(200).json(gasto)

})

gastosRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const gastoCriado = await GastoRepository.createGasto(req, res)
      return res.status(201).json(gastoCriado)
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar gasto" })
    }
  }
)

gastosRouter.put("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { descricao, valor, data } = req.body;

  const atualizarGasto: IGasto = {
    descricao,
    valor,
    data,
  };

  try {
    const gastoAtualizado = await GastoRepository.updateGasto(Number(id), atualizarGasto);

    if (!gastoAtualizado) {
      return res.status(404).json({ message: "Gasto não encontrado" });
    }

    return res.status(200).json(gastoAtualizado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar gasto" });
  }
});

gastosRouter.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const gastoRemovido = await GastoRepository.deleteGasto(Number(id));

    if (!gastoRemovido) {
      return res.status(404).json({ message: "Gasto não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro ao remover gasto" });
  }
});

export default gastosRouter
