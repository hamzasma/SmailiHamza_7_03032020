<template>
  <div class="login">
    <form class="form-signin" v-on:submit.prevent method="post">
      <img
        class="mb-4"
        src="../assets/image/icon-left-font-monochrome-white.svg"
        alt=""
        width="200"
        height="120"
      />
      <h1 class="h3 mb-3 font-weight-normal">Bienvenue</h1>
      <label for="email" class="sr-only">Adresse Email</label>
      <input
        type="text"
        class="form-control"
        placeholder="Adresse Email"
        required=""
        autofocus=""
        kl_ab.original_type="email"
        id="email"
        v-model="email"
        name="email"
      />
      <label for="password" class="sr-only">Mot de passe</label>
      <input
        class="form-control"
        placeholder="Mot de passe"
        required=""
        id="password"
        v-model="password"
        type="password"
        name="password"
      />
      <button class="btn" v-on:click="signin()" type="submit">
        Connexion
      </button>
      <p class="text-danger">{{erreur}}</p>
    </form>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";
export default {
  name: "loginform",
  props: {
    msg: String,
  },
  data: () => {
    return {
      email: "",
      password: "",
      displaysignin: "initial",
      displaysignup: "none",
      erreur:''
    };
  },
  created: function () {
    this.isConnected();
  },
  methods: {
    isConnected() {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };

      axios
        .get("http://localhost:3000/api/auth/connected", { headers })
        .then((response) => {
          if (response.status == 200) {
             let connectednav=document.getElementById("connectednav");
            connectednav.style.display="initial";
            let connectnav=document.getElementById("connectnav");
            connectnav.style.display="none";
            router.push("post");
          }
        })
        .catch(function () {
          router.push("");
          console.log("session a expirée");
        });
    },
    signin() {
      let ths=this;
      let login = {
        email: this.email,
        password: this.password,
      };
      let user = {
        nom: null,
        prenom: null,
        photoUrl: null,
        email: null,
      };
      axios
        .post("http://localhost:3000/api/auth/login", login)
        .then((response) => {
          user.nom = response.data.nom;
          user.prenom = response.data.prenom;
          user.photoUrl = response.data.photoUrl;
          user.email = response.data.email;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(response.data.token));
           let connectednav=document.getElementById("connectednav");
            connectednav.style.display="initial";
            let connectnav=document.getElementById("connectnav");
            connectnav.style.display="none";
          router.push("post");
        })
        .catch(function (error) {
           console.log(error.response.data.error);
           ths.erreur=error.response.data.error;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.form-signin {
  width: 100%;
  max-width: 430px;
  margin: auto;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  background-color: #132644;
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.form-signin .form-control {
  position: relative;
  width: 70%;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 0px;
  margin-top: 20px;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
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
  margin-bottom: 0px;
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

.form-input input {
  display: none;
}

.form-input img {
  width: 100%;
  display: none;
  margin-top: 10px;
}
.btnsubmit {
  display: inline-block;
  text-decoration: none;
  background: #132644;
  width: 140px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  box-shadow: inset 0px 3px 0 rgb(255 255 255 / 30%), 0 3px 3px rgb(0 0 0 / 30%);
  font-weight: bold;
  transition: 0.4s;
  border: none;
  height: 32px;
  color: rgb(255, 251, 251);
  border-radius: 5px;
  margin-top: 20px;
}
.btnsubmit:hover {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
</style>
