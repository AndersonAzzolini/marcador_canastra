import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();

const selecionaNomePartidas = () => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`SELECT partida.ROWID, 
                                partida.nome, 
                                partida.criadoEm,
                                GROUP_CONCAT(equipes.nome) as nomeEquipes
                         FROM partida
                         INNER JOIN equipes ON equipes.idPartida = partida.ROWID
                         GROUP BY partida.ROWID
                         `, [], (tx, results) => {
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
const insereEquipes = (nomeEquipe, idPartida) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO equipes (nome, idPartida)
                         VALUES ('${nomeEquipe}', ${idPartida})`)
            .then(([tx, result]) => {
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

export { selecionaNomePartidas, insereEquipes }