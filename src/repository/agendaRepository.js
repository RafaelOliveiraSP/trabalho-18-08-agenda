import conexao from "./connection.js";


export async function inserirContato(agenda){

    let sql = 'insert into tb_agenda ( nm_contato, ds_telefone, ds_email, bt_favorito, dt_cadastro) values ( ?, ?, ?, ?, ?)';

    let [dados] = await conexao.query(sql, [agenda.nmcontato, agenda.telefone, agenda.email, agenda.favorito, agenda.cadastro]);

    agenda.id = dados.insertId;
    return agenda;
}

export async function listarContatos(){

    let sql = 'select * from tb_agenda';

    let [dados] = await conexao.query(sql);
    return dados;
}

export async function buscarNome(nome){

    let sql = 'select * from tb_agenda where nm_contato like ?';

    let [dados] = await conexao.query(sql, ['%'+nome+'%']);
    return dados;
}

export async function listarFavoritos(){

    let sql = 'select * from tb_agenda where bt_favorito = true';

    let [dados] = await conexao.query(sql);
    return dados;
}

export async function listarDatas(data1, data2){

    let sql = 'select * from tb_agenda where dt_cadastro between ? and ?';

    let [dados] = await conexao.query(sql, [data1,data2]);
    return dados;
}

export async function alterarContato(id, agenda) {
    let sql = `
      update tb_agenda 
        set nm_contato = ?, 
            ds_telefone = ?, 
            ds_email = ?, 
            bt_favorito = ?, 
            dt_cadastro = ?
      where id_agenda = ?
    `
  
    let [dados] = await conexao.query(sql, [agenda.nmcontato, agenda.telefone, agenda.email, agenda.favorito, agenda.cadastro,id]);
    let linhasAfetadas = dados.affectedRows;
    return linhasAfetadas;
  }
  
  export async function deletarContato(id) {
    let sql = 'delete from tb_agenda where id_agenda = ?';
  
    let [dados] = await conexao.query(sql, [id]);
    let linhasAfetadas = dados.affectedRows;
    return linhasAfetadas;
  }