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
   for (let i = 0; i < joueurs.length; i++) {
      if (joueurs[i].id === undefined) {
         joueurs[i].id = Date.now() + i;
      }
   }
}
const cases = [
   { poste: "GB", id: "gardien" },
   { poste: "DG", id: "jr1" },
   { poste: "DC1", id: "jr2" },
   { poste: "DC2", id: "jr3" },
   { poste: "DD", id: "jr4" },
   { poste: "MG", id: "jr5" },
   { poste: "MC1", id: "jr6" },
   { poste: "MC2", id: "jr7" },
   { poste: "MD", id: "jr8" },
   { poste: "BU1", id: "jr9" },
   { poste: "BU2", id: "jr10" }
];
function estPris(poste, idJoueur) {
   for (let j = 0; j < joueurs.length; j++) {
      if (joueurs[j].position === poste && joueurs[j].id !== idJoueur) {
         return true;
      }
   }
   return false;
}
function placer(id, poste) {
   if (poste !== "") {
      for (let i = 0; i < joueurs.length; i++) {
         if (joueurs[i].position === poste) {
            joueurs[i].position = "";
         }
      }
   }
   for (let i = 0; i < joueurs.length; i++) {
      if (joueurs[i].id === id) {
         joueurs[i].position = poste;
      }
   }
   sauvegarder();
   afficher();
}
function afficherTerrain() {
   for (let i = 0; i < cases.length; i++) {
      const p = document.querySelector("#" + cases[i].id).querySelector("p");
      p.textContent = "Libre"
      for (let j = 0; j < joueurs.length; j++) {
         if (joueurs[j].position === cases[i].poste) {
            p.textContent = joueurs[j].nom;
         }
      }
   }
}


function afficher() {
   ListeJoueurs.innerHTML = ` `;
   for (let i = 0; i < joueurs.length; i++) {

      let optionGB = `<option value="GB">GB - Gardien</option>`;
      if (estPris("GB", joueurs[i].id)) {
         optionGB = `<option value="GB" disabled>GB - Gardien (déjà pris)</option>`;
      }

      let choix = "";

      if (joueurs[i].etat === "Blessé") {
         choix = `<p class="text-red-400 text-sm font-semibold">Blessé</p>`;
      } else {
         choix = `
   <select onchange="placer(${joueurs[i].id}, this.value)" class="w-full bg-indigo-950 text-white text-xs border border-slate-700 p-2.5 cursor-pointer">
      <option value="" selected>sur le banc</option>
      ${optionGB}
      <option value="DG">DG - Défenseur gauche</option>
      <option value="DC1">DC - Défenseur central 1</option>
      <option value="DC2">DC - Défenseur central 2</option>
      <option value="DD">DD - Défenseur droit</option>
      <option value="MG">MG - Milieu gauche</option>
      <option value="MC1">MC - Milieu central 1</option>
      <option value="MC2">MC - Milieu central 2</option>
      <option value="MD">MD - Milieu droit</option>
      <option value="BU1">BU - Buteur 1</option>
      <option value="BU2">BU - Buteur 2</option>
   </select>`;
      }
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
       ${choix}
      `;
      ListeJoueurs.appendChild(carte);
      const select = carte.querySelector("select");
      if (select !== null && joueurs[i].position !== undefined) {
         select.value = joueurs[i].position;
      }
   }
   afficherTerrain();
}
afficher();



