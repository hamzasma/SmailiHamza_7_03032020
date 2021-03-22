<template>
  <div class="conteneurcreatepost">
    <div class="createpost">
      <button
        v-if="create"
        type="button"
        class="btn btnedit"
        v-on:click="cancelcreate"
      >
        Annuler
      </button>
      <textarea
        id="textarea"
        class="textarea scroll"
        :class="{ inputed: uninputed }"
        name="text"
        placeholder="Exprimez vous !"
        cols="30"
        rows="10"
        v-model="text"
        v-on:input="autosize()"
      ></textarea>
      <div id="preview">
        <img id="file-ip-1-preview" />
      </div>
      <div class="form-input">
        <label class="btn" for="file-ip-1">Ajouter une image</label>
        <input
          type="file"
          id="file-ip-1"
          accept="image/*"
          @change="showPreviewImg($event)"
        />
        <button type="button" class="btn btnpost" v-on:click="posted()">
          Publier  <i class="fas fa-paper-plane"></i>
        </button>
        
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "createpost",
  data: () => {
    return {
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
      textheigh: "",
      uninputed:false
    };
  },
  methods: {
    posted() {
        if(this.text=='' && this.file==''){
            this.uninputed=true;
        }
        else
      {const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      let user = JSON.parse(localStorage.getItem("user"));
      formData.append("text", this.text);
      formData.append("photoUrl", user.photoUrl);
      formData.append("nom", user.nom);
      formData.append("prenom", user.prenom);
      formData.append("user_Id", "");

      formData.append("image", this.file);
      axios
        .post("http://localhost:3000/api/userpost/", formData, { headers })
        .then(() => {
          this.text = "";
          this.file = null;
          var outputcontenair = document.getElementById("preview");
          outputcontenair.style.display = "none";
          this.$emit("newpost");
        this.create = false;
        })
        .catch(function (error) {
          console.log(error)
        });}
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
        this.uninputed=false;
      }
    },
     cancelcreate() {
      this.text = "";
      this.file = "";
      var outputcontenair = document.getElementById("preview");
      outputcontenair.style.display = "none";
      this.create = false;
    },
    autosize() {
        this.uninputed=false;
        this.create = true;
      var textarea = document.querySelector("textarea");
      setTimeout(function () {
        textarea.style.cssText = "height:100px; padding:0";
        let height = textarea.scrollHeight + 10;
        textarea.style.cssText = "height:" + height + "px";
      }, 0);
    },
  },
};
</script>
<style scoped>
.btnpost {
    width: 122px;
}
.form-input label {
 
    width: 151px;
    margin-right: 10px;
   
}
.btnpost:hover{
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}
.form-input label:hover{
    text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
transition: all 0.4s ease 0s;
}
.btnedit {
    width: 120px;
}
.inputed{
    background-color: red;
    color: white;
 animation: mymove 2s forwards;
}
#file-ip-1{
    display: none;
}
@keyframes mymove {
  from {background-color: red;}
  to {background-color: white;}
}
</style>