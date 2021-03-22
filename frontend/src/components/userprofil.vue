<template>
  <div>
    <div v-if="confirm" class="comfirmation">
      <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
      <div class="comfirmationbtn">
        <button type="button" class="btn btnupdate" v-on:click="profildelete()">
          Comfirmer
        </button>
        <button
          type="button"
          class="btn btnupdate"
          v-on:click="profildeletecancel()"
        >
          Annuler
         <i class="fas fa-window-close"></i>
        </button>
      </div>
    </div>
    <div class="profil">
      <div class="photo">
        <img
          v-if="!showPreview"
          :src="photoUrl"
          class="profilphoto"
          alt="photo de profil"
        />
        <img
          v-if="showPreview"
          class="profilphoto"
          id="file-ip-1-preview"
          alt="photo de profil"
        />
        <label v-if="edit" class="btn labelbtn" for="file-ip-1">Modifier</label>
        <input
          v-if="edit"
          type="file"
          id="file-ip-1"
          accept="image/*"
          @change="showPreviewImg($event)"
        />
      </div>

      <div class="user">
        <button
          v-if="!edit"
          type="button"
          class="btn"
          v-on:click="profiledit()"
        >
          Modifier
          <i class="fas fa-edit"></i>
        </button>
        <button v-if="edit" type="button" class="btn" v-on:click="canceledit()">
          Annuler
          <i class="fas fa-window-close"></i>
        </button>
        <div v-if="!edit" class="userdata">
          <p>Nom : {{ nom }}</p>
          <p>Prenom : {{ prenom }}</p>
          <p>Adresse Email : {{ email }}</p>
        </div>
        <form v-if="edit" class="form-signin" v-on:submit.prevent method="post">
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
        </form>
        <div v-if="edit" class="userdata">
          <button
            type="button"
            class="btn btnupdate mr"
            v-on:click="profilupdate(photoUrl)"
          >
            Enregistrer
           <i class="fas fa-save"></i>
          </button>
          <button
            type="button"
            class="btn btnupdate mr"
            v-on:click="profildeletecomfirm()"
          >
            Supprimer
           <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="user.isAdmin == 'true'" class="title">
      <div class="separator"></div>
      <p v-if="users.length > 0">Liste des salariés</p>
      <p v-if="users.length == 0">Aucun salarié inscrit</p>
      <div class="separator"></div>
    </div>
    <div v-if="user.isAdmin == 'true'">
      <div v-for="user in users" :key="user.Id" class="profil">
        <img
          v-if="!showPreview"
          :src="user.photoUrl"
          class="photouser"
          alt="photo de profil"
        />
        <div class="userdata">
          <p>Nom : {{ user.nom }}</p>
          <p>Prenom : {{ user.prenom }}</p>
          <p>Adresse Email : {{ user.email }}</p>
        </div>
        <button
          v-if="user.isActivate == 'false'"
          type="button"
          class="btn btnupdate"
          v-on:click="profilactivitebyadmin(user.Id)"
        >
          Activer
          <i class="fas fa-check"></i>
        </button>
        <button
          v-if="user.isActivate == 'true'"
          type="button"
          class="btn btnupdate"
          v-on:click="profildisactivitebyadmin(user.Id)"
        >
          Désactiver
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
import axios from "axios";
export default {
  name: "userprofil",
  data: () => {
    return {
      emailtrue: true,
      prenomtrue: true,
      nomtrue: true,
      emailexist: false,
      nom: "",
      prenom: "",
      email: "",
      password: "",
      photoUrl: "",
      edit: false,
      showPreview: false,
      file: "",
      users: [],
      erreur: "",
      confirm: false,
      user: {
        nom: null,
        prenom: null,
        photoUrl: null,
        email: null,
        isAdmin: false,
      },
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
            this.user.nom = response.data.nom;
            this.user.prenom = response.data.prenom;
            this.user.photoUrl = response.data.photoUrl;
            this.user.email = response.data.email;
            this.user.isAdmin = response.data.isAdmin;
            localStorage.setItem("user", JSON.stringify(this.user));
            let connectednav = document.getElementById("connectednav");
            connectednav.style.display = "initial";
            let connectnav = document.getElementById("connectnav");
            connectnav.style.display = "none";
            let profil = document.getElementById("profil");
            profil.style.display = "none";
            let accueil = document.getElementById("Accueil");
            accueil.style.display = "inline-block";
            this.loadprofil(this.user);
          }
        })
        .catch(function () {
          router.push("/");
          console.log("session a expirée");
        });
    },
    loadprofil(user) {
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.email = user.email;
      this.photoUrl = user.photoUrl;
      this.isAdmin = user.isAdmin;

      if (this.isAdmin) {
        const headers = {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          //'Content-Type': 'multipart/form-data'
        };
        axios
          .get("http://localhost:3000/api/auth/allusers", { headers })
          .then((response) => {
            this.users = response.data.users;
          })
          .catch(function () {
            router.push("/");
            console.log("session a expirée");
          });
      }
    },
    profiledit() {
      this.edit = true;
    },
    canceledit() {
      this.edit = false;
    },

    profilupdate(photoUrl) {
      let ths = this;
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      formData.append("nom", this.nom);
      formData.append("prenom", this.prenom);
      formData.append("mail", this.email);
      formData.append("image", this.file);
      formData.append("photoUrl", photoUrl);
      axios
        .put("http://localhost:3000/api/auth/update", formData, { headers })
        .then(() => {
          this.edit = false;
          this.showPreview = false;
          this.isConnected();
          ths.emailexist = false;
        })
        .catch(function () {
          ths.emailexist = true;
        });
    },
    profildisactivitebyadmin(user_Id) {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };

      axios
        .put("http://localhost:3000/api/auth/disactivite/" + user_Id, user_Id, {
          headers,
        })
        .then(() => {
          this.loadprofil(this.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    profilactivitebyadmin(user_Id) {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };

      axios
        .put("http://localhost:3000/api/auth/activite/" + user_Id, user_Id, {
          headers,
        })
        .then(() => {
          this.loadprofil(this.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    profildeletecomfirm() {
      this.confirm = true;
    },
    profildeletecancel() {
      this.confirm = false;
    },
    profildelete() {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };

      axios
        .delete("http://localhost:3000/api/auth/delete", { headers })
        .then(() => {
          let connectednav = document.getElementById("connectednav");
          connectednav.style.display = "none";
          let connectnav = document.getElementById("connectnav");
          connectnav.style.display = "initial";
          localStorage.clear();
          router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showPreviewImg(event) {
      if (event.target.files.length > 0) {
        this.create = true;
        var reader = new FileReader();
        reader.onload = function () {
          var output = document.getElementById("file-ip-1-preview");
          output.src = reader.result;
          output.style.display = "block";
        };
        reader.readAsDataURL(event.target.files[0]);
        this.file = event.target.files[0];
        this.showPreview = true;
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
  },
};
</script>
<style scoped>
.profil {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  margin: auto;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  margin-bottom: 20px;
  height: auto;
  text-align: left;
  background-color: #132644;
  padding: 10px;
  border-radius: 15px;
  color: white;
}
.user {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 56%;
  height: 100%;
  margin: auto;
  margin: 0px;
  height: auto;
  text-align: left;
  background-color: #132644;
  padding: 10px;
}
.user .userdata {
  width: 95%;
  color: #000000;
  font-size: 15px;
  font-weight: 800;
  margin-top: 10px;
  color: white;
  line-height: 52px;
}
.profil .userdata {
  width: 75%;
 
}
.btnedit {
  display: inline-block;
  text-decoration: none;
  background: #132644;
  width: 120px;
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
}
.profilphoto {
  width: 100%;
  height: 215px;
  box-shadow: rgb(0 0 0 / 50%) 0px 1px 20px;
  margin-bottom: 0px;
  margin-top: 20px;
  object-fit: cover;
}
#file-ip-1 {
  display: none;
}
.photo {
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-bottom: 20px;
  margin-left: 20px;
}
.labelbtn {
  width: 100%;
  margin-top: 0px;
  border-radius: 0px;
  box-shadow: rgb(255 255 255 / 50%) 0px 1px 20px;
}
.form-signin {
  width: 100%;
  background-color: #132644;
  padding: 0px;
}
.form-signin .form-control {
  width: 100%;
}
.photouser {
  width: 30px;
  height: 30px;
  border: 3px solid #8084b9;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  margin-right: 20px;
}
.title {
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
}
.title p {
  font-size: 20px;
}
.separator {
  max-width: 380px;
  margin-top: 10px;
  margin: auto;
  border: 1px solid #d1515a;
  box-shadow: inset rgb(255 255 255) 8px 0px 15px;
}
.comfirmation {
  background-color: red;
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  height: 150px;
  justify-content: center;
  border: 1px solid black;
  position: absolute;
margin-left: auto;
margin-right: auto;
top: 10px;
left: 0;
right: 0;
text-align: center;
box-shadow: inset rgb(255 255 255) 0px 0px 15px;
}
.comfirmation p{
  font-size: 20px;
}
.comfirmationbtn {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
}
 .btnupdate {
    margin: 2px;
  }
  .mr{
    margin: 2px;
  }
@media screen and (max-width: 600px) {
  .profil {
    width: 98%;
    border-radius: 0px;
  }
  .user {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
  .user .userdata {
    margin-right: 0px;
  }
  .btnupdate {
    margin: auto;
  }
  .profil .userdata {
    width: 100%;
    margin: auto;
}
  .mr{
    margin: 6px;
  }
}
</style>