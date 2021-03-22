const { db } = require('../db-config');
const { Post } = require('../entities/post');

exports.createPost = (postObject) => {

    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO post (text, imageUrl, user_Id, nom, prenom, userphotoUrl) VALUES (?,?,?,?,?,?)`;
        db.query(sql, [postObject.text, postObject.imageUrl, postObject.user_Id, postObject.nom, postObject.prenom, postObject.photoUrl], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
}
exports.getAllPost = (userId,isAdmin) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT  post.Id, text, imageUrl, user_Id ,post.nom,post.prenom,post.userphotoUrl,post.date FROM post
        INNER JOIN user ON post.user_Id=user.Id WHERE user.isActivate=? ORDER BY date DESC`,'true', function (err, result, fields) {
            if (err) reject(err);
            else {
                let posts = [];
                for (let i = 0; i < result.length; i++) {
                    let post = new Post();
                    let datetostring = (result[i].date.toString());
                    let date = `${datetostring.split(' ')[2]} ${datetostring.split(' ')[1]} ${datetostring.split(' ')[3]} a ${datetostring.split(':')[0].split(' ')[4]}:${datetostring.split(':')[1]}`
                    result[i].date = date;
                    if (result[i].user_Id == userId || isAdmin=='true') {
                        post.fromarray(result[i], true);
                        posts.push(post);
                    } else {
                        post.fromarray(result[i], false);
                        posts.push(post);
                    }
                }
                resolve(posts);
            }


        }
        );
    });
};
exports.getOnePost = (Id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT  Id, text, imageUrl, user_Id ,nom,prenom,userphotoUrl,date FROM post
        WHERE Id=?`, Id, function (err, result, fields) {
            if (err) reject(err);
            else {
                let post = new Post();
                post.fromarray(result[0], true);
                resolve(post);
            }
     }
        );
    });
};
exports.getPostbyuserId = (Id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT  imageUrl FROM post
        WHERE user_Id=?`, Id, function (err, result, fields) {
            if (err) reject(err);
            else {
                let posts=[];
                 for (let i = 0; i < result.length; i++) {
                    let post = new Post();
                        post.fromarray(result[i], true);
                        posts.push(post);
                }
                resolve(posts);
            }
        }
        );
    });
};
exports.modifyPost = (postObject, id) => {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE post SET text=?,imageUrl=? WHERE Id=?`;
        db.query(sql, [postObject.text, postObject.imageUrl, id], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
}
exports.deletePost = (id) => {

    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM post WHERE Id=?`;

        db.query(sql, id, function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
}