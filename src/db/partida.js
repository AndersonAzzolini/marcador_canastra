import DatabaseSQLite from "./db";

const db = new DatabaseSQLite();


const insereNomePartida = (nomePartida, pontos) => {
  return new Promise(resolve => {
    db.criaDataBase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(`INSERT INTO partida (nome, pontosMaximo)
                         VALUES ('${nomePartida}', ${pontos})`)
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

export {insereNomePartida}