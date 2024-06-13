import { Router } from "express";
import { atualizarServico, criarServico, deletarServico, listarServicoPorCliente, listarServicos } from "../repository/servicoRepository.js";

let router = Router();

router.post("/servico/cadastrar", async (req, resp) => {
    let {
        nome,
        descricao,
        preco,
        cliente_Id
    } = req.body;

    if (
        !nomeProduto ||
        !descricao ||
        !preco ||
        !cliente_Id
    ) {
        return resp
            .status(400)
            .send(
                "Solicitação inválida. Verifique os dados enviados e tente novamente."
            );
    }

    let servicoRegister = await criarServico({
        nome,
        descricao,
        preco,
        cliente_Id
    });

    return resp.status(201).send(servicoRegister);
});

router.get("/servico/listar", async (req, resp) => {
    let budgets = await listarServicos();
    return resp.status(200).send(budgets);
});

router.get("/servico/listar/:categoryId", async (req, resp) => {
    let clienteId = req.params.clienteId;
    let budgets = await listarServicoPorCliente(clienteId);
    return resp.status(200).send(budgets);
});

router.delete("/servico/:id", async (req, resp) => {
    let budgetId = req.params.id;
    let deleteStatus = await deletarServico(budgetId);

    if (!deleteStatus) {
        return resp
            .status(400)
            .send("Solicitação inválida. Verifique o id, e tente novamente");
    }

    return resp.status(200).send("Produto excluído com sucesso.");
});

router.put("/servico/:id", async (req, resp) => {
    let budgetId = req.params.id;
    let updatedBudgetData = req.body;

    if (!updatedBudgetData) {
        return resp
            .status(400)
            .send(
                "Solicitação inválida. Verifique os dados enviados e tente novamente."
            );
    }

    let updateStatus = await atualizarServico(budgetId, updatedBudgetData);

    if (!updateStatus) {
        return resp
            .status(400)
            .send("Solicitação inválida. Verifique o id, e tente novamente");
    }

    return resp.status(200).send("Produto atualizado com sucesso.");
});

export default router;
