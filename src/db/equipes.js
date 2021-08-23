import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();


const selecionaNomePartidas = () => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM partida', [], (tx, results) => {
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

const insereNomeEquipes = (nomeEquipe) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO partida (nome)
                         VALUES ('${nomeEquipe}')`)
            .then(([tx, result]) => {
              // const { dataHora } = result.rows.item(0);
              console.log(`inseriu na database... `, result);
              // resolve(dataHora);
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

export { selecionaNomePartidas, insereNomeEquipes }