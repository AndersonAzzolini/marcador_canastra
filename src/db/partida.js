import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();

const insereNomePartida = (nomePartida, pontos) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO partida (nome, pontosMaximo, criadoEm)
                         VALUES ('${nomePartida}', ${pontos}, date())`)
            .then(([tx, result]) => {
              console.log(`inseriu na database... `, result.insertId);
              resolve(result.insertId)
            })
            .catch(err => {
              resolve(null);
            });;
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}

const insereVencedorHistorico = (idPartida, idEquipe) => {
  console.log(idPartida, idEquipe);
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO historicoVencedor (idPartida,
                                                        idEquipe)
                         VALUES ('${idPartida}', ${idEquipe})`)
            .then(([tx, result]) => {
              console.log(`inseriu na tabela histórico`, result.insertId);
              resolve(result.insertId)
            })
            .catch(err => {
              resolve(null);
            });;
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}


const deletaPontosRodada = (idEquipe) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          console.log('caiu delete');
          tx.executeSql(`UPDATE pontos set pontosUtilizados = 1 
                         WHERE idEquipe = ${idEquipe} `, [], (tx, results) => {
            resolve(results);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}

const selecionaHistorico = (idPartida) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`SELECT equipes.nome 
                         FROM historicoVencedor hv
                         INNER JOIN equipes ON equipes.rowid = hv.idEquipe
                         WHERE hv.idPartida = ${idPartida}`, [], (tx, results) => {
            var partidas = [];
            for (let i = 0; i < results.rows.length; ++i)
              partidas.push(results.rows.item(i));
            resolve(partidas);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}


export { insereNomePartida, insereVencedorHistorico, deletaPontosRodada, selecionaHistorico }