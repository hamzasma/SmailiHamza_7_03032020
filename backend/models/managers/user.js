const {db} = require('../db-config');
exports.signup = (user, password) => {

  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO user (nom,prenom,mail, password) VALUES ( ?,?,?,?)`;
    db.query(sql,[user.nom,user.prenom,user.email,password], function (err, result) {
      if (err) reject(err);
      else resolve();
    });
  });
}

exports.login = (email) => {

  return new Promise((resolve, reject) => {
    db.query("SELECT Id,nom,prenom,mail,password,photoUrl,isActivate FROM user WHERE mail=?", email, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
exports.isConnected=(userId)=>{
  return new Promise((resolve,reject)=>{
    db.query("SELECT nom,prenom,mail,photoUrl,isAdmin FROM user WHERE Id=?", userId, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  }
  );
}
exports.getuserdata=(userId)=>{
  return new Promise((resolve,reject)=>{
    db.query("SELECT nom,prenom,mail,photoUrl,isAdmin FROM user WHERE Id=?", userId, function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  }
  );
}
exports.getAlluser=()=>{
  return new Promise((resolve,reject)=>{
    db.query("SELECT Id,nom,prenom,mail,photoUrl,isActivate FROM user WHERE 1", function (err, result, fields) {
      if (err) reject(err);
      else resolve(result);
    });
  }
  );
}

exports.update=(userId,userObjet)=>{
  return new Promise((resolve,reject)=>{
    var sql = `UPDATE user,post,comment SET user.nom=?,user.prenom=?,user.photoUrl=?,user.mail=?,post.nom=?,post.prenom=?,post.userphotoUrl=?,comment.nom=?,comment.prenom=?,comment.userphotoUrl=?  WHERE user.Id=? AND post.user_Id=? AND comment.user_Id=?` ;
    db.query(sql, [userObjet.nom,userObjet.prenom,userObjet.photoUrl,userObjet.mail,userObjet.nom,userObjet.prenom, userObjet.photoUrl,userObjet.nom,userObjet.prenom, userObjet.photoUrl,userId, userId, userId],function (err, result, fields) {
      if (err) reject(err);
      else resolve();
    });
  }
  );
}
exports.delete=(userId)=>{
  return new Promise((resolve,reject)=>{
    var sql = `DELETE FROM user WHERE Id=?`;
    db.query(sql, userId,function (err, result, fields) {
      if (err) reject(err);
      else resolve();
    });
  }
  );
}
exports.disactivite=(userId)=>{
  return new Promise((resolve,reject)=>{
    var sql = `UPDATE user SET isActivate='false' WHERE Id=?`;
    db.query(sql, userId,function (err, result, fields) {
      if (err) reject(err);
      else resolve();
    });
  }
  );
}
exports.activite=(userId)=>{
  return new Promise((resolve,reject)=>{
    var sql = `UPDATE user SET isActivate='true' WHERE Id=?`;
    db.query(sql, userId,function (err, result, fields) {
      if (err) reject(err);
      else resolve();
    });
  }
  );
}
