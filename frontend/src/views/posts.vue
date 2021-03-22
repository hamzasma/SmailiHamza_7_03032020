<template>
  <div class="posts">
    <Createpost @newpost="loadposts()" />
    <span v-if="posts.length==0">Aucune publication!</span>
    <div
      v-for="post in posts"
      :key="post.Id"
      class="createpost"
      :class="{ mypost: post.edit }"
    >
      <Post :post="post" @newpost="loadposts()" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router/index";
import Post from "../components/post.vue";
import Createpost from "../components/createpost.vue";
import axios from "axios";
export default {
  name: "posts",
  components: {
    Post,
    Createpost,
  },
  props: {
    postcommentid: String,
    post: Number,
  },
  data: () => {
    return {
      posts: [],
    };
  },
  created: function () {
    this.isConnected();
    //method1 will execute at pageload
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
            let connectednav = document.getElementById("connectednav");
            connectednav.style.display = "initial";
            let connectnav = document.getElementById("connectnav");
            connectnav.style.display = "none";
            let profil=document.getElementById("profil");
            profil.style.display="inline-block";
            let accueil=document.getElementById("Accueil");
            accueil.style.display="none";
            router.push("post");
            this.loadposts();
          }
        })
        .catch(function (error) {
          console.log(error);
          router.push("/");
          console.log("session a expirée");
        });
    },
  
    loadposts() {
      const headers = {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        //'Content-Type': 'multipart/form-data'
      };

      axios
        .get(
          "http://localhost:3000/api/userpost/" +
            new URLSearchParams(window.location.search).get("id"),
          { headers }
        )
        .then((response) => {
          this.posts = response.data;
          if(this.posts.length==0)
          this.nopost=true;
        })
        .catch(function (error) {
          console.log(error.response.data.error);
        });
    },
  },
};
</script>
<style scoped>
.createpost {
  width: 100%;
  max-width: 800px;
  margin: auto;
  box-shadow: rgb(0 0 0 / 60%) 0px 1px 10px;
  margin-bottom: 20px;
  height: auto;
  text-align: left;
  background-color: #132644;
  padding: 10px;
  border-radius: 15px;
}
.posts{
  text-align: center;
}
.posts span{
 font-size: 20px;
}
.mypost {
  background-color: #020c1b;
}
@media screen and (max-width: 600px) {

.createpost {
   width: 98%;
    border-radius: 0px;
}
}
</style>