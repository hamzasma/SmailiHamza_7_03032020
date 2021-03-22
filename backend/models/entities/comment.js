class Comment{
    constructor (){

        this.Id=null
        this.text=null
        this.user_Id=null
        this.post_Id=null
         this.nom=null
        this.prenom=null
        this.userphotoUrl=null
        this.date=null
        this.edit=false
     
    }
    fromarray(array,edit){
        this.Id=array["Id"];
        this.text=array["text"];
        this.user_Id=array["user_Id"];
        this.post_Id=array["post_Id"];
         this.nom=array["nom"];
        this.prenom=array["prenom"];
        this.userphotoUrl=array["userphotoUrl"];
        this.date=array["date"];
        this.edit=edit;
    }

}
module.exports = { Comment }