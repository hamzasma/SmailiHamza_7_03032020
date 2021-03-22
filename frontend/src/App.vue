<template>
  <div id="nav">
    <nav class="col-12">
      <img
        src="./assets/image/icon-left-font-monochrome-black.svg"
        alt="logo"
      />
       <img
       class="img"
        src="./assets/image/Capture.png"
        alt="lo"
      />
      <div class="modal-footer" id="connectnav">
        <router-link class="navlink" to="/"> Connexion </router-link>
        <router-link class="navlink" to="/signup"> S'inscrire </router-link>
      </div>
      <div class="modal-footer" id="connectednav">
        <router-link class="navlink" id="profil" to="/profil"> Profile </router-link>
        <router-link class="navlink" id="Accueil" to="/post"> Accueil </router-link>
        <button class="navlink" v-on:click="deconnexion" > Déconnexion </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
import router from "@/router/index";
export default {
  methods:{
    deconnexion(){
      let connectednav=document.getElementById("connectednav");
            connectednav.style.display="none";
            let connectnav=document.getElementById("connectnav");
            connectnav.style.display="initial";
      localStorage.clear();
      router.push("/");
    }
  }
}
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  flex-direction: column;
font-family: 'Cormorant Garamond', serif;
}
nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-bottom: 30px;
  background-color: aliceblue;
}
nav img {
  width: 150px;
  height: 60px;
  margin-left: 20px;
}
nav .img {
 display: none;
}
.modal-footer {
  display: flex;
  align-items: center;
}
#connectednav{
  display: none;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-input {
  width: 100%;
  background: #2c4d83;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.form-input-edit {
  width: 100%;
  background: rgb(234 243 255);
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.form-input input {
  display: none;
}

.form-input img {
  width: 100%;
  display: none;
  margin-top: 10px;
}
.form-input-edit input {
  display: none;
}
.form-input-edit label {
  display: block;
  width: 31px;
  height: 25px;
  line-height: 26px;
  text-align: center;
  background: none;
  color: #333;
  font-size: 24px;
  font-family: "Open Sans", sans-serif;
  text-transform: Uppercase;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
  transition: 0.5s;
}
.form-input-edit label:hover {
  color: rgb(121, 155, 248);
  transform: scale(1.03);
}

.form-input-edit img {
  width: 100%;
  display: none;
  margin-top: 10px;
}
#preview {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: none;
}
#preview img {
  width: 100%;
  height: auto;
  box-shadow: rgb(0 0 0 / 50%) 0px 1px 20px;
}
.conteneur {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
.conteneur .createpost .posttext {
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 10px;
}
.conteneurcreatepost .conteneur .createpost {
  box-shadow: rgba(0, 0, 0, 0.60) 0px 1px 10px;
  margin-bottom: 20px;
  height: auto;
  text-align: left;
  background-color: rgb(234 243 255);
}
.conteneur .createpost .postimage {
  width: 100%;
  height: 350px;
  object-fit: cover;
  object-position: 50% 50%;
}
.textarea {
  width: 100%;
  max-width: 800px;
  height: 100px;
  resize: none;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
}
.conteneurcreatepost .createpost {
  box-shadow: rgba(248, 246, 246, 0.60) 0px 1px 10px;
  max-width: 800px;
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2c4d83;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.scroll::-webkit-scrollbar {
  display: none;
}

.btnedit:hover {
  transform: scale(1.03);
  background: white;
  color: rgb(20, 20, 20);
}
.btnedit:focus {
  transform: scale(1.03);
  background: white;
  color: rgb(3, 3, 3);
}

.photouser {
  width: 60px;
  height: 60px;
  border: 3px solid #8084b9;
  border-radius: 30%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.Profildata {
  display: flex;
  flex-direction: row;
}
.name {
  color: #8084b9;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 18px;
  margin-left: 15px;
}
.createcomment {
   max-width: 800px;
  margin: auto;
  margin-bottom: 20px;
  padding: 10px;
}
.commenttext {
  width: 100%;
  max-width: 800px;
  height: 50px;
  resize: none;
  border: none;
}
.navlink {
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  background: #132644;
  width: 101px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  box-shadow: inset 0px 3px 0 rgb(255 255 255 / 30%), 0 3px 3px rgb(0 0 0 / 30%);
  font-weight: bold;
  line-height: 32px;
  margin: 0;
  margin-right: 10px;
  transition: 0.4s;
  color: white;
  border-radius: 5px;
}

.navlink:hover {
  color: white;
  text-decoration: none;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
.navlink:link {
  text-decoration: none;
  color: white;
}

.navlink:visited {
  text-decoration: none;
  color: white;
}

.navlink:active {
  text-decoration: none;
  color: white;
}
.btn{
  display: inline-block;
    text-decoration: none;
    background: rgb(237, 237, 240);
    width: 120px;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    box-shadow: inset 0px 3px 0 rgb(255 255 255 / 30%), 0 3px 3px rgb(255 255 255 / 30%);
    font-weight: bold;
    transition: .4s;
    border: none;
    height: 32px;
    color: #132644;
    border-radius: 5px;
    margin-top: 10px;
}

.btn:hover i{
 
  animation: mymove 1s linear;
}
@keyframes mymove {
 0%{
   transform: rotate(0deg);
 }
 25%{
   transform: rotate(45deg);
 }
 50%{
  transform: rotate(-90deg);
 }
 75%{
   transform: rotate(90deg);
 }
 100%{
   transform: rotate(-45deg);
 }
}
@media screen and (max-width: 600px) {
 nav {
  display: flex;
  flex-direction: column;
}
nav img {
    margin: auto;
}
.modal-footer {
   padding: 0px;
}
.navlink{
  width: 50%;
  margin-right: 0px;
  border-radius: 0px;
  box-shadow: none;
  border: 1px solid white;
}
.form-input {
    justify-content: center;
}
.btn {
    border-radius: 0px;
    box-shadow: rgb(255 255 255 / 60%) 0 0 10px;
}
.btnpostdlt {
    width: 115px;
    margin-left: 5px;
    box-shadow: rgb(255 255 255 / 60%) 0px 0px 10px;
}
.user {
 
    justify-content: space-between;
    align-items: center;
    width: auto;
    width: auto;
 
}
.profil {
    flex-direction: column;
}
.photo {
   
    width: auto; 
     margin-bottom: 0px; 
    margin-left: 0px; 
}
} 
.createpost {
   
    border-radius: 0px;
}
</style>
