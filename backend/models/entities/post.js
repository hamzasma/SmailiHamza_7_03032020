class Post{
    constructor (){

        this.Id=null
        this.text=null
        this.imageUrl=null
        this.videoUrl=null
        this.user_Id=null
        this.nom=null
        this.prenom=null
        this.userphotoUrl=null
        this.date=null
        this.edit=false
    }
    fromarray(array,edit){
        this.Id=array["Id"];
        this.text=array["text"];
        this.imageUrl=array["imageUrl"];
        this.videoUrl=array["videoUrl"];
        this.user_Id=array["user_Id"];
        this.nom=array["nom"];
        this.prenom=array["prenom"];
        this.userphotoUrl=array["userphotoUrl"];
        this.date=array["date"];
        this.edit=edit;
    }

}
module.exports = { Post }