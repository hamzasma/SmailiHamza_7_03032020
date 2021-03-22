<template>
  <div>
    <form v-if="!signing" class="form-signin" v-on:submit.prevent method="post">
      <img
        class="mb-4"
        src="../assets/image/icon-left-font-monochrome-white.svg"
        alt=""
        width="200"
        height="120"
      />
      <h1 class="h3 mb-3 font-weight-normal">Inscrivez-vous</h1>
      <label for="nom" class="sr-only">Nom</label>
      <input
        type="text"
        class="form-control"
        :class="{ erreur: !nomtrue }"
        placeholder="Nom *"
        required
        autofocus=""
        kl_ab.original_type="lastname"
        id="nom"
        v-model="nom"
        name="email"
        v-on:input="verifyfisrtname()"
      />
      <p class="text-danger" v-if="!nomtrue">Le nom est incorrect</p>
      <label for="Prenom" class="sr-only">Prenom</label>
      <input
        type="text"
        class="form-control"
        :class="{ erreur: !prenomtrue }"
        placeholder="Prénom *"
        required
        autofocus=""
        kl_ab.original_type="name"
        id="prenom"
        v-model="prenom"
        name="email"
        v-on:input="verifylastname()"
      />
      <p class="text-danger" v-if="!prenomtrue">Le prénom est incorrect</p>
      <label for="inputEmail" class="sr-only">Adresse Email</label>
      <input
        type="text"
        class="form-control"
        :class="{ erreur: !emailtrue }"
        placeholder="Adresse Email  *"
        required=""
        autofocus=""
        kl_ab.original_type="email"
        id="email"
        v-model="email"
        name="email"
        v-on:input="verifyemail()"
      />
      <p class="text-danger" v-if="!emailtrue">L'email est incorrect</p>
      <p class="text-danger" v-if="emailexist">
        L'email est déja associe a compte
      </p>
      <label for="inputPassword" class="sr-only">Mot de passe</label>
      <input
        type="password"
        class="form-control"
        :class="{ erreur: !passwordtrue }"
        placeholder="Mot de passe  *"
        required=""
        id="password"
        v-model="password"
        name="password"
        v-on:input="verifypassword()"
      />
      <label for="inputPassword" class="sr-only">confirm Password</label>
      <input
        type="password"
        class="form-control"
        :class="{ erreur: !passwordconfirmtrue }"
        placeholder="Confirmez votre mot de passe  *"
        required=""
        id="comfirmpassword"
        v-model="passwordconfirm"
        name="password"
        v-on:input="verifyconfirmpassword()"
      />
      <p class="text-danger" v-if="!passwordconfirmtrue">
        Les mot de passe ne correspond pas
      </p>
      <p class="text-danger" v-if="!lengthpassword">
        Minimum 8 caractère <i class="far fa-times-circle"></i>
      </p>
      <p class="text-success" v-if="lengthpassword && inputed">
        Minimum 8 caractère <i class="fas fa-check-circle"></i>
      </p>
      <p class="text-danger" v-if="!uppercase">
        Majuscule <i class="far fa-times-circle"></i>
      </p>
      <p class="text-success" v-if="uppercase && inputed">
        Majuscule <i class="fas fa-check-circle"></i>
      </p>
      <p class="text-danger" v-if="!lowercase">
        Minuscule <i class="far fa-times-circle"></i>
      </p>
      <p class="text-success" v-if="lowercase && inputed">
        Minuscule <i class="fas fa-check-circle"></i>
      </p>
      <p class="text-danger" v-if="!numbre">
        Chiffre <i class="far fa-times-circle"></i>
      </p>
      <p class="text-success" v-if="numbre && inputed">
        Chiffre <i class="fas fa-check-circle"></i>
      </p>
      <button class="btn" v-on:click="signup()">S'inscrire</button>
    </form>

    <span v-if="signing" class="form-signin text-success">Félicitaion vous êtes inscrit</span>
  </div>
</template>
<script>
import router from "../router/index";
import axios from "axios";
export default {
  name: "signupform",
  data: () => {
    return {
      emailtrue: true,
      prenomtrue: true,
      nomtrue: true,
      passwordtrue: true,
      passwordconfirmtrue: true,
      emailexist: false,
      lengthpassword: true,
      uppercase: true,
      lowercase: true,
      numbre: true,
      inputed: false,
      signing: false,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      passwordconfirm: "",
      displaysignin: "initial",
      displaysignup: "none",
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
            router.push("post");
          }
        })
        .catch(function () {
          router.push("signup");
          console.log("session a expirée");
        });
    },

    signup() {
      let user = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
      };
      if (
        this.nomtrue &&
        this.prenomtrue &&
        this.emailtrue &&
        this.passwordtrue &&
        this.passwordconfirmtrue &&
        this.nom != "" &&
        this.prenom != "" &&
        this.email != "" &&
        this.password != "" &&
        this.passwordconfirm != ""
      ) {
        const vm = this;
        axios
          .post("http://localhost:3000/api/auth/signup", user)
          .then(() => {
            vm.emailexist = false;
            vm.signing = true;
            setTimeout(() => {
              vm.signing = false;
              router.push("/");
            }, 2000);
          })
          .catch(function () {
            vm.emailexist = true;
          });
      }
    },

    verifyfisrtname() {
      let nom = this.nom;
      var nomreg = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
      if (!nomreg.test(nom)) {
        this.nomtrue = false;
      } else this.nomtrue = true;
    },
    verifylastname() {
      let prenom = this.prenom;
      var prenomreg = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
      if (!prenomreg.test(prenom)) {
        this.prenomtrue = false;
      } else this.prenomtrue = true;
    },
    verifyemail() {
      let email = this.email;
      var emailreg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailreg.test(email)) {
        this.emailtrue = false;
      } else this.emailtrue = true;
    },

    verifypassword() {
      this.inputed = true;
      if (this.password.length < 8) this.lengthpassword = false;
      else this.lengthpassword = true;
      if (!/[A-Z]/.test(this.password)) this.uppercase = false;
      else this.uppercase = true;
      if (!/[a-z]/.test(this.password)) this.lowercase = false;
      else this.lowercase = true;
      if (!/[0-9]/.test(this.password)) this.numbre = false;
      else this.numbre = true;
      if (
        this.lengthpassword &&
        this.uppercase &&
        this.lowercase &&
        this.numbre
      )
        this.passwordtrue = true;
      else this.passwordtrue = false;
    },
    verifyconfirmpassword() {
      if (this.password != this.passwordconfirm)
        this.passwordconfirmtrue = false;
      else this.passwordconfirmtrue = true;
    },
  },
};
</script>
<style scoped>
.text-danger {
  color: #ff0a05;
  margin: 0px;
}
.text-success {
  color: #05ff44;
  margin: 0px;
}
.fas {
  animation: rot 1s forwards;
}
.erreur {
  background-color: red;
  animation: mymove 2s forwards;
} 
span{
    font-size: 25px;
}
@keyframes rot {
  from {
    transform: scale(0);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: scale(2);
    -ms-transform: rotate(720deg);
    -webkit-transform: rotate(720deg);
  }
}
@keyframes mymove {
  from {
    background-color: red;
  }
  to {
    background-color: white;
  }
}
</style>
