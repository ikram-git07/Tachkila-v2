const lemodal = document.querySelector("#mymdl");
const btn = document.querySelector("#clik");
const sort = document.querySelector("#fermer")
const annule = document.querySelector("#annuler")

const nom = document.querySelector("#nom");
const nomMsg = document.querySelector("#nom-msg");
const numero = document.querySelector("#numero");
const numeroMsg = document.querySelector("#numero-msg");
const posteMsg = document.querySelector("#poste-msg")
const regexNom = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;
const regexNumero = /^(0?[1-9]|[1-9][0-9])$/;
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


// c pour ajour de nom de joueur
nom.addEventListener("input", function () {
   const valeur = nom.value.trim();
   const regex = /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)*$/;

   if (valeur === "") {
      nomMsg.textContent = "";
   } else if (!regex.test(valeur)) {
      nomMsg.textContent = "entrez le nom sans chiffres";
   } else {
      nomMsg.textContent = "";

   }
});


// c pour ajouter le num de joueur
numero.addEventListener("input", function () {
   const valeur = numero.value.trim();
   const regex = /^(0?[1-9]|[1-9][0-9])$/;

   if (valeur === "") {
      numeroMsg.textContent = "";
   } else if (!regex.test(valeur)) {

      numeroMsg.textContent = "Entrez un numéro entre 1 et 99";
   } else {
      numeroMsg.textContent = "";
   }
});
// c pour afficher le msg dereur si les champs vide
const ajout = document.querySelector("#ajouter")
let joueurs = [];
let indexmodif = null;
charger();
 function sauvegarder(){
   localStorage.setItem("joueurs", JSON.stringify(joueurs));
 }
 function charger(){
   const donnees = localStorage.getItem("joueurs");
   if (donnees !== null){
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
            <div class="flex items-center space-x-3 text-slate-400 text-sm">
               <button  onclick="modifier(${i})" class="cursor-pointer" >✏️</button>
               <button onclick="supprimer(${i})" class="cursor-pointer" >🗑️</button>
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





function ajouterJoueur() {
   const valeurNom = nom.value;
   const valeurNumero = numero.value;

   const poste = document.querySelector('input[name="poste"]:checked');

   if (valeurNom === "") {
      nomMsg.textContent = "Le nom de joueur est obligatoire";

   } else if (!regexNom.test(valeurNom)) {
      nomMsg.textContent = "Entrez un nom valide";

   } else {
      nomMsg.textContent = "";
   }
   if (valeurNumero === "") {
      numeroMsg.textContent = "le numero est obligatoire";

   } else if (!regexNumero.test(valeurNumero)) {
      numeroMsg.textContent = "Entrez un nbr entre 1 et 99";

   } else {
      numeroMsg.textContent = "";

   }
   if (poste === null) {
      posteMsg.textContent = "choisissez un poste";

   } else {
      posteMsg.textContent = "";
   }
   if (valeurNom === "" || !regexNom.test(valeurNom) || valeurNumero === "" || !regexNumero.test(valeurNumero) || poste === null) {
      return;
   }
   joueurs.push({
      nom: valeurNom,
      numero: valeurNumero,
      poste: poste.value
   });
   sauvegarder();
   afficher();

   nom.value = "";
   numero.value = "";
   poste.checked = false;
   lemodal.classList.remove("flex");
   lemodal.classList.add("hidden");

}
ajout.addEventListener("click", ajouterJoueur);


const mdl_modif = document.querySelector("#mdl_modif");
const fermer_modif = document.querySelector("#Fermer_modif");
const annuler_modif = document.querySelector("#annuler_modif");
const enregistrer = document.querySelector("#enregistrer");
const nom_modif = document.querySelector("#nom_modif");
const nom_modif_msg = document.querySelector("#nom_modif_msg");
const numero_modif = document.querySelector("#numero_modif");
const numero_modif_msg = document.querySelector("#numero_modif_msg");

function supprimer(i) {
   joueurs.splice(i, 1);
   sauvegarder();
   afficher();
}
function modifier(i) {
   indexmodif = i;
   nom_modif.value = joueurs[i].nom;
   numero_modif.value = joueurs[i].numero;
   document.querySelector('input[name="poste_modif"][value="' + joueurs[i].poste + '"]').checked = true;


   nom_modif_msg.textContent = "";
   numero_modif_msg.textContent = "";
   mdl_modif.classList.remove("hidden");
   mdl_modif.classList.add("flex");
}
function fermer_le_modal_modif() {
   mdl_modif.classList.remove("flex");
   mdl_modif.classList.add("hidden");
}
fermer_modif.addEventListener("click", fermer_le_modal_modif);
annuler_modif.addEventListener("click", fermer_le_modal_modif);

enregistrer.addEventListener("click", function () {
   const nouveau_nom = nom_modif.value.trim();
   const nouveau_numero = numero_modif.value.trim();
   const nouveau_poste = document.querySelector('input[name="poste_modif"]:checked');
   let valide = true;

   if (!regexNom.test(nouveau_nom)) {
      nom_modif_msg.textContent = "Entrez un nom valide";
      valide = false;

   } else {
      nom_modif_msg.textContent = "";

   }
   if (!regexNumero.test(nouveau_numero)) {
      numero_modif_msg.textContent = "Entrez un nbr entre 1 et 99";
      valide = false;
     
   } else {
      numero_modif_msg.textContent = "";
   }
   if (valide === false) {
      return;
   }
   joueurs[indexmodif].nom = nouveau_nom;
   joueurs[indexmodif].numero = nouveau_numero;
   joueurs[indexmodif].poste = nouveau_poste.value;
   sauvegarder();
   afficher();
   fermer_le_modal_modif();
});
afficher();



