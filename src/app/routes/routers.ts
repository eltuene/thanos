import { Router } from "express";
import GastoService from "../controllers/GastoController";
import CategoriaService from "../controllers/CategoriaController";
const routers = Router();

routers.use("/gastos", GastoService);
routers.use("/categorias", CategoriaService);

export default routers;