// searchbox and getting the values on click
let searchValue = null;
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', function(){
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

const displayData = data => {
 // all phones from search in the all phone variable in array format 
    const allPhone = data.data;

    const cardsSection = document.getElementById('cards');
    cardsSection.textContent = '';

    // showing the data in ui 
    allPhone.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <div class="card m-5" style="width: 18rem;">
                <img src="${element.image}" class="card-img-top" alt="image of a phone">
                <div class="card-body">
                    <h5 class="card-title">${element.phone_name}</h5>
                    <p class="card-text">${element.brand}</p>
                    <button onclick="getDescription('${element.slug}')" class="btn btn-primary">Go somewhere</button>
                </div>
            </div>
            `;
        cardsSection.appendChild(div);
    });

}

// phone detail search and manage data in the ui *******

function getDescription(phoneName){
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneName}`).then(res => res.json()).then(data => makeDescription(data));
}

const makeDescription = data => {
    // console.log(data.data.name);
    const info = data.data;
    const mainFeatures = data.data.mainFeatures;
    const descriptionSection = document.getElementById("description");

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