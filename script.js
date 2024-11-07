const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeBtn = document.querySelector("#exchangebtn");


for(let select of dropdowns) {
    for (let currCode in countryList) {
        // console.log(currCode, countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }    

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}
const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal); 
    if(amtVal === "" || amtVal < 1 ) {
        amtVal = 1;
        amount.value = 1;
    }

    // console.log(formCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data); 
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtVal * rate; // or ammount.value * rate
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


// INR: "IN" :: INR--> key    IN--> value that is countryCode

const updateFlag = (element) => {
    // console.log(element);
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // console.log(newSrc);
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const exchangeCountries = () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // Update flag images after swapping
    updateFlag(fromCurr);
    updateFlag(toCurr);
    // console.log(fromCurr.value);
    updateExchangeRate();
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();// removes the default things in form ex: when the button is clicked the page gets refresh 
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

exchangeBtn.addEventListener("click", () => {
    exchangeCountries();
});

