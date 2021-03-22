const { db } = require('../db-config');
const { Comment } = require('../entities/comment');
exports.createComment = (commentObject, user_Id) => {

  return new Promise((resolve, reject) => {
    var sql = `INSERT INTO comment (text, user_Id, post_Id,nom,prenom,userphotoUrl) VALUES (?,?,?,?,?,?)`;
    db.query(sql, [commentObject.text, user_Id, commentObject.post_Id, commentObject.nom, commentObject.prenom, commentObject.photoUrl], function (err, result) {
      if (err) reject(err);
      else resolve();
    });
  });
}
exports.getAllComment = (userId,isAdmin) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT   Id , text ,post_Id, user_Id ,nom,prenom,userphotoUrl, date FROM comment
    WHERE 1  ORDER BY date DESC`, function (err, result, fields) {
      if (err) reject(err);
      else {
        let comments = [];
        for (let i = 0; i < result.length; i++) {
          let comment = new Comment();
          let datetostring = (result[i].date.toString());
          let date = `${datetostring.split(' ')[2]} ${datetostring.split(' ')[1]} ${datetostring.split(' ')[3]} a ${datetostring.split(':')[0].split(' ')[4]}:${datetostring.split(':')[1]}`
          result[i].date = date;
          console.log(result[i].user_Id)
          if (result[i].user_Id == userId || isAdmin=='true') {
            comment.fromarray(result[i], true);
            comments.push(comment);
          } else {
            comment.fromarray(result[i], false);
            comments.push(comment);
          }
        }
        resolve(comments);
      }


    }
    );
  });
};
exports.getOneComment = (Id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT user_Id FROM comment
        WHERE Id=?`, Id, function (err, result, fields) {
            if (err) reject(err);
            else {
                let comment = new Comment();
                comment.fromarray(result[0], true);
                resolve(comment);
            }
        }
        );
    });
};
exports.modifyComment = (commentObject, id) => {

  return new Promise((resolve, reject) => {
    var sql = `UPDATE comment SET commentText=? WHERE Id=?`;
    db.query(sql, [commentObject.commentText, id], function (err, result) {
      if (err) reject(err);
      else resolve();
    });
  });
}
exports.deleteComment = (id) => {

  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM comment WHERE Id=?`;
    db.query(sql, id, function (err, result) {
      if (err) reject(err);
      else resolve();
    });
  });
}