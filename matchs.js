const recherche =document.querySelector("#recherche"); 
 function recherchetfilter (e) {
    const inpt = e.target.value 
    const filterJoueur =joueurs.filter(jr =>  jr.nom.ToLowerCase().includes(inpt.ToLowerCase()

))
return filterJoueur

}
afficher();
recherche.addEventListener("input", (e) =>{
    recherchetfilter(e);
})

