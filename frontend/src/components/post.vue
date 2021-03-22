<template>
  <div>
    <div v-if="post.edit" class="conteneur">
      <div v-if="confirm" class="comfirmation">
        <p>Êtes-vous sûr de vouloir supprimer la publication ?</p>
        <div class="comfirmationbtn">
          <button
            type="button"
            class="btn btnupdate"
            v-on:click="deletepost(post.Id, post.imageUrl)"
          >
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
      <div class="Profildata">
        <img :src="post.userphotoUrl" alt="photouser" class="photouser" />
        <p class="name">{{ post.nom }} {{ post.prenom }}</p>
        <button
          v-if="show"
          type="button"
          class="btn btn-primary btnedit"
          v-on:click="postedit(post)"
        >
          Modifier
          <i class="fas fa-edit"></i>
        </button>
        <button
          v-if="!show && postid == post.Id"
          type="button"
          class="btn btn-primary btnedit"
          v-on:click="cancel(post)"
        >
          Annuler
          <i class="fas fa-window-close"></i>
        </button>
      </div>
      <div v-if="post.text != ''" class="separator"></div>
      <textarea
        v-if="!show"
        id="textareaedit"
        class="textarea scroll"
        name="text"
        placeholder="Exprimez vous !"
        cols="30"
        rows="10"
        ref="textareaedit"
        v-model="textedit"
        v-on:input="autosize($el)"
      ></textarea>
      <p v-if="postid != post.Id" class="posttext">{{ post.text }}</p>
      <div v-if="post.text != ''" class="separator"></div>
      <div v-if="showPreview && post.edit" id="previewedited">
        <img id="postimage" class="postimage" />
      </div>
      <img
        v-if="post.imageUrl != null && !showPreview && post.edit"
        :src="post.imageUrl"
        alt="postimage"
        class="postimage"
      />
      <div v-if="!show" class="form-input">
        <label class="btn" for="fileedited-ip-1">Modifier l'image</label>
        <input
          type="file"
          id="fileedited-ip-1"
          accept="image/*"
          @change="showPreviewedited"
        />
        <button
          type="button"
          class="btn btn-primary btnupdate"
          v-on:click="updatepost(post.Id, post.imageUrl)"
        >
          Enregistrer
          <i class="fas fa-save"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary btnpostdlt"
          v-on:click="profildeletecomfirm()"
        >
          Supprimer <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <div v-if="!post.edit" class="conteneur">
      <div class="Profildataa">
        <img :src="post.userphotoUrl" alt="photouser" class="photouser" />
        <p class="name">{{ post.nom }} {{ post.prenom }}</p>
      </div>
      <div v-if="post.text != ''" class="separator"></div>
      <p class="posttext">{{ post.text }}</p>
      <div v-if="post.text != ''" class="separator"></div>
      <img
        v-if="post.imageUrl != null"
        :src="post.imageUrl"
        alt="postimage"
        class="postimage"
      />
    </div>
    <p class="date">Publier le {{ post.date }}</p>
    <div class="addcomment">
      <textarea
        class="commenttext scroll"
        :class="{ inputed: uninputed }"
        name="commenttext"
        v-model="commenttext"
        placeholder="Exprimez vous !"
        cols="30"
        rows="10"
      ></textarea>
      <button
        type="button"
        class="btn btncomment"
        v-on:click="commented(post.Id)"
      >
        Commenter
        <i class="far fa-comment-alt"></i>
      </button>
    </div>
    <div class="createcomment">
      <div v-for="comment in comments" :key="comment.Id">
        <div v-if="comment.post_Id == post.Id">
          <div class="Profildatacomment">
            <div class="profilcomment">
              <img
                :src="comment.userphotoUrl"
                alt="photouser"
                class="photousercomment"
              />
              <p>{{ comment.nom }} {{ comment.prenom }}</p>
            </div>

            <span class="comment">
              <p>
                {{ comment.text }}
              </p>

              <button
                v-if="comment.edit"
                type="button"
                class="btncmtdlt"
                v-on:click="deletecomment(comment.Id)"
                title="Supprimer le commentaire"
              >
                <i class="fas fa-trash"></i>
              </button>
              <p class="date">Commenter le {{ comment.date }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "post",
  components: {},
  props: {
    post: Object,
    comment: Object,
  },
  data: () => {
    return {
      posts: [],
      comments: [],
      text: "",
      textedit: "",
      user_Id: "",
      file: "",
      fileedit: "",
      edit: false,
      postid: "",
      show: true,
      showPreview: false,
      commenttext: "",
      postcommentid: "",
      create: false,
      uninputed: false,
      confirm: false,
      classObjet: {
        height: "10px",
      },
      isActive: false,
    };
  },
  created: function () {
    this.getAllcomment();
  },

  methods: {
    autosize() {
      this.create = true;
      var textarea = document.getElementById("textareaedit");
      setTimeout(function () {
        textarea.style.cssText = "height:100px; padding:0";
        let height = textarea.scrollHeight + 10;
        textarea.style.cssText = "height:" + height + "px";
      }, 0);
    },
    cancelcreate() {
      this.text = "";
      this.file = null;
      var outputcontenair = document.getElementById("preview");
      outputcontenair.style.display = "none";
      this.create = false;
    },

    showPreviewImg(event) {
      if (event.target.files.length > 0) {
        this.create = true;
        var reader = new FileReader();
        reader.onload = function () {
          var output = document.getElementById("file-ip-1-preview");
          var outputcontenair = document.getElementById("preview");
          output.src = reader.result;
          output.style.display = "block";
          outputcontenair.style.display = "block";
        };
        reader.readAsDataURL(event.target.files[0]);
        this.file = event.target.files[0];
      }
    },
    postedit(post) {
      this.edit = true;
      this.postid = post.Id;
      this.textedit = post.text;
      this.fileedit = post.imageUrl;
      this.show = false;
    },
    cancel() {
      this.edit = true;
      this.postid = "";
      this.textedit = "";
      this.fileedit = "";
      this.show = true;
      this.confirm = false;
    },
    profildeletecomfirm() {
      this.confirm = true;
    },
    profildeletecancel() {
      this.confirm = false;
    },
    updatepost(Id, imageUrl) {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      formData.append("text", this.textedit);
      formData.append("image", this.fileedit);
      formData.append("imageUrl", imageUrl);
      axios
        .put("http://localhost:3000/api/userpost/" + Id, formData, { headers })
        .then(() => {
          this.text = "";
          this.show = true;
          this.postid = "";
          this.fileedit = "";
          this.showPreview = false;
          this.$emit("newpost");
        })
        .catch(function (error) {
          if (error.status == 401) console.log(error.status);
        });
    },
    deletepost(Id, imageUrl) {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      axios
        .delete("http://localhost:3000/api/userpost/" + Id, { headers })
        .then(() => {
          this.text = "";
          this.show = true;
          this.postid = "";
          this.$emit("newpost");
         this.confirm = false;
        })
        .catch(function (error) {
          if (error.status == 401) console.log(error.status);
        });
    },
    showPreviewedited(event) {
      if (event.target.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function () {
          var outputcontenair = document.getElementById("previewedited");
          var output = document.getElementById("postimage");
          output.src = reader.result;
          output.style.display = "block";
          outputcontenair.style.display = "block";
        };
        reader.readAsDataURL(event.target.files[0]);
        this.fileedit = event.target.files[0];
        this.showPreview = true;
      }
    },
    addcomment(post_Id) {
      this.commenttext = "";
      this.text = "";
      this.postcommentid = "";
      this.postcommentid = post_Id;
    },
    commented(post_Id) {
      if (this.commenttext == "") {
        this.uninputed = true;
      } else {
        const headers = {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          //'Content-Type': 'multipart/form-data'
        };
        let user = JSON.parse(localStorage.getItem("user"));
        const formData = new FormData();
        formData.append("text", this.commenttext);
        formData.append("post_Id", post_Id);
        formData.append("nom", user.nom);
        formData.append("prenom", user.prenom);
        formData.append("photoUrl", user.photoUrl);
        formData.append(
          "user_Id",
          new URLSearchParams(window.location.search).get("id")
        );
        axios
          .post("http://localhost:3000/api/comment/", formData, { headers })
          .then(() => {
            this.commenttext = "";
            this.getAllcomment();
            this.postcommentid = "";
          })
          .catch(function (error) {
            if (error.status == 401) console.log(error.status);
          });
      }
    },
    getAllcomment() {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      axios
        .get("http://localhost:3000/api/comment/", { headers })
        .then((response) => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
        console.log(error.response.data.error);
        });
    },
    deletecomment(Id) {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      axios
        .delete("http://localhost:3000/api/comment/" + Id, { headers })
        .then(() => {
          this.getAllcomment();
          this.$emit("newpost");
        })
        .catch(function (error) {
         console.log(error.response.data.error);
        });
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Xanh+Mono:ital@1&display=swap");
.conteneur {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
.Profildata {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.Profildataa {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.Profildatacomment {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
}
.photouser {
  width: 60px;
  height: 60px;
  border: 3px solid #8084b9;
  border-radius: 30%;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  object-fit: cover;
}
.profilcomment {
  display: flex;
  flex-direction: column;
}
.profilcomment p {
  text-align: center;
  color: white;
}
.photousercomment {
  width: 50px;
  height: 50px;
  border: 3px solid #8084b9;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  object-fit: cover;
}
.comment {
  width: 900%;
  background-color: #2c4d83;
  border-bottom-left-radius: 14px 20px;
  border-bottom-right-radius: 14px 20px;
  border-top-right-radius: 14px 20px;
  border-top-left-radius: 14px 20px;
  margin: 0px;
  margin-top: 5px;
  padding: 10px;
  padding-left: 20px;
  margin-left: 10px;
  border: 3px solid #cfd6c7;
  box-shadow: inset rgb(255 255 255) 8px 0px 15px;
  padding-right: 20px;
  color: rgb(255, 251, 251);
  text-align: end;
}
p {
  text-align: start;
}

.name {
  color: #ebedff;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  font-weight: 800;
  margin-top: 18px;
  margin-left: 15px;
  width: 85%;
}
.createpost {
  box-shadow: rgb(0 0 0 / 40%) 0px 1px 10px;
  margin-bottom: 20px;
  height: auto;
  text-align: left;
  background-color: rgb(234 243 255);
}
.posttext {
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  margin-top: 10px;
  padding-left: 10px;
}
.btnedit {
  width: 120px;
}
.btnupdate {
  width: 120px;
}
.btnpostdlt {
  background: #d1515a;
  width: 105px;
  margin-left: 10px;
}


.postimage {
  width: 100%;
  height: auto;
  box-shadow: rgb(0 0 0 / 50%) 0px 1px 20px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.active {
  background: green;
}
.addcomment {
  margin: auto;
  padding: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  background-color: #2c4d83;
  margin-top: 2px;
  margin-bottom: 2px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.btncomment {
  width: 120px;
  text-align: center;
}
.btncomment:hover {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
.form-input-edit {
  width: 100%;
  background: rgb(234 243 255);
  margin: auto;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.separator {
  margin-top: 10px;
  border: 1px solid #d1515a;
  box-shadow: inset rgb(255 255 255) 8px 0px 15px;
}
.date {
  font-family: "Xanh Mono";
  padding-left: 10px;
  font-weight: bold;
  text-align: end;
  padding-right: 10px;
  padding-top: 10px;
  color: white;
  font-size: 10px;
}
.form-input {
  background-color: #132644;
}

.form-input label {
  width: 151px;
  margin-right: 10px;
}
.form-input label:hover {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  transition: all 0.4s ease 0s;
}
.btncmtdlt {
  background: none;
  color: #ff0000;
  border: none;
}
.btncmtdlt:hover {
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
  animation: mymove 1s infinite;
}
.inputed {
  background-color: red;
  color: white;
  animation: mymove1 2s forwards;
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
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  top: 30px;
  left: 0;
  right: 0;
  text-align: center;
  box-shadow: inset rgb(255 255 255) 0px 0px 15px;
}
.comfirmation p {
  font-size: 20px;
  text-align: center;
}
.comfirmationbtn {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
}
.comfirmationbtn button{
  margin: 2px;
}
@keyframes mymove1 {
  from {
    background-color: red;
  }
  to {
    background-color: white;
  }
}
@keyframes mymove {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(-90deg);
  }
  75% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}
@media screen and (max-width: 600px) {
  .btnedit {
    width: 135px;
  }
  .btnpostdlt {
    width: 115px;
    margin-left: 5px;
    box-shadow: rgb(255 255 255 / 60%) 0px 0px 10px;
  }
}
</style>