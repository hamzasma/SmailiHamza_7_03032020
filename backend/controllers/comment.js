const { Comment } = require('../models/entities/comment');
const commentmngrs = require('../models/managers/comment');
const usermngrs = require('../models/managers/user');
//configuration des controllers//
exports.createComment = (req, res, next) => {
    console.log(req.body);
    commentmngrs.createComment(req.body,req.userId).then(() => {
        res.status(201).json({ message: 'comment creer' });
    }).catch(error => res.status(500).json({ message: error }))
}

exports.getAllComment = (req, res, next) => {
    usermngrs.getuserdata(req.userId).then((result)=>{
   commentmngrs.getAllComment(req.userId,result[0].isAdmin).then((comments) => {
        res.status(201).json(comments);
    }).catch(error => res.status(500).json({ message: error }))
      }).catch(error => res.status(500).json({ message: error }))
};
exports.modifyComment = (req, res, next) => {
    commentmngrs.getOnePost(req.params.id).then((comment) => {
        usermngrs.getuserdata(req.userId).then((result)=>{
 if (comment.user_Id == req.userId ||  result[0].isAdmin=='true') {
    commentmngrs.modifyComment(req.body).then(() => {
        res.status(201).json({ message: 'comment updated' });
    }).catch(error => res.status(500).json({ message: error }))
    }
    else {
      res.status(401).json({
        message: 'vous n\'êtes pas le createur de ce post'
      });
    }
      }).catch(error => res.status(500).json({ message: error }))
   
    }).catch(error => res.status(500).json({ message: error }))
};

exports.deleteComment = (req, res, next) => {
    commentmngrs.getOneComment(req.params.id).then((comment) => {
         usermngrs.getuserdata(req.userId).then((result)=>{
     if (comment.user_Id == req.userId ||  result[0].isAdmin=='true') {
     commentmngrs.deleteComment(req.params.id).then(() => {
        res.status(201).json({ message: 'comment deleted' });
    }).catch(error => res.status(500).json({ message: error }))
    }
    else {
      res.status(401).json({
        message: 'vous n\'êtes pas le createur de ce post'
      });
    }
      }).catch(error => res.status(500).json({ message: error }))
  
    }).catch(error => res.status(500).json({ message: error }))
};
