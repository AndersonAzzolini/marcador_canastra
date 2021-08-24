import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();


const inserePontosInicias = (idEquipe) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO pontos (idEquipe, pontos)
                         VALUES ('${idEquipe}', 0)`)
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
                         WHERE partida.rowid = ${idPartida}`, [], (tx, results) => {
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
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`SELECT pontos
                         FROM pontos
                         WHERE idEquipe = ${idEquipe}`, [], (tx, results) => {
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

const inserePontosEquipe = (idEquipe) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO pontos (pontos, idEquipe) VALUES (150, ${idEquipe}) `, [], (tx, results) => {
            console.log(`inseriu na database... `, result.insertId);
            resolve(result.insertId)
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}


export { selecionaPontos, inserePontosInicias, selecionaPontosPorEquipe, inserePontosEquipe }