import page from "../node_modules/page/page.mjs";
import { getData, getUrl } from "./api/api.js";

const htmlBody = document.getElementById("body");
const searchForm = document
  .getElementById("form-wrapper")
  .addEventListener("submit", getUrl);
const searchBtn = document.getElementById("submit");
export const searchInput = document.getElementById("search");
export const formDiv = document.getElementById("search-form");
export const sectionEl = document.getElementById("main");
const asideBtns = document.querySelectorAll(".aside-btn");
const asideSectionEl = document.getElementById("aside-content");
const container = document.getElementById("container");
export const cardContainer = document.querySelector(".book-container");
export const seachDiv = document.createElement("div");
seachDiv.className = "search-wrapper";

let favouriteBooks = [];
page(
  "/",
  getData.bind(null, "https://www.googleapis.com/books/v1/volumes?q=google")
);
page("/favourites", getFavourites);
page("*", pageNotFound);

page.start();

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getUrl();
  }
});

export function createBook(book) {
  let data = "";
  let imgPath = book;
  if (book.title === undefined) {
    data = book.volumeInfo;
    imgPath = book.volumeInfo.imageLinks;
  } else {
    data = book;
  }

  cardContainer.className = "book-container";
  let card = document.createElement("div");

  let cardImg = document.createElement("img");
  card.innerHTML = `<img src=${imgPath.thumbnail}>`;

  let cardTitle = document.createElement("h2");
  cardTitle.textContent = data.title;

  let cardAuthor = document.createElement("h3");
  cardAuthor.innerHTML = `<strong>Authors</strong>: ${data.authors}`;

  let cardPublisher = document.createElement("span");
  cardPublisher.innerHTML = `<strong>Publisher</strong>: ${data.publisher}`;

  let cardYear = document.createElement("span");
  cardYear.innerHTML = `<strong>Date</strong>: ${data.publishedDate}`;

  let cardCategory = document.createElement("span");
  cardCategory.innerHTML = `<strong>Category</strong>: ${data.categories}`;

  let cardDescription = document.createElement("span");

  let subDescription;

  if (data.description !== undefined) {
    subDescription = data.description.substring(0, 140);
  }

  cardDescription.innerHTML = `<strong>Description</strong>: ${subDescription}...`;
  cardDescription.className = "description-span";

  let moreBtn = document.createElement("button");

  moreBtn.textContent = "See more";
  moreBtn.addEventListener("click", moreDescription);

  let favourites = document.createElement("button");
  favourites.textContent = "Add to Favourites";
  favourites.id = "fav-btn";
  favourites.addEventListener("click", addToFavourites.bind(null, book));

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove from Favoutires";
  deleteBtn.addEventListener("click", deleteBook.bind(null, book));

  function moreDescription(e) {
    cardDescription.innerHTML = `<strong>Description</strong>: ${data.description}...`;
    let lessBtn = document.createElement("button");
    lessBtn.textContent = "Show less";
    cardDescription.appendChild(lessBtn);
    lessBtn.addEventListener("click", lessDescription);
  }

  function lessDescription(e) {
    cardDescription.innerHTML = `<strong>Description</strong>: ${subDescription}...`;
    cardDescription.appendChild(moreBtn);
  }

  card.appendChild(cardImg);
  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPublisher);
  card.appendChild(cardYear);
  card.appendChild(cardCategory);
  card.appendChild(cardDescription);
  cardDescription.appendChild(moreBtn);

  if (data.id === undefined) {
    card.appendChild(favourites);
  } else {
    card.appendChild(deleteBtn);
  }

  cardContainer.appendChild(card);
}

function addToFavourites(book) {
  // console.log(book);
  const id = book.id;
  const thumbnail = book.volumeInfo.imageLinks.thumbnail;
  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors;
  const publisher = book.volumeInfo.publisher;
  const publishedDate = book.volumeInfo.publishedDate;
  const categories = book.volumeInfo.categories;
  const description = book.volumeInfo.description;

  favouriteBooks.push({
    id,
    thumbnail,
    title,
    authors,
    publisher,
    publishedDate,
    categories,
    description,
  });

  console.log(favouriteBooks);
  postFavourites();
}

function postFavourites() {
  fetch("http://localhost:5000/api/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(favouriteBooks.pop()),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function getFavourites() {
  cardContainer.innerHTML = "";
  formDiv.style.display = "none";

  fetch("http://localhost:5000/api/posts")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((book) => createBook(book));
      sectionEl.appendChild(cardContainer);
    });

  favSearch();
}

function favSearch() {
  seachDiv.style.display = "block";

  let favInputField = document.createElement("input");
  let favSeacrhBtn = document.createElement("button");
  favSeacrhBtn.textContent = "Search";

  if (seachDiv.innerHTML == "") {
    seachDiv.appendChild(favInputField);
    seachDiv.appendChild(favSeacrhBtn);
    sectionEl.appendChild(seachDiv);
    favSeacrhBtn.addEventListener("click", fetchFav);
  }

  function fetchFav() {
    let filterValue = favInputField.value;

    fetch(`http://localhost:5000/api/posts?title=${filterValue}`)
      .then((res) => res.json())
      .then((data) => {
        cardContainer.innerHTML = "";
        createBook(data.pop());
      });
  }
}

function deleteBook(book) {
  let data = book;
  const deleteQuery = book.id;
  fetch(`http://localhost:5000/api/posts/${deleteQuery}`, {
    method: "DELETE",
  });
  // addToFavourites(data);
}

function pageNotFound() {
  console.log(htmlBody);
  htmlBody.style.display = "none";
}
