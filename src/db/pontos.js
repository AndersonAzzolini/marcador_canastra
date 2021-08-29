import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();

const inserePontos = (idEquipe, pontos, idPartida) => {
  console.log('insere pontos ' + idEquipe);
  let value = pontos ? pontos : 0
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO pontos (idEquipe, pontos, pontosUtilizados, idPartida)
                         VALUES ('${idEquipe}', ${value}, 1, ${idPartida})`)
            .then(([tx, result]) => {
              console.log(`inseriu pontos... `, result.insertId);
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

const selecionaPontos = (idPartida) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`SELECT pontos.idEquipe,
                                equipes.nome nomeEquipe,
                                partida.nome nomePartida,
                                partida.pontosMaximo
                         FROM equipes
                         INNER JOIN pontos ON equipes.rowid = pontos.idEquipe
                         INNER JOIN partida ON equipes.idPartida = partida.rowid
                         WHERE partida.rowid = ${idPartida} AND pontosUtilizados = 1`, [], (tx, results) => {
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

const selecionaPontosPorEquipe = (idEquipe) => {
  console.log('oi');
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`SELECT pontos
                         FROM pontos
                         WHERE idEquipe = ${idEquipe} AND pontosUtilizados = 1`, [], (tx, results) => {
            var pontosEquipe = [];
            for (let i = 0; i < results.rows.length; ++i)
              pontosEquipe.push(results.rows.item(i));
            resolve(pontosEquipe);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}

const deletaPonto = (idEquipe) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`DELETE FROM pontos 
                         WHERE ROWID = (SELECT MAX(ROWID) FROM pontos WHERE idEquipe = ${idEquipe})`)
            .then(([tx, result]) => {
              console.log(`deletou da base... `, results.rows.item(i));
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

const deletaTodosPontos = (idPartida) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`UPDATE pontos
                         SET pontosUtilizados = 0
                         WHERE idPartida= ${idPartida}`)
            .then(([tx, results]) => {
              console.log('update em tudo' +results);
              resolve(results)
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

export { selecionaPontos, inserePontos, selecionaPontosPorEquipe, deletaPonto, deletaTodosPontos }