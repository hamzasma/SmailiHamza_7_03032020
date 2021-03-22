const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const usermngrs = require('../models/managers/user');
const postmngrs = require('../models/managers/post');
const { User } = require('../models/entities/user');
//configuration des controllers//

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      usermngrs.signup(req.body, hash).then(() => {
        res.status(201).json({ message: 'Utilisateur créé !' });
      }).catch(error => res.status(500).json({ message: 'émail existe deja' }))
    });
}
exports.login = (req, res, next) => {
  usermngrs.login(req.body.email, req.body.password).then((result) => {
    if (result.length == 0) {
      return res.status(401).json({ error: 'émail incorrect !' });
    } else {
      if(result[0].isActivate=='false'){
         return res.status(401).json({ error: 'Votre compte est désactivé veuillez contacter l\'administrateur !' });
      }
      else
      {bcrypt.compare(req.body.password, result[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } else {
            let user = new User();
            user.fromarray(result[0]);
            res.status(200).json({
              nom: user.nom,
              prenom: user.prenom,
              photoUrl: user.photoUrl,
              email:user.email,
              //Creation des tokens d'authentification//
              token: jwt.sign(
                { userId: result[0].Id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          }
        })}
    }
  }).catch(error => res.status(500).json({ message: 'utilisateurs introuvable' + error }))
}
exports.updateUser = (req, res, next) => {
    let userObject = '';
      if (req.files.image) {
        if(req.body.photoUrl.split('/images/')[1]=='blank-profile-picture-973460_640.png')
        {
           userObject =
          {
            ...req.body,
            photoUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image.path.split('\\')[1]}`
          }
          usermngrs.update(req.userId,userObject).then(() => {
            res.status(201).json({ message: 'votre compte est à jour' });
          }).catch(error => res.status(500).json({ message: 'émail existe deja'  }))
        }
        else
       { fs.unlink(`images/${req.body.photoUrl.split('/images/')[1]}`, () => {
          userObject =
          {
            ...req.body,
            photoUrl: `${req.protocol}://${req.get('host')}/images/${req.files.image.path.split('\\')[1]}`
          }
          usermngrs.update(req.userId,userObject).then(() => {
            res.status(201).json({ message: 'votre compte est à jour' });
          }).catch(error => res.status(500).json({message: 'émail existe deja'  }))
        });}
      } else {
        if(req.body.photoUrl != 'null' )
        userObject = req.body;
        else{
        if (req.body.imageUrl == 'null') {
          
          postObject = {
            ...req.body,
            photoUrl: null
          }
        }
        if (req.body.text == 'null') {
          postObject = {
            ...req.body,
            text: ''
          }}
    }
    usermngrs.update( req.userId,userObject).then(() => {
      res.status(201).json({ message: 'votre compte est à jour' });
    }).catch(error => res.status(500).json({ message: 'émail existe deja' }))}
 

};
exports.isConnetcted=(req,res,next)=>{
  usermngrs.isConnected(req.userId).then((result)=>{
    if(result.length>0){
      let user = new User();
            user.fromarray(result[0]);
            if(req.userId==process.env.ADMIN_ID)
            user.isAdmin=true;
            res.status(200).json({ nom: user.nom,
              prenom: user.prenom,
              photoUrl: user.photoUrl,
              email:user.email,
              isAdmin:user.isAdmin,
              message: 'Utilisateur deja connecté !' });
    }
    else
    res.status(401).json({ error: 'Utilisateur déconnecté !' });
  }).catch(error => res.status(500).json({ message: 'utilisateurs introuvable' }))
}
exports.getAlluser=(req,res,next)=>{
  usermngrs.getAlluser().then((result)=>{
    
    if(result.length>0){
      let users=[];
      for(i=0;i<result.length;i++){
         if(req.userId!=result[i].Id){
         let user = new User();
            user.fromarray(result[i])
            users.push(user);
            }
      }
            res.status(200).json({ 
              users
               });
    }
    else
    res.status(401).json({ error: 'Utilisateur déconnecté !' });
  }).catch(error => res.status(500).json({ message: 'utilisateurs introuvable' + error }))
}

exports.deleteUser=(req,res,next)=>{
  postmngrs.getPostbyuserId(req.userId).then( async (posts)=>{
    for(i=0;i<posts.length;i++){
      if (posts[i].imageUrl != null) {
         await fs.unlink(`images/${posts[i].imageUrl.split('/images/')[1]}`, () => {
          });
        } 
    }
    usermngrs.isConnected(req.userId).then(async(result)=>{
    if (result[0].photoUrl.split('/images/')[1] != 'blank-profile-picture-973460_640.png') {
         await fs.unlink(`images/${result[0].photoUrl.split('/images/')[1]}`, () => {
          });
        } 
    }).catch(error => res.status(500).json({ message: 'erreur interne' + error }))
     
    usermngrs.delete(req.userId).then(()=>{
      res.status(200).json({ message: 'Utilisateur supprimer!' });
    }).catch(error => res.status(404).json({ message: 'utilisateurs introuvable' + error }))
  }).catch(error => res.status(500).json({ message: 'erreur interne' + error }))
}
exports.deleteUserByAdmin=(req,res,next)=>{
  postmngrs.getPostbyuserId(req.params.Id).then( async (posts)=>{
    for(i=0;i<posts.length;i++){
      if (posts[i].imageUrl != null) {
         await fs.unlink(`images/${posts[i].imageUrl.split('/images/')[1]}`, () => {
          });
        } 
    }
    usermngrs.isConnected(req.params.Id).then(async(result)=>{
    if (result[0].photoUrl.split('/images/')[1] != 'blank-profile-picture-973460_640.png') {
         await fs.unlink(`images/${result[0].photoUrl.split('/images/')[1]}`, () => {
          });
        } 
    }).catch(error => res.status(500).json({ message: 'erreur interne' + error }))
     
    usermngrs.delete(req.params.Id).then(()=>{
      res.status(200).json({ message: 'Utilisateur supprimer!' });
    }).catch(error => res.status(404).json({ message: 'utilisateurs introuvable' + error }))
  }).catch(error => res.status(500).json({ message: 'erreur interne' + error }))
}

exports.disactiviteUserByAdmin=(req,res,next)=>{
    usermngrs.disactivite(req.params.Id).then(()=>{
      res.status(200).json({ message: 'Utilisateur désactiver!' });
    }).catch(error => res.status(404).json({ message: 'utilisateurs introuvable' + error }))
}
exports.activiteUserByAdmin=(req,res,next)=>{
    usermngrs.activite(req.params.Id).then(()=>{
      res.status(200).json({ message: 'Utilisateur activer!' });
    }).catch(error => res.status(404).json({ message: 'utilisateurs introuvable' + error }))
}