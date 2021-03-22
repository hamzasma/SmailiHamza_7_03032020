class User{
    constructor (){

        this.Id=null
        this.nom=null
        this.prenom=null
        this.email=null
        this.password=null
        this.photoUrl=null
        this.isAdmin=null
        this.isActivate=null
    }
    fromarray(array){
        this.Id=array["Id"];
        this.nom=array["nom"];
        this.prenom=array["prenom"];
        this.email=array["mail"];
        this.password=array["password"];
        this.photoUrl=array["photoUrl"];
        this.isAdmin=array["isAdmin"];
        this.isActivate=array["isActivate"];
    }

}
module.exports = { User }