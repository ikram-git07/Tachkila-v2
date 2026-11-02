const lemodal = document.querySelector("#mymdl");
const btn = document.querySelector("#clik");
const sort = document.querySelector("#fermer")
const annule = document.querySelector("#annuler")


const ListeJoueurs = document.querySelector("#liste-joueurs")



btn.addEventListener("click", function () {
   lemodal.classList.remove("hidden")
   lemodal.classList.add("flex")



})
sort.addEventListener("click", function () {
   lemodal.classList.remove("flex")
   lemodal.classList.add("hidden")

})
annule.addEventListener("click", function () {
   lemodal.classList.remove("flex")
   lemodal.classList.add("hidden")

})


// c pour afficher le msg dereur si les champs vide
const ajout = document.querySelector("#ajouter")
let joueurs = [];
let indexmodif = null;
charger();
function sauvegarder() {
   localStorage.setItem("joueurs", JSON.stringify(joueurs));
}
function charger() {
   const donnees = localStorage.getItem("joueurs");
   if (donnees !== null) {
      joueurs = JSON.parse(donnees);
   }
}



function afficher() {
   ListeJoueurs.innerHTML = ` `;
   for (let i = 0; i < joueurs.length; i++) {
      const carte = document.createElement("div");
      carte.className = "bg-slate-500 border border-slate-900 rounded-xl p-4 w-full mt-3";
      carte.innerHTML = `
      <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
               <div class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center border border-amber-700">
                  <h2>${joueurs[i].numero}</h2>
                  </div>
                  <div>
                     <h4 class="text-white font-bold text-sm leading-light">${joueurs[i].nom}</h4>
                  <span class="text-slate-900 text-sm">${joueurs[i].poste}</span>
               </div>
               </div>
           
         </div >
         <select class="w-full bg-indigo-950 text-white text-xs border border-slate-700 p-2.5 cursor-pointer">
            <option value="" selected disabled>sur la banc </option>
            <option value="GB">GB - Gardien</option>
            <option value="DG">DG - Défenseur gauche</option>
            <option value="DC1">DC - Défenseur central 1</option>
            <option value="DC2">DC - Défenseur central 2</option>
            <option value="DD">DD - Défenseur droit</option>
            <option value="MG">MG - milieu gauche</option>
            <option value="MC">MC - Défenseur droit</option>
            <option value="MD">MD - milieu droit</option>
            <option value="BU">BU - Buteur 1</option>
            <option value="BU">BU - Buteur 2</option>
         </select>
      `;
      ListeJoueurs.appendChild(carte);
   }
}
afficher();



