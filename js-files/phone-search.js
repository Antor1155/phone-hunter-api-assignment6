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

    // showing the data in ui 
    allPhone.forEach(element => {
        // console.log(element);****
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-5" style="width: 18rem;">
            <img src="${element.image}" class="card-img-top" alt="image of a phone">
            <div class="card-body">
                <h5 class="card-title">${element.phone_name}</h5>
                <p class="card-text">${element.brand}</p>
                <button class="btn btn-primary">Go somewhere</button>
            </div>
        </div>
        `;
        cardsSection.appendChild(div);
    });

}