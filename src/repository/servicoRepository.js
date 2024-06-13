import con from "./connection.js";

export async function criarServico(service) {
  const {
    nome,
    descricao,
    preco,
    cliente_Id
  } = service;

  const comando = `
    INSERT INTO servicos (nome, descricao, preco, cliente_Id) 
    VALUES (?, ?, ?, ?)
  `;

  const resp = await con.query(comando, [
    nome,
    descricao,
    preco,
    cliente_Id
  ]);
  const info = resp[0];

  service.id = info.insertId;
  return service;
}

export async function listarServicos() {
  let comando = `
      SELECT * FROM servicos
    `;

  let resp = await con.query(comando);
  return resp[0];
}

export async function listarServicoPorCliente(clienteId) {
  const comando = `
    SELECT * FROM servicos
    WHERE cliente_id = ?
  `;

  const resp = await con.query(comando, [clienteId]);
  return resp[0];
}

export async function deletarServico(servicoId) {
  const comando = `
    DELETE FROM servicos
    WHERE id = ?
  `;

  const resp = await con.query(comando, [servicoId]);
  return resp[0].affectedRows > 0;
}

export async function atualizarServico(usuarioId, dadosUsuarioAtualizados) {
  const {
    nome,
    descricao,
    preco,
    cliente_Id
  } = dadosUsuarioAtualizados;

  const comando = `
    UPDATE servicos
    SET nome = ?, descricao = ?, preco = ?, cliente_Id = ?
    WHERE id = ?
  `;

  const resposta = await con.query(comando, [
    nome,
    descricao,
    preco,
    cliente_Id,
    usuarioId
  ]);
  return resposta[0].affectedRows > 0;
}