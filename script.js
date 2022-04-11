import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaA_WjaogsWX-7oz2mxPF2luuzfTvGmDI",
    authDomain: "urban-garden-c792d.firebaseapp.com",
    projectId: "urban-garden-c792d",
    storageBucket: "urban-garden-c792d.appspot.com",
    messagingSenderId: "819919131998",
    appId: "1:819919131998:web:a9f4742f748a71528cebcf"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getDatabase();

function writePlantData(plantName) {
    set(ref(db, "Plant/Name"), {
        plantName: plantName
    });
}

function writeWaterPercent(percentage) {
    set(ref(db, "Plant/Percentage"), {
        percent: percentage
    });
}


let block = document.querySelectorAll(".plant");
let option = document.querySelectorAll(".option");
let section1 = document.querySelector(".plants");
let section2 = document.querySelector(".indivisual-plant");
let name = document.querySelector(".plant-name");
let type = document.querySelector(".type");
let select = document.querySelector(".select");
let plant1 = document.querySelector(".plant1");
let back = document.querySelector(".back");
let slider = document.querySelector(".slider");
let percent = document.querySelector(".percent");
let status = document.querySelector(".status");

//Reading and writing firebase data
const rw = () => {
    onValue(ref(db, "Plant/Name"), Name => {
        name.innerHTML = Name.val().plantName;
        plant1.innerHTML = Name.val().plantName;
    });
    onValue(ref(db, "Plant/Percentage"), Name => {
        slider.value = Name.val().percent;
        percent.innerHTML = Name.val().percent + "%";
    });
}

rw();

block[0].addEventListener("click", () => {
    section1.classList.add("hide");
    section2.classList.remove("hide");
    back.classList.remove("hide");
});

back.addEventListener("click", () => {
    section1.classList.remove("hide");
    section2.classList.add("hide");
    back.classList.add("hide");
});

type.addEventListener("click", () => {
    select.classList.remove("hide");
});

//Plant name selection
option.forEach(e => {
    e.addEventListener("click", () => {
        select.classList.add("hide");
        rw();
        writePlantData(e.innerHTML);
        slider.value = 50;
        percent.innerHTML = slider.value + "%";
        writeWaterPercent(slider.value);
    });
});

//Water now button
status.addEventListener("click", () => {
    set(ref(db, "Plant/Status"), {
        status: True
    });
})

//Slider settings
percent.innerHTML = slider.value + "%";
slider.oninput = function () {
    percent.innerHTML = this.value + "%";
    writeWaterPercent(this.value);
};

//PWA Section
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}
