let container = document.getElementById("favouriteContainer");
// onload windows get items which is added to favourite
window.addEventListener("load", function () {
  // get favourite container
  let favourites = localStorage.getItem("favouriteCharacters");

  // check if null the no any superhero
  if (favourites == null) {
    container.innerHTML = "<p>No Superhero in your Favourites</p>";
    return;
  }
  // else parse and get from the locastorage to json
  else {
    favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
  }

  if (favourites.length == 0) {
    container.innerHTML = "<p>No Superhero in your Favourites</p>";
    return;
  }
  // show in container
  container.innerHTML = "";
  favourites.forEach((superhero) => {
    container.innerHTML +=
      ` <div class="superhero">  
          <div class="left">
            <img src="${superhero.square}"/> 
          </div>
          <div class="right">
            <div class="name">
              <h2> ${superhero.name}</h2>
            </div>
            <i class="fa-solid fa-heart mx-1 red"></i>
            <a class="info" > See Details</a>
          </div>
          <button class="remove">Remove</button>
    <!-- get all details about superheros -->
          <div style="display:none;">
                  <span>${superhero.name}</span>
                  <span>${superhero.description}</span>
                  <span>${superhero.comics.available}</span>
                  <span>${superhero.series.available}</span>
                  <span>${superhero.stories.available}</span>
                  <span>${superhero.portrait
                }</span>
                  <span>${superhero.id}</span>
                  <span>${superhero.landscape
                }</span>
                  <span>${superhero.square
                }</span>
              </div>
          </div>`;
  });
  addEvent();
});

// event for removing the card from localstorage
function addEvent() {
  let removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((btn) =>
    btn.addEventListener("click", removeSuperheroFromFavourites)
  );

  let superheroInfo = document.querySelectorAll("info");
  superheroInfo.forEach((superhero) =>
    superhero.addEventListener("click", openSinglePage)
  );
}
document.addEventListener('click', e => {
  let target = e.target;
  if (target.classList.contains("remove")) {
    removeSuperheroFromFavourites(target);
  }
  if (target.classList.contains("info")) {
    openSinglePage(target);
    window.open("./single.html", "_blank");
  }
})
//function for removing the cards
function removeSuperheroFromFavourites(e) {
  let idOfSuperheroToBeDeleted =
    e.parentElement.children[2].innerHTML.substring(5);
  // get parse data from localstorage
  let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));
  //set mapped data to delete and map new conatiner
  let favouritesCharacterIDs = new Map(
    JSON.parse(localStorage.getItem("favouritesCharacterIDs"))
  );

  //delete new mapped data
  favouritesCharacterIDs.delete(`${idOfSuperheroToBeDeleted}`);
  //use splice and make new array data
  favourites.forEach(function (favourite, index) {
    if (favourite.id == idOfSuperheroToBeDeleted) {
      favourites.splice(index, 1);
    }
  });
  // after deleted show no superhero found
  if (favourites.length == 0) {
    container.innerHTML = "No Superhero in your Favourites";
  }
  //again set data in stringify form
  localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
  //also set array data in stringify form
  localStorage.setItem(
    "favouritesCharacterIDs",
    JSON.stringify([...favouritesCharacterIDs])
  );
  e.parentElement.remove();
}
//onclick open information page
function openSinglePage(e) {
  let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));
  //set data to the locastorage in string format
  localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}