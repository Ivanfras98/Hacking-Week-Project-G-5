const btn = document.querySelector(".btn1");
const btnChart = document.querySelector(".btn2");
const btnTable = document.querySelector(".btn3");

window.addEventListener("load", () => {
  document.querySelector("main").style.visibility = "hidden";
});

btn.addEventListener("click", () => {
  document.querySelector("main").style.visibility = "visible";
  document.querySelector(".chart").classList.add("visible");
  document.querySelector(".tabella").classList.add("visible");
  document.getElementById("calendar").style.display = "flex";
});

btnTable.addEventListener("click", () => {
  document.querySelector("main").style.visibility = "visible";
  document.querySelector(".chart").classList.add("visible");
  document.getElementById("calendar").style.display = "none";
  document.querySelector(".tabella").classList.remove("visible");
});

btnChart.addEventListener("click", () => {
  document.querySelector("main").style.visibility = "visible";
  document.querySelector(".tabella").classList.add("visible");
  document.getElementById("calendar").style.display = "none";
  document.querySelector(".chart").classList.remove("visible");
});
