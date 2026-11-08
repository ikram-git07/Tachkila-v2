const lemodal = document.querySelector("#mymdl");
const titreModal = document.querySelector("#titre-modal");
const btn = document.querySelector("#clik");
const sort = document.querySelector("#fermer");
const adversaire = document.querySelector("#adversaire");
const enregistrer = document.querySelector("#enregistrer");
const date = document.querySelector("#date");
const heure = document.querySelector("#heure");
const lieu = document.querySelector("#lieu");
const msg = document.querySelector("#msg");


const mdlScore = document.querySelector("#mdl-score");
const titreScore = document.querySelector("#titre-score");
const butsNous = document.querySelector("#buts-nous");
const butsEux = document.querySelector("#buts-eux");
const msgScore = document.querySelector("#msg-score");
const btnFermerScore = document.querySelector("#fermer-score");
const btnAnnulerScore = document.querySelector("#annuler-score");
const btnEnregistrerScore = document.querySelector("#enregistrer-score");
const annule = document.querySelector("#annuler");


const listeMatchs = document.querySelector("#liste");
const recherche = document.querySelector("#recherche");
const boutonsFiltre = document.querySelectorAll(".filter");
const nbTous = document.querySelector("#nb-tous");
const nbAvenir = document.querySelector("#nb-avenir");
const nbJoues = document.querySelector("#nb-joues");
const nomsMois = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];



let matchs = [];
let filtre = "tous";
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
    lemodal.classList.add("hidden");
    adversaire.value = "";
    date.value = "";
    heure.value = "";
    lieu.value = "";
    msg.textContent = "";
    document.querySelector('input[name="type"][value="Domicile"]').checked = true;
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
btnFermerScore.addEventListener("click",fermer_le_modal_score );
btnAnnulerScore.addEventListener("click", fermer_le_modal_score);

btnEnregistrerScore.addEventListener("click", function (){
    if (butsNous.value === "" || butsEux.value === ""){
        msgScore.textContent ="Entrez les deux scores";
        return;
    }
    matchs[indexScore].butsNous = Number(butsNous.value);
    matchs[indexScore].butsEux = Number(butsEux.value);

    sauvegarder();
    filtrer();
    fermer_le_modal_score();

});


function afficher(aff = matchs) {
    listeMatchs.innerHTML = "";

    for (let i = 0; i < aff.length; i++) {
        const m = aff[i];

       
        let titre = "Atlas FC vs " + m.adversaire;
        if (m.type === "Extérieur") {
            titre = m.adversaire + " vs Atlas FC";
        }

        let couleurType = "bg-green-900 text-green-400";
        if (m.type === "Extérieur") {
            couleurType = "bg-slate-700 text-slate-300";
        }

     
        const parties = m.date.split("-");
        const numero = parties[2];
        const mois = nomsMois[Number(parties[1]) - 1];

        // lpartie li f limn
        let droite = "";
        if (m.butsNous === null) {
            droite = `
                <button onclick="ouvrirScore(${m.id})" class="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer">
                    Saisir le score
                </button>`;
        } else {
            let score = m.butsNous + " – " + m.butsEux;
            if (m.type === "Extérieur") {
                score = m.butsEux + " – " + m.butsNous;
            }

            let natija = "Nul";
            let couleur = "text-slate-300";
            if (m.butsNous > m.butsEux) {
                natija = "Victoire";
                couleur = "text-green-400";
            }
            if (m.butsNous < m.butsEux) {
                natija = "Défaite";
                couleur = "text-red-400";
            }

            droite = `
                <span class="${couleur} text-3xl font-bold">${score}</span>
                <span class="${couleur} text-sm font-semibold">${natija}</span>
                <button onclick="ouvrirScore(${m.id})" class="text-slate-400 text-xs cursor-pointer hover:text-white">Modifier le score</button>`;
        }

        const carte = document.createElement("div");
        carte.className = "bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-wrap items-center gap-4 text-white";
        carte.innerHTML = `
            <div class="bg-slate-900 rounded-lg w-16 py-2 text-center">
                <p class="text-2xl font-bold">${numero}</p>
                <p class="text-xs uppercase">${mois}</p>
                <p class="text-xs text-slate-500">${m.heure}</p>
            </div>

            <div class="flex-1">
                <span class="${couleurType} text-xs font-semibold px-2 py-1 rounded">${m.type}</span>
                <h3 class="font-bold text-lg mt-1">${titre}</h3>
                <p class="text-slate-400 text-sm">📍 ${m.lieu}</p>
            </div>

            <div class="flex items-center gap-3">
                ${droite}
                <button onclick="modifier(${m.id})" class="cursor-pointer">✏️</button>
                <button onclick="supprimer(${m.id})" class="cursor-pointer">🗑️</button>
            </div>
        `;
        listeMatchs.appendChild(carte);
    }

    if (aff.length === 0) {
        listeMatchs.innerHTML = `<p class="text-slate-400 p-4">Aucun match trouvé.</p>`;
    }
}



function compter() {
    nbTous.textContent = matchs.length;
    nbAvenir.textContent = matchs.filter(m => m.butsNous === null).length;
    nbJoues.textContent = matchs.filter(m => m.butsNous !== null).length;
}

function filtrer() {
    compter();
    const texte = recherche.value.toLowerCase();

   
    let resultat = matchs.filter(m =>
        m.adversaire.toLowerCase().includes(texte));

   
    if (filtre === "avenir") {
        resultat = resultat.filter(m => m.butsNous === null);
    }
    if (filtre === "joues") {
        resultat = resultat.filter(m => m.butsNous !== null);
    }

    afficher(resultat);
}

recherche.addEventListener("input", filtrer);

document.querySelectorAll(".filter").forEach(b => {
    b.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(x =>
            x.classList.remove("bg-green-500"));
        b.classList.add("bg-green-500");

        filtre = b.dataset.filter;
        filtrer();
    });
});



filtrer();