import { restCountry } from "./config.js";
import { weatherAPI } from "./config.js";

// Element refernces
const body = document.querySelector('body');
const container = document.querySelector('#container');
const cards = document.querySelector('.cards');

// body.classList.add("position-relative");


// For creating node
const createNode = (element) => {
  return document.createElement(element);
};

// for appending child with parent
const appendChild = (parent, el) => {
  return parent.appendChild(el);
};

let header = createNode("header");
let headerClass = [];
header.classList.add(...headerClass);


appendChild(body, header);

let h1 = createNode("h1");
let h1Class = ["text-center", "fs-3", "text-bg-dark", "bg-gradient", "bg-opacity-50", "p-2"];
h1.classList.add(...h1Class);
h1.innerHTML = `Rest Country Weather Info`;
appendChild(header, h1);

let main = createNode("main");
let mainClass = ["container-fluid", "d-flex", "flex-wrap", "justify-content-center", "gap-3"];
main.classList.add(...mainClass);

appendChild(body, main);

async function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function server_call() {
  await sleep(500);
}

(async () => {
  let dialogbox = createNode("dialog");
  dialogbox.style.border = "none";
  dialogbox.style.outline = 'none';
  dialogbox.style.borderRadius = '9px';
  dialogbox.innerHTML = `Loading...`;
  appendChild(main, dialogbox);
  dialogbox.showModal();
  // document.getElementById("dialog").showModal();
  await server_call();
  await server_call();
  await server_call();
  dialogbox.close();
  // document.getElementById("dialog").close();
})();


const getCountriesData = async () => {
  const response = await fetch(restCountry);
  const jsonData = await response.json();
  // console.log(jsonData);

  jsonData.forEach((data, i) => {
    displayData(data, i);
  });
};

getCountriesData();

const displayData = async (data, i) => {
  // console.log(i + 1, data);
  // console.log(data.name.common);
  // console.log(data.flags.svg);

  if (data.capitalInfo.latlng === undefined) return;
  const coords = data.capitalInfo.latlng;
  // console.log(i + 1, coords);
  // console.log(coords[0], coords[1]);

  // create a card, add class and style
  let card = createNode("div");
  card.classList.add('card');
  card.style.width = "18rem";

  // Append card container with main 
  appendChild(main, card);


  let img = createNode("img");
  let imgClass = ["card-img-top", "img-fluid"];
  img.classList.add(...imgClass);
  img.src = `${data.flags.png}`;

  appendChild(card, img);

  // create a card-body and add some class
  let card_body = createNode("div");
  let cardBodyClass = ["card-body", "text-center"];
  card_body.classList.add(...cardBodyClass);

  // Append this card-body to this card
  appendChild(card, card_body);

  let cardTitle = createNode("h5");
  let cardTitleClass = ["card-title"];
  cardTitle.classList.add(...cardTitleClass);
  cardTitle.innerHTML = `${data.name.common}`;

  appendChild(card_body, cardTitle);

  let cardInfo = createNode("div");
  let cardInfoClass = ["d-flex", "gap-3", "justify-content-center"];
  cardInfo.classList.add(...cardInfoClass);

  appendChild(card_body, cardInfo);

  let cardText1 = createNode("p");
  let cardText1Class = ["card-text"];
  cardText1.classList.add(...cardText1Class);
  cardText1.innerHTML = `Lat: `;

  let span1 = createNode("span");
  let span1Class = [];
  span1.classList.add(...span1Class);
  span1.innerHTML = `${coords[0]}`;

  appendChild(cardText1, span1);
  appendChild(cardInfo, cardText1);

  let cardText2 = createNode("p");
  let cardText2Class = ["card-text"];
  cardText2.classList.add(...cardText2Class);
  cardText2.innerHTML = `Lng: `;

  let span2 = createNode("span");
  let span2Class = [];
  span2.classList.add(...span2Class);
  span2.innerHTML = `${coords[1]}`;
  // console.log(span2.innerText);

  appendChild(cardText2, span2);
  appendChild(cardInfo, cardText2);

  let link_btn = createNode("a");
  let link_btn_class = ["btn", "btn-outline-primary"];
  link_btn.classList.add(...link_btn_class);
  link_btn.href = `#`;
  link_btn.type = "button";

  const nodeMap = link_btn.attributes;
  const attrName = ['data-bs-toggle', 'data-bs-target'];
  const toggleNode = document.createAttribute(attrName[0]);
  toggleNode.value = "modal";
  nodeMap.setNamedItem(toggleNode);
  const targetNode = document.createAttribute(attrName[1]);
  targetNode.value = "#staticBackdrop";
  nodeMap.setNamedItem(targetNode);

  link_btn.innerHTML = `Get Weather `;
  // console.dir(link_btn);

  // Append this to card-body
  appendChild(card_body, link_btn);

  // create an "i" element add class
  let icon = createNode("i");
  let icon_class = ["bi", "bi-thermometer-half"];
  icon.classList.add(...icon_class);

  // Append to this anchor element
  appendChild(link_btn, icon);


  //modal start
  let modal = createNode("div");
  let modalID = ["staticBackdrop"];
  let modalClass = ["modal", "fade"];
  modal.classList.add(...modalClass);
  modal.setAttribute("id", modalID[0]);

  let modalNodeMap = modal.attributes;
  const modalAttrName = ['data-bs-backdrop', 'data-bs-keyboard', 'tabindex'];
  const modalToggleNode = document.createAttribute(modalAttrName[0]);
  modalToggleNode.value = "static";
  modalNodeMap.setNamedItem(modalToggleNode);

  const modalTargetNode = document.createAttribute(modalAttrName[1]);
  modalTargetNode.value = "false";
  modalNodeMap.setNamedItem(modalTargetNode);

  const tabIndexNode = document.createAttribute(modalAttrName[2]);
  tabIndexNode.value = -1;
  nodeMap.setNamedItem(tabIndexNode);

  modal.setAttribute("aria-labelledby", "staticBackdropLabel");
  modal.setAttribute("aria-hidden", "true");

  // append this modal to main
  appendChild(card_body, modal);

  let modalDialog = createNode("div");
  let modalDialogClass = ['modal-dialog'];
  modalDialog.classList.add(...modalDialogClass);
  appendChild(modal, modalDialog);

  let modalContent = createNode("div");
  let modalContentClass = ['modal-content'];
  modalContent.classList.add(...modalContentClass);
  appendChild(modalDialog, modalContent);

  let modalHeader = createNode("div");
  let modalHeaderClass = ['modal-header'];
  modalHeader.classList.add(...modalHeaderClass);
  appendChild(modalContent, modalHeader);

  let modalTitle = createNode("h1");
  let modalTitleClass = ['modal-title', 'fs-5'];
  modalTitle.classList.add(...modalTitleClass);
  modalTitle.setAttribute("id", "staticBackdropLabel");
  modalTitle.innerHTML = `Weather Info`;
  appendChild(modalHeader, modalTitle);

  let modalCloseBtn = createNode("button");
  let modalCloseBtnClass = ['btn-close'];
  modalCloseBtn.classList.add(...modalCloseBtnClass);
  let btnNodeMap = modalCloseBtn.attributes;
  const btnAttrName = ['data-bs-dismiss'];
  const btnToggleNode = document.createAttribute(btnAttrName[0]);
  btnToggleNode.value = "modal";
  btnNodeMap.setNamedItem(btnToggleNode);
  appendChild(modalHeader, modalCloseBtn);

  const modalBody = createNode("div");
  const modalBodyClass = ["modal-body"];
  modalBody.classList.add(...modalBodyClass);
  appendChild(modalContent, modalBody);

  // Manipulate every time
  const modalLogo = createNode("img");
  // modalLogo.src = `https://openweathermap.org/img/wn/03n.png`;
  modalLogo.src = "";
  modalLogo.alt = "";
  // modalLogo.alt = `logo`;
  appendChild(modalBody, modalLogo);

  let tempInfo = createNode("p");
  const tempClass = [];
  tempInfo.classList.add(...tempClass);
  tempInfo.innerHTML = "";
  // tempInfo.innerHTML = `Temprature: 22.6 `;

  const tempDeg = createNode("span");
  const tempDegClass = [];
  tempDeg.classList.add(...tempDegClass);
  tempDeg.innerHTML = "";
  // tempDeg.innerHTML = ` Description: Clear Sky`;

  appendChild(tempInfo, tempDeg);
  appendChild(modalBody, tempInfo);
  //modal end

  // Getting weather acording to the country's lat-lon
  const getWeather = async () => {
    console.log("Weather getting");
    // console.log(span2.innerText);
    // console.log(Number(span1.innerText));
    // console.log(Number(span2.innerText));
    const coordLat = Number(span1.innerText);
    const coordLng = Number(span2.innerText);

    // call api and receive raw data
    const res = await fetch(weatherAPI
      .replace("lat2", coordLat)
      .replace("lng2", coordLng)
    );

    // convert this raw data to json obj
    const data = await res.json();

    console.log(data);
    console.log(data.main.temp);
    // console.log(data.main.temp_min);
    // console.log(data.main.temp_max);
    // console.log(data.sys.sunrise);
    // console.log(data.sys.sunset);
    // console.log(data.weather[0].description);
    const desc = data.weather[0].description;
    // console.log(data.weather[0].main);
    // console.log(data.weather[0].icon);


    modalLogo.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    modalLogo.alt = `${data.weather[0].id}`;
    tempInfo.innerHTML = `Temp:${data.main.temp} `;
    tempDeg.innerText = `Desc: ${desc}`;
    console.log(tempDeg);

  };



  // Reset to initial stage
  const resetData = async () => {
    // modalLogo.src = `https://openweathermap.org/img/wn/03n.png`;
    modalLogo.src = "";
    modalLogo.alt = "";
    tempInfo.innerHTML = "";
    tempDeg.innerText = "";

    console.log("Reset Data");
    // window.location.reload();
  };

  link_btn.addEventListener('click', getWeather);
  modalCloseBtn.addEventListener('click', resetData);


};



