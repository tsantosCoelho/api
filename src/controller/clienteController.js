import { Router } from "express";
import { atualizarCliente, criarCliente, deletarClientes, listarClientes, obterClientePorId } from "../repository/clienteRepository.js";
let router = Router();

router.post("/cliente/cadastrar", async (req, resp) => {
  let { nome, cpf, telefone } = req.body;

  console.log(nome)
  console.log(cpf)
  console.log(telefone)

  if (!nome || !cpf || !telefone) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let cliente = await criarCliente({
    nome, cpf, telefone
  });

  return resp.status(201).send(cliente);
});

router.get("/cliente/listar", async (req, resp) => {
  let clientes = await listarClientes();
  return resp.status(200).send(clientes);
});

router.get("/cliente/:id", async (req, resp) => {
  let idCliente = req.params.id;
  let cliente = await obterClientePorId(idCliente);

  if (!cliente) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  return resp.status(200).send(cliente);
});

router.delete("/cliente/:id", async (req, resp) => {
  let idCliente = req.params.id;
  let deleteStatus = await deletarClientes(idCliente);

  if (!deleteStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send("Deletado com sucesso!");
});

router.put("/cliente/:id", async (req, resp) => {
  let idCliente = req.params.id;
  let { nome, cpf, telefone } = req.body;

  if (!nome || !cpf || !telefone) {
    return resp
      .status(400)
      .send(
        "Solicitação inválida. Verifique os dados enviados e tente novamente."
      );
  }

  let updateStatus = await atualizarCliente({
    nome, cpf, telefone
  }, idCliente);

  if (!updateStatus) {
    return resp
      .status(400)
      .send("Solicitação inválida. Verifique o id, e tente novamente");
  }

  return resp.status(200).send('Atualizado com Sucesso!');
});

export default router;
