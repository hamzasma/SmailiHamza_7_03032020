const fs = require('fs');
const postmngrs = require('../models/managers/post');
const usermngrs = require('../models/managers/user');
//configuration des controllers//
exports.createPost = (req, res, next) => {
  const postObject = req.files.image ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image.path.split('\\')[1]}`

    } : { ...req.body };
  postObject.user_Id = req.userId;
  postmngrs.createPost(postObject).then(() => {
    res.status(201).json({ message: 'post creer' });
  }).catch(error => res.status(500).json({ message: error }))

}


exports.getAllPost = (req, res, next) => {
usermngrs.getuserdata(req.userId).then((result)=>{
postmngrs.getAllPost(req.userId,result[0].isAdmin).then((posts) => {
    res.status(201).json(posts);
  }).catch(error => res.status(500).json({ message: error }))
      }).catch(error => res.status(500).json({ message: error }))
  
};


exports.modifyPost = (req, res, next) => {
  let postObject = '';
  postmngrs.getOnePost(req.params.id).then((post) => {
    usermngrs.getuserdata(req.userId).then((result)=>{
 if (post.user_Id == req.userId ||  result[0].isAdmin=='true') {
      if (req.files.image) {
        fs.unlink(`images/${req.body.imageUrl.split('/images/')[1]}`, () => {
          postObject =
          {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image.path.split('\\')[1]}`
          }
          postmngrs.modifyPost(postObject, req.params.id).then(() => {
            res.status(201).json({ message: 'post updated' });
          }).catch(error => res.status(500).json({ message: error + "k" }))
        });
      } else {
        if(req.body.imageUrl != 'null' && req.body.text != 'null' )
        postObject = req.body;
        else{
        if (req.body.imageUrl == 'null') {     
          postObject = {
            ...req.body,
            imageUrl: null
          }
        }  
        if (req.body.text == 'null') {
          postObject = {
            ...req.body,
            text: ''
          }}
    }postmngrs.modifyPost(postObject, req.params.id).then(() => {
      res.status(201).json({ message: 'post updated' });
    }).catch(error => res.status(500).json({ message: error  }))}}
    else {
      res.status(401).json({
        message: 'vous n\'êtes pas le createur de ce post'
      });
    }
      }).catch(error => res.status(500).json({ message: error }))

  }).catch(error => res.status(500).json({ message: error  }))
};


exports.deletePost = (req, res, next) => {
  postmngrs.getOnePost(req.params.id).then((post) => {
    usermngrs.getuserdata(req.userId).then((result)=>{
 if (post.user_Id == req.userId ||  result[0].isAdmin=='true') {
      postmngrs.deletePost(req.params.id).then(() => {
        if (post.imageUrl != null) {
          fs.unlink(`images/${post.imageUrl.split('/images/')[1]}`, () => {
          });
        }
        res.status(201).json({ message: 'post deleted' });
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

