import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(false);
SQLite.enablePromise(true);

const database_name = "marcadodr_de_canastra.db";
const database_version = "1.0";
const database_displayname = "Marcador de Canastra";
const database_size = 200000;

export default class DatabaseSQLite {
  criaDataBase() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB;

              db.executeSql("SELECT 1 FROM historicoVencedor LIMIT 1")
                .then(() => { })
                .catch(error => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction(tx => {
                    //TABLES
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS historicoVencedor(idPartida INT, 
                                                                                idEquipe INTEGER,
                                FOREIGN KEY(idPartida) REFERENCES partida(ROWID),
                                FOREIGN KEY(idEquipe) REFERENCES equipes(ROWID))`);
                  })
                    .then(() => {
                      console.log("Criado tabela historicoVencedor");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });

              db.executeSql("SELECT 1 FROM partida LIMIT 1")
                .then(() => { })
                .catch(error => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction(tx => {
                    //TABLES
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS partida(nome TEXT, 
                                                                      pontosMaximo INTEGER,
                                                                      criadoEm DATE)`);
                  })
                    .then(() => {
                      console.log("Criado tabela partida");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });

              db.executeSql("SELECT 1 FROM equipes LIMIT 1")
                .then(() => { })
                .catch(error => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction(tx => {
                    //TABLES
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS equipes(nome TEXT, 
                                                                      idPartida INTEGER,
                                FOREIGN KEY(idPartida) REFERENCES partida(ROWID))`);

                  })
                    .then(() => {
                      console.log("Criado tabela equipes");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });

              db.executeSql("SELECT 1 FROM pontos LIMIT 1")
                .then(() => { })
                .catch(error => {
                  console.log("Received error: ", error);
                  console.log("Database not yet ready ... populating data");
                  db.transaction(tx => {
                    //TABLES
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS pontos( pontos INTEGER, 
                                                                      idEquipe INTEGER,
                    FOREIGN KEY(idEquipe) REFERENCES equipes(ROWID))`);

                  })
                    .then(() => {
                      console.log("Criado tabela pontos");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });

              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
    });
  }

  fecharBanco(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  }
}

