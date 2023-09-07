const searchInput = document.getElementsByClassName('input-search')[0];
const searchbtn = document.getElementById('search');
const resultContainer = document.getElementsByClassName('resultContainer')[0];

// search function to search a superhereo
searchbtn.addEventListener('click', () => {
    const superheroName = searchInput.value.trim();
    if (superheroName !== '') {
        searchSuperhero(superheroName);
    }
    else {
        resultContainer.innerHTML = ""
    }
});
// on press enter then also search 
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSuperhero(searchInput.value.trim());
    }
});

// fetch data from marvel api
function searchSuperhero(superheroName) {
    const apiUrl = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + superheroName + "&limit=8&ts=1&apikey=ef72f3e381e8392846544ea3fca89239&hash=47b1bb41804713b64ec5ff24ae0390a8";

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            displaySuperhero(data.data.results);
        })
        .catch(err => {
            console.log('Error:', err);
            displayErrorMessage();
        });
}

// on displaying the searched data of superheroes
function displaySuperhero(searchedSuperhero) {
    // check data from localStorage is added or not if added show added behavior else not added behavior
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    // if null then set new data
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    }
    else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
    }
    // in starting container is empty
    resultContainer.innerHTML = '';

    let count = 1;
    for (const key in searchedSuperhero) {
        if (count <= 5) {
            // render data in Array form
            let superhero = searchedSuperhero[key];
            // if found set all details in card inside container
            resultContainer.innerHTML +=`
            <div class="superhero">  
                <div class="left">
                    <img src="${superhero.thumbnail.path + '/standard_fantastic.' + superhero.thumbnail.extension}"/> 
                </div>
                <div class="right">
                    <div class="name">
                        <h2> ${superhero.name}</h2>
                    </div>
                    <i class="${favouritesCharacterIDs.has(superhero.id) ? 'fa-solid  fa-heart mx-1 red' : 'fa-solid fa-heart mx-1 white'}"></i>
                    <a class="info"> See Details</a>
                </div>
                <!-- get all details about superheros -->
                <div style="display:none;">
                         <span>${superhero.name}</span>
                         <span>${superhero.description}</span>
                         <span>${superhero.comics.available}</span>
                         <span>${superhero.series.available}</span>
                         <span>${superhero.stories.available}</span>
                         <span>${superhero.thumbnail.path + '/portrait_uncanny.' + superhero.thumbnail.extension}</span>
                         <span>${superhero.id}</span>
                         <span>${superhero.thumbnail.path + '/landscape_incredible.' + superhero.thumbnail.extension}</span>
                         <span>${superhero.thumbnail.path + '/standard_fantastic.' + superhero.thumbnail.extension}</span>
                    </div>
             </div>`
        }
        count++;
    }
}
//toggle the pages rendered using class
document.addEventListener('click', e => {
    //add to favourites function
    let target = e.target;
    if (target.classList.contains("fa-heart")) {
        addToFavourite(target);
    }
    //single page function
    if (target.classList.contains("info")) {
        openSinglePage(target);
        window.open("./single.html", "_blank");
    }
})
// add to favourite function to set the superhero to favourite
function addToFavourite(e) {
    // get information of a superhero which is to be added
    let heroInfo = {
        name: e.parentElement.parentElement.children[2].children[0].innerHTML,
        description: e.parentElement.parentElement.children[2].children[1].innerHTML,
        comics: e.parentElement.parentElement.children[2].children[2].innerHTML,
        series: e.parentElement.parentElement.children[2].children[3].innerHTML,
        stories: e.parentElement.parentElement.children[2].children[4].innerHTML,
        portrait: e.parentElement.parentElement.children[2].children[5].innerHTML,
        id: e.parentElement.parentElement.children[2].children[6].innerHTML,
        landscape: e.parentElement.parentElement.children[2].children[7].innerHTML,
        square: e.parentElement.parentElement.children[2].children[8].innerHTML,
    }
    // check if class available then go to add card else card is allready added
    if (e.classList.contains('white')) {
        console.log("add");
        // get item in favoriteContainer or not if null then add this superhero to favoriteContainer else render data
        let favouritesArray = localStorage.getItem("favouriteCharacters");
        if (favouritesArray == null) {
            favouritesArray = [];
        }
        else {
            favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        }
        // parse the to json from localStorage
        let favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
        if (favouritesCharacterIDs == null) {
            favouritesCharacterIDs = new Map();
        }
        else {
            favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        }
        // set the id will available and set true
        favouritesCharacterIDs.set(heroInfo.id, true);
        favouritesArray.push(heroInfo);

        // stringify the data from localStorage to string format
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
        // set to the Array
        localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));
        // set some css here
        e.setAttribute('class', 'fa-solid fa-heart mx-1 red');
    }
    else {
        // parse the to json from localStorage
        let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        let newFavouritesArray = [];
        // if available then delete
        favouritesCharacterIDs.delete(`${heroInfo.id}`);
        favouritesArray.forEach((favourite) => {
            if (heroInfo.id != favourite.id) {
                newFavouritesArray.push(favourite);
            }
        });
        // set to the new Array in string format
        localStorage.setItem("favouriteCharacters", JSON.stringify(newFavouritesArray));
        // stringify the data from localStorage to string format
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
        e.setAttribute('class', 'fa-solid fa-heart mx-1 white');
    }
}

//onclick open information page
function openSinglePage(e) {
    // get info from searchedSuperhero
    let heroInfo = {
        name: e.parentElement.parentElement.children[2].children[0].innerHTML,
        description: e.parentElement.parentElement.children[2].children[1].innerHTML,
        comics: e.parentElement.parentElement.children[2].children[2].innerHTML,
        series: e.parentElement.parentElement.children[2].children[3].innerHTML,
        stories: e.parentElement.parentElement.children[2].children[4].innerHTML,
        portraitImage: e.parentElement.parentElement.children[2].children[5].innerHTML,
        id: e.parentElement.parentElement.children[2].children[6].innerHTML,
        landscapeImage: e.parentElement.parentElement.children[2].children[7].innerHTML,
        squareImage: e.parentElement.parentElement.children[2].children[8].innerHTML
    }
    //set data to the locastorage in string format
    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
    console.log(heroInfo);
}
// // dispaly error message if error in searching
function displayErrorMessage() {
    resultContainer.innerHTML = `<li id="error"> Superhero not Found!! <li>`;
}