const lemodal = document.querySelector("#mymdl");
const titreModal = document.querySelector("#titre-modal");
const btn = document.querySelector("#click");
const sort = document.querySelector("#fermer");
const adversaire = document.querySelector("#adversaire");
const enregistrer = document.querySelector("#enregistrer");
const date = document.querySelector("#date");
const heure = document.querySelector("#heure");
const lieu = document.querySelector("lieu");
const msg = document.querySelector("#msg");


const mdlScore = document.querySelector("#mdl-score");
const titreScore = document.querySelector("#titre-score");
const butsNous = document.querySelector("#buts-nous");
const butsEux = document.querySelector("#buts-eux");
const msgScore = document.querySelector("#msg-score");
const btnFermerScore = document.querySelector("#fermer-score");
const btnAnnulerScore = document.querySelector("#annuler-score");
const btnEnregistrerScore = document.querySelector("#enregistrer-score");



const listeMatchs = document.querySelector("#liste");
const recherche = document.querySelector("#recherche");
// const boutonsFiltre = document.querySelectorAll(".filter");
const nbTous = document.querySelector("#nb-tous");
const nbAvenir = document.querySelector("#nb-avenir");
const nbJoues = document.querySelector("#nb-joues");
const nomsMois = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];



let matchs = [];
let filter = "tous";
let indexModif = null;
let indexScore = null;
charger();


function sauvegarder() {
    localStorage.setItem("matchs", JSON.stringify(matchs));
}
function charger() {
    const donnees = localStorage.getItem("matchs");
    if (donnees !== null) {
        matchs = JSON.parse(donnees);

    }
    for (let i = 0; i < matchs.length; i++) {
        if (matchs[i].id === undefined) {
            matchs[i].id = Date.now() + i;
        }

    }
}

btn.addEventListener("click", function () {
    indexModif = null;
    titreModal.textContent = "Ajouter un match "
    lemodal.classList.remove("hidden");
    lemodal.classList.add("flex");
});





function fermer_le_modal() {
    lemodal.classList.remove("flex");
    lemodal.classList.add("flex");
    adversaire.value = "";
    date.value = "";
    heure.value = "";
    lieu.value = "";
    msg.textContent = "";
    document.querySelector('input[name="type"][value="Domicile"]').chacked = true;
}

sort.addEventListener("click", fermer_le_modal);
annule.addEventListener("click", fermer_le_modal);





enregistrer.addEventListener("click", function () {
    const type = document.querySelector('input[name="type"]:checked').value;

    if (adversaire.value === "" || date.value === "" || heure.value === "" || lieu.value === "") {
        msg.textContent = "Remplissez tous les champs";
        return;
    }

    if (indexModif === null) {
        matchs.push({
            id: Date.now(),
            adversaire: adversaire.value,
            date: date.value,
            heure: heure.value,
            lieu: lieu.value,
            type: type,
            butsNous: null,
            butsEux: null
        });
    } else {
        matchs[indexModif].adversaire = adversaire.value;
        matchs[indexModif].date = date.value;
        matchs[indexModif].heure = heure.value;
        matchs[indexModif].lieu = lieu.value;
        matchs[indexModif].type = type;
    }
    sauvegarder();
    filtrer();
    fermer_le_modal();
});



function modifier(id) {
    const i =matchs.findIndex(m => m.id === id);
    indexModif = i;
    adversaire.value = matchs[i].adversaire;
    date.value = matchs[i].date;
    heure.value =matchs[i].heure;
    lieu.value =matchs[i].lieu;
    document.querySelector('input[name="type"][value="' + matchs[i].type + '"]').checked = true;
    msg.textContent ="";
    titreModal.textContent ="Modifier le match";
    lemodal.classList.remove("hidden");
    lemodal.classList.add("flex");
}

function supprimer(id) {
    const i = matchs.findIndex(m => m.id === id);
    matchs.splice(i, 1);
    sauvegarder();
    filtrer();

}

function ouvrirScore(id) {
    const i =matchs.findIndex(m => m.id === id);
    indexScore = i;
    titreScore.textContent = "Atlas FC vs " + matchs[i].adversaire;
    msgScore.textContent="";

    if (matchs[i].butsNous === null){

        butsNous.value = "";
        butsEux.value = "";

    }else{
        butsNous.value =matchs[i].butsNous;

        butsEux.value =matchs[i].butsEux;
    }
    mdlScore.classList.remove("hidden");
    mdlScore.classList.add("flex");

}

function fermer_le_modal_score(){
    mdlScore.classList.remove("flex");
    mdlScore.classList.add("hidden");
}
fermer_le_modal_score.addEventListener("click",fermer_le_modal_score );
btnAnnulerScore.addEventListener("click", fermer_le_modal_score);

btnEnregistrerScore.addEventListener("click", function (){
    if (butsNous.value === || butsEux.value === ""){
        msgScore.textContent ="Entrez les deux scores";
        return;
    }
    matchs[indexScore].butsNous = Number(butsNous.value);
    matchs[indexModif].butsEux = Number(butsEux.value);

    sauvegarder();
    filter();
    fermer_le_modal_score();

});


function afficher(aff = matchs) {
    listeMatchs.innerHTML = "";

    for (let i =0; i<aff.length; i++){
        const m = aff[i];
        
    }
}