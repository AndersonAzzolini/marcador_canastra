import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();


const selecionaNomePartidas = () => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql('SELECT ROWID, nome FROM partida ', [], (tx, results) => {
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
              resolve(true);
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

const selecionaNomeEquipes = () => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql('SELECT ROWID, idPartida, nome FROM equipes ', [], (tx, results) => {
            var partidas = [];
            for (let i = 0; i < results.rows.length; ++i)
              partidas.push(results.rows.item(i));
            console.log(partidas);
          });
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
  });
}
export { selecionaNomePartidas, insereEquipes, selecionaNomeEquipes }