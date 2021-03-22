const mysql=require('mysql');
const db = mysql.createConnection({

    host: "localhost",
  
    user: "Groupomania2021",
  
    password: "1TL8SAsGeXGYn6Cn",
  
    database: "reseau_social"
  });
  //connexion a la base de donnée et configuration des acces //
  db.connect(function (err) {
  
    if (err) throw err;
  
    console.log("Connecté à la base de données MySQL!");
  
  });
  module.exports = { db }