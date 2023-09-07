// get heroInfo from localStorage
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

// get id of single container to reder information in this.
const singleContainer = document.getElementById('singleContainer');

// get all ids to set in HTML page
var title = document.getElementById('heroName');
var photo = document.getElementById('heroImage');
var desc = document.getElementById('heroDetails');
var comics = document.getElementById('comics');
var series = document.getElementById('series');
var stories = document.getElementById('stories');
var favicon = document.getElementById('favicon');

//set favicon
favicon.setAttribute("href", heroInfo.squareImage);

// set name
title.innerHTML = heroInfo.name;

// set title of page
document.title = heroInfo.name;

// set photo
photo.setAttribute("src", heroInfo.squareImage);

// set description
if (heroInfo.description) {
    desc.innerHTML = heroInfo.description;
}
else {
    desc.innerHTML = "No Description Available"
}

// set comics count
if (heroInfo.comics) {
    comics.innerHTML = heroInfo.comics;
}
else {
    comics.innerHTML = "No Comics here"
}

// set series count
if (heroInfo.series) {
    series.innerHTML = heroInfo.series;
}
else {
    series.innerHTML = "No Series here"
}
// set stories count
if (heroInfo.stories) {
    stories.innerHTML = heroInfo.stories
}
else {
    stories.innerHTML = "No Stories here"
}