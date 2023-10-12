// DEFINIAMO I TASK PER RAGGIUNGERE L'OBBIETTIVO DI CREAZIONE CALENDARIO DINAMICO

// 1) cercare di capire quante celle creare per il mese corrente ( da considerare gli anni bisestili ) ✅

// 2) una volta estratto il NUMERO di giorni in questo mese dovremo generare lo stesso numero di celle nel calendario ✅

// 3) visualizzare il nome del mese corretto nell'h1✅

// 4) il giorno corrente dovrebbe "illuminarsi"✅

// _____________________________________________________________________________________________________________________

// rispondere agli eventi:

// 5) quando clicchiamo una cella dovrà selezionarsi il giorno (con un bordo colorato)✅

// 6) il meeting day dovrà acquisire il numero del giorno cliccato✅

// 7) trovare il modo di leggere i due campi input e salvare un appuntamento con ora e testo per il giorno precedentemente selezionato

// 8) riuscire a tornare a visualizzare appuntamenti precedenti salvati per uno specifico giorno

const appointments = [];

/* 
    [   [], [], [], [], [], [], [], 
        [], [], [], [], [], [], [],
        [], [], [], [], [], [], [],
        [], [], [], [], [], [], [],
        [], [], []
    ]
*/

const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre"
];

const now = new Date();

const daysInThisMonth = () => {
  const getYear = now.getFullYear(); // 2023
  const getMonth = now.getMonth(); // 9 per Ottobre
  // il metodo getMonth() ritorna l'indice numerico del mese in corso, partendo da 0 per Gennaio
  // a noi serve l'ULTIMO giorno del mese CORRENTE
  // perché quel numero corrisponde esattamente al numero di giorni totali del mese

  // per ottenere l'ultimo giorno del mese corrente, si passa al mese prossimo per poi chiedere il giorno 0 che è l'ultimo del mese precedente

  const lastDayOfThisMonthDate = new Date(getYear, getMonth + 1, 0); // abbiamo ottenuto l'ultimo giorno del mese corrente! per ottobre è 31
  const lastDayOfThisMonth = lastDayOfThisMonthDate.getDate();

  return lastDayOfThisMonth;
};

const unselectPreviousDays = () => {
  // funzione chiamata dentro createDays() in dayCellDiv.onclick
  const previouslySelectedDay = document.querySelector(".selected"); // torna il NODO dell'elemento con la classe, oppure null se non ne trova

  if (previouslySelectedDay) {
    // finiamo qui se il mio click non è il primo della pagina e c'è già un precedente selected...
    previouslySelectedDay.classList.remove("selected"); // rimuovo la classe all'elemento trovato
  }
};

const changeDayNumber = dayIndex => {
  // questa funzione si occuperà di cambiare il testo nello span con id "newMeetingDay"
  // con l'indice della cella che abbiamo cliccato + 1, per avere un numero in base 1 corrispondente al numero della cella
  // selezioniamo lo span
  const dayNumberSpan = document.getElementById("newMeetingDay");
  dayNumberSpan.innerText = dayIndex + 1;
  dayNumberSpan.classList.add("hasDay"); // dà uno stile più carino al numero una volta cambiato il testo
};

const createDays = function (days) {
  // funzione richiamata a fondo pagina al caricamento della pagina nel browser
  const calendar = document.getElementById("calendar"); // riferimendo al div del calendario

  for (let i = 0; i < days; i++) {
    // utilizziamo questo ciclo per eseguire qualcosa un tot numero di volte === al numero in "days"
    appointments.push([]); // inseriamo nell'array principale i sotto array che ci rappresentano i giorni (un cassetto per ogni giorno)
    // saranno array inizialmente vuoti che aspetteranno di ricevere le stringhe degli appuntamenti man mano che verranno creati
    const dayCellDiv = document.createElement("div"); // creo un nuovo div
    // <div></div>
    dayCellDiv.classList.add("day"); // gli do la classe per lo stile (visualizzarne 7 per linea e altri stili)
    // <div class="day"></div>

    const dayCellContent = document.createElement("h3"); // creo h3
    // <h3></h3>
    dayCellContent.innerText = i + 1; // aggiungo il numero del giorno

    // Coloriamo la cella del giorno di oggi! (dinamicamente)
    // lo facciamo al momento della creazione della cella + contenuto stessi
    // si poteva fare una selezione A POSTERIORI, ma è meno pratico:
    // vedi commento in DOMContentLoaded
    const today = now.getDate(); // leggo il valore ritornato dal chiedere all'oggetto now che giorno del mese è oggi
    // i + 1 mi darà 12 + 1 = 13, se oggi è 13 ci sarà corrispondenza..
    if (i + 1 === today) {
      // e finiremo qui, andando a colorare il giorno di oggi, che cambierà ad ogni prossimo giorno
      dayCellContent.classList.add("color-epic");
    }
    dayCellDiv.appendChild(dayCellContent);

    // su OGNI cella del calendario agganciamo un eventListener, una funzione, per tutti diversa che quando clicchiamo la cella verrà eseguita
    dayCellDiv.onclick = function (e) {
      console.log("Hai cliccato la cella numero: ", i + 1);
      // currentTarget rappresenta SEMPRE il NODO del proprietario dell'evento, che riceveremo dopo il click sull'elemento stesso
      // non ci restituisce mai un figlio, come potenzialmente può fare un e.target
      unselectPreviousDays(); // deseleziona eventuali elementi selezionati al precedente click

      e.currentTarget.classList.add("selected"); // applica un bordo viola alla cella corrente

      changeDayNumber(i); // cambia il numero in meetingDay in basso (nella zona degli appuntamenti)

      console.log("appuntamenti per " + (i + 1), appointments[i]);

      // controlla se ci sono appuntamenti nello stesso spazio corrispondente al giorno, tramite lo stesso indice che l'ha generato: appointments[i]
      if (appointments[i].length > 0) {
        // siamo qui se l'array del giorno cliccato ha elementi (stringhe)
        showAppointments(i);
      } else {
        // siamo qui se l'array del giorno cliccato NON HA elementi
        // in tal caso nascondiamo di nuovo la sezione appointments
        const appointmentsContainer = document.getElementById("appointments");
        appointmentsContainer.style.display = "none";
      }
    };

    calendar.appendChild(dayCellDiv);
  }

  console.log("appointments array", appointments);
};

const printCurrentMonthInH1 = () => {
  const title = document.querySelector("h1"); // seleziono l'h1

  const monthIndex = now.getMonth(); // indice del mese corrente, partendo da 0, questo mese ci darà 9
  const currentMonthName = monthNames[monthIndex]; // oggi dà Ottobre, la stringa contenuta nell'array dei nomi dei mesi: monthNames
  title.innerText = currentMonthName;
};

const showAppointments = function (dayPosition) {
  // questa funzione si occuperà di:
  // - prelevare gli appuntamenti (stringhe) dallo spazio dello scaffale del giorno corrispondente: dayPosition
  const dayAppointments = appointments[dayPosition]; // selezioniamo l'array del giorno con stringhe di appuntamenti all'interno

  const ulAppointments = document.getElementById("appointmentsList"); // riferimento al contenitore della lista <ul>
  ulAppointments.innerHTML = ""; // puliamo il contenuto della lista prima di ogni nuovo inserimento di nuovi li

  // e creo tanti <li> quante stringhe ci sono nell'array del giorno: appointments[dayPosition]
  dayAppointments.forEach(appointmentStr => {
    const newLi = document.createElement("li");
    newLi.innerText = appointmentStr;
    ulAppointments.appendChild(newLi); // inseriamo i <li> in <ul>
  });
  // dovrà togliere il display: none; dal div relativo agli appuntamenti
  const appointmentsContainer = document.getElementById("appointments");
  appointmentsContainer.style.display = "block";
};

const saveMeeting = e => {
  e.preventDefault(); // senza questo la pagina si ricaricherà ogni volta che si preme il bottone con type="submit"

  // a questo punto siamo liberi di selezionare i dati che ci servono da salvare
  const meetingTime = document.getElementById("newMeetingTime"); // reference all'input type time
  const meetingName = document.getElementById("newMeetingName"); // reference all'input type text
  const selectedDay = document.getElementById("newMeetingDay").innerText; // prendo il numero del giorno dallo span (è uguale al numero della cella)
  const dayIndex = parseInt(selectedDay) - 1; // // lo converto a numero e lo trasformo in un indice in base 0 da usare con un array
  // se giorno 25 avremo indice 24

  const meetingString = meetingTime.value + " — " + meetingName.value; // mi compongo la stringa con i valori dei due input

  // pusho nell'array corrispondente al giorno che è uno dei sotto-array di "appointments" precedentemente creato (vedi in cima alla pagina)
  appointments[dayIndex].push(meetingString); // stiamo salvando l'appuntamento appena creato nella posizione corrispondente al giorno cliccato (selectedDay)
  // usiamo quindi l'indice estratto dal testo dello span del meetingDay per selezionare un sotto-array di un array che li contiene tutti

  console.log(appointments);

  // vogliamo attivare la sezione che visualizza gli appuntamenti
  showAppointments(dayIndex); // abilito la sezione appuntamenti passando l'indice del giorno di cui visualizzeremo in basso gli appuntamenti

  // resettiamo i campi del form per evitare un'inserimento accidentale degli stessi dati
  meetingTime.value = "";
  meetingName.value = "";
};

// al caricamento della pagina, si scopre quanti giorni ha il mese corrente, lo si estrae e si passa il numero di giorni come argomento di createDays
// createDays è una funzione che se chiamata genera nel calendario il numero di celle necessarie
window.addEventListener("DOMContentLoaded", () => {
  const numberOfDays = daysInThisMonth(); // estraggo dalla funzione daysInThisMonth un valore numerico che passerò a createDays
  createDays(numberOfDays); // eseguo il loop e l'assegnazione degli onclick agli elementi, con altri annessi e connessi :)

  printCurrentMonthInH1(); // eseguo il cambio di testo per l'h1 col nome del mese

  // selezione a posteriori del giorno per applicare il colore al testo
  // document.querySelectorAll(".day")[now.getDate()-1].classList.add("color-epic")

  const formNode = document.querySelector("form"); // seleziono il form..
  formNode.onsubmit = saveMeeting; // per agganciare al suo evento onsubmit la funzione saveMeeting
  // che inserisce stringhe nei sotto array di appointments. L'evento viene scaturito dal click su un bottone type="submit"
});

// window.onload = function () {
// window.onload è un altro modo per aspettare che la pagina si sia caricata prima di effettare un'operazione, che sia anche una selezione del DOM
//   console.log("page loaded");
// };
