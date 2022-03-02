// ************** common utilities *************
// spinner toggle button to show and off
const spinner = document.getElementById("spinner");
const spinnerOn = () => {spinner.style.setProperty("display", "block");};
const spinnerOff = () => {spinner.style.setProperty("display", "none", "important");};

spinnerOff();

// main body show and hide while searching 
const mainSection =document.getElementById('main-body');
const mainPresent =() => {mainSection.style.display = "block";} 
const mainAbsent =() => {mainSection.style.display = "none";} 

// function to show while searching and on search-done 
const searchOn = () => {mainAbsent(); spinnerOn();}
const searchFinished = () => {mainPresent(); spinnerOff();}

// description section 
const descriptionSection = document.getElementById("description");

// toggle section to show or hide the error message
const errorMessage = document.getElementById('errorMessageSection');
const errorPresent =() => {errorMessage.style.display = "block";} 
const errorAbsent =() => {errorMessage.style.display = "none";} 
errorAbsent();


// ***************************************************************************
// ********* searching and showing all the products starts form here ********* 
// ***************************************************************************

// searchbox and getting the values on click
let searchValue = null;
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', function(){
    // function to start spinner and hide display 
    errorAbsent();
    searchOn();
    descriptionSection.textContent =' ';
    const searchField = document.getElementById("search-field");

    searchValue = searchField.value;
    searchField.value = "";
    fetchOnSearch(searchValue);
})

// phone searching and getting the data 
const fetchOnSearch = phoneName => {
    const phoneUrl =`https://openapi.programming-hero.com/api/phones?search=${phoneName}`;

    fetch(phoneUrl).then( url => url.json()).then(data => displayData(data));
}

 // all phones from search in the allphone variable is in array format 
const displayData = data => {
    const allPhone = data.data.slice(0,20);

    // ***** if the product not found ******
    if(!data.status){
        errorPresent();
        mainAbsent();
        searchFinished();
        return;};

    const cardsSection = document.getElementById('cards');
    cardsSection.textContent = ' ';

    // showing the data in ui 
    allPhone.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <div class="card m-5 text-center" style="width: 18rem;">
                <img src="${element.image}" class="card-img-top w-50 mx-auto" alt="image of a phone">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">${element.brand}</p>
                    <button onclick="getDescription('${element.slug}')" class="btn btn-primary">Go somewhere</button>
                </div>
            </div>
            `;
        cardsSection.appendChild(div);
    });

        // function to stop spinner and display result 
        searchFinished();
}

// phone detail search and manage data in the ui *******

function getDescription(phoneName){
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneName}`).then(res => res.json()).then(data => makeDescription(data));
}

const makeDescription = data => {
    // console.log(data.data.name);
    const info = data.data;
    const mainFeatures = data.data.mainFeatures;
    descriptionSection.innerHTML = `
        <div>
            <img src="${info.image}" alt="image of a phone">
            <h2>${info.name}</h2>
            <p>${info.releaseDate ? info.releaseDate : ""}</p>
            <ul id="mainfeatures" class ="list-unstyled"><h3>main features</h3>
            </ul>
        </div> 
        `;

     const ul = document.getElementById('mainfeatures');
    // adding main features of the phone to us through deconstruction     
    for(const [key, value] of Object.entries(mainFeatures)){
        const li = document.createElement('li');
        li.innerText= `${key}: ${value}`;
        ul.appendChild(li);
    }


}
