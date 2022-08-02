async function newsSite() {
  const url = "https://api.spaceflightnewsapi.net/v3/articles?_limit=100"; // Url API
  const response = await fetch(url);
  const dati = await response.json();

  const autori = await dati.map((authors) => authors.newsSite); // proprietà newsSite che indica l'autore di un articolo
  const orderedAuthor = [...new Set(autori.sort())]; // lista degli autori non ripetuti in ordine alfabetico

  const numeri = [];

  // ciclo che abbina gli autori di un articolo alla quantità pubblicata

  orderedAuthor.forEach((element) => {
    numeri.push(
      autori.filter((item) => {
        return item.toString() === element.toString();
      }).length
    );
  });
  //console.log(numeri);
  // Grafico con la percentuale di articoli scritti per Autore

  const data = {
    labels: orderedAuthor,
    datasets: [
      {
        label: "",
        backgroundColor: [
          "rgba(255, 0, 0)",
          "rgba(255, 123, 25)",
          "rgba(99, 222, 12)",
          "rgba(25, 42, 222)",
          "rgba(255, 0, 85)",
          "rgba(15, 122, 172)",
          "rgba(234, 98, 172)",
          "rgba(134, 12, 172)",
          "rgba(34, 162, 172)",
          "rgba(4, 42, 72)",
          "rgba(134, 62, 112)",
          "rgba(4, 112, 72)",
        ],
        borderColor: [
          "rgb(255, 0, 0)",
          "rgba(255, 123, 25)",
          "rgba(99, 222, 12)",
          "rgba(25, 42, 222)",
          "rgba(255, 0, 85)",
          "rgba(15, 122, 172)",
          "rgba(234, 98, 172)",
          "rgba(134, 12, 172)",
          "rgba(34, 162, 172)",
          "rgba(4, 42, 72)",
          "rgba(134, 62, 112)",
          "rgba(4, 112, 72)",
        ],
        data: numeri,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      scales: {},
      plugins: {
        title: {
          display: true,
          text: "% Provenienza Articolo",
          font: {
            size: "22",
          },
        },

        tooltip: {
          enabled: false,
        },
        // funzione che permette la visualizzazione in % dei dati scritti per autore
        datalabels: {
          color: "#ffffff",
          formatter: (value, context) => {
            const datapoint = context.chart.data.datasets[0].data;
            function somma(total, datapoint) {
              return total + datapoint;
            }
            const valoreTotale = datapoint.reduce(somma, 0);
            const valorePercentuale = ((value / valoreTotale) * 100).toFixed(2);
            const displayValori = [`${value}`, `${valorePercentuale}%`];
            return displayValori;
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}
newsSite();

let nomiPublisher = [];
let dateMensili = [];

async function prova() {
  const url = "https://api.spaceflightnewsapi.net/v3/info";
  const response = await fetch(url, {
    method: "GET",
    "Content-Type": "application/json",
  });
  const dati = await response.json();

  dati.newsSites.forEach((item) => {
    nomiPublisher.push(item);
  });

  let oggi = new Date();

  dateMensili.push(oggi.toLocaleDateString());

  for (let i = 0; i < 12; i++) {
    oggi.setMonth(oggi.getMonth() - 1);
    dateMensili.unshift(oggi.toLocaleDateString());
  }

  document
    .querySelector("div.container")
    .appendChild(document.createElement("select"));
  document
    .querySelector("div.container select")
    .setAttribute("value", "nofilter");
  nomiPublisher.forEach((item, index) => {
    document
      .querySelector("div.container > select")
      .appendChild(document.createElement("option"));
    document
      .querySelector("div.container select option:last-child")
      .setAttribute("value", `${index + 1}`);
    document.querySelector(
      "div.container select option:last-child"
    ).textContent = `${item}`;
    document
      .querySelector("div.container select option:last-child")
      .setAttribute("id", `${index + 1}`);
  });

  document
    .querySelector("div.container select")
    .addEventListener("change", async (e) => {
      if (oggi.getDate() < 10) {
        // da concludere
        if (oggi.getMonth() < 10) {
          const fetchDate = `${oggi.getFullYear()}${(
            "0" +
            (oggi.getMonth() + 1)
          ).slice(-2)}${("0" + oggi.getDate()).slice(-2)}`;
          const url = `https://api.spaceflightnewsapi.net/v3/articles?newsSite=${e.target.value}&publishedAt_gt=${fetchDate}&_limit=5000`;
          const fetchiamo = await fetch(url);
          const fetched = await fetchiamo.json();
          const mesi = [];
          const oggiDiNuovo = new Date();
          const contatoreMesi = new Date();
          // contatoreMesi.setMonth(contatoreMesi.getMonth() - 1);

          for (let i = 0; i < 12; i++) {
            let contatore = 0;

            contatoreMesi.setMonth(contatoreMesi.getMonth() - 1);

            fetched.forEach((element) => {
              if (
                element.publishedAt <= oggiDiNuovo.toISOString() &&
                element.publishedAt >= contatoreMesi.toISOString()
              ) {
                // mesi.push(element);
                contatore++;
              }
            });
            //console.log(contatoreMesi.toISOString(), oggiDiNuovo.toISOString());
            oggiDiNuovo.setMonth(oggiDiNuovo.getMonth() - 1);

            mesi.unshift(contatore);
          }
          console.log(mesi);
        }
      }
    });
}
prova();
