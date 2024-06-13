import con from "./connection.js";

export async function criarCliente(cliente) {
  let { nome, cpf, telefone } = cliente;

  let comando = `
    INSERT INTO clientes (nome, cpf, telefone) 
    VALUES (?, ?, ?)
  `;

  let resp = await con.query(comando, [nome, cpf, telefone]);
  let info = resp[0];

  cliente.id = info.insertId;
  return cliente;
}

export async function listarClientes() {
  let comando = `
    SELECT * FROM clientes
  `;

  let resp = await con.query(comando);
  return resp[0];
}

export async function deletarClientes(clienteId) {
  let comando = `
    DELETE FROM clientes
    WHERE id = ?
  `;

  let resp = await con.query(comando, [clienteId]);
  return resp[0].affectedRows > 0;
}

export async function atualizarCliente(dadosCategoriaAtualizados, categoryId) {
  const { nome, cpf, telefone } = dadosCategoriaAtualizados;

  let comando = `
    UPDATE clientes
    SET nome = ?, cpf = ?, telefone = ?
    WHERE id = ?
  `;

  let resp = await con.query(comando, [
    nome, cpf, telefone, categoryId
  ]);
  return resp[0].affectedRows > 0;
}

export async function obterClientePorId(clienteId) {
  let comando = `
    SELECT * FROM clientes
    WHERE id = ?
  `;

  let resp = await con.query(comando, [clienteId]);
  return resp[0][0];
}
