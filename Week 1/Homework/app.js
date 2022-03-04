import page from "../node_modules/page/page.mjs";
import { getData, getUrl } from "./api/api.js";

const htmlBody = document.getElementById("body");
const searchForm = document
  .querySelector(".form-wrapper")
  .addEventListener("submit", getUrl);
export const searchInput = document.querySelector(".search");
export const formDiv = document.getElementById("search-form");
export const sectionEl = document.getElementById("main");
export const cardContainer = document.querySelector(".book-container");
export const searchDiv = document.createElement("div");
searchDiv.className = "form-wrapper";

let favouriteBooks = [];
page(
  "/",
  getData.bind(null, "https://www.googleapis.com/books/v1/volumes?q=react")
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
  card.className = "each-book";

  let infoWrapper = document.createElement("div");
  infoWrapper.className = "info-wrapper";

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
  favourites.className = "action-btn";

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove from Favoutires";
  deleteBtn.className = "action-btn";
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

  infoWrapper.appendChild(cardImg);
  infoWrapper.appendChild(cardTitle);
  infoWrapper.appendChild(cardAuthor);
  infoWrapper.appendChild(cardPublisher);
  infoWrapper.appendChild(cardYear);
  infoWrapper.appendChild(cardCategory);
  card.appendChild(infoWrapper);
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

  // console.log(favouriteBooks);
  postFavourites();
}

function postFavourites() {
  searchDiv.style.display = "block";

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
  searchDiv.style.display = "block";

  let select = document.createElement("select");

  let searchOpt = document.createElement("option");
  searchOpt.value = "";
  searchOpt.textContent = "Search By:";
  searchOpt.disabled = true;
  searchOpt.selected = true;

  let titleOpt = document.createElement("option");
  titleOpt.value = "title";
  titleOpt.textContent = "Title";

  let producersOpt = document.createElement("option");
  producersOpt.value = "publisher";
  producersOpt.textContent = "Publisher";

  let authorsOpt = document.createElement("option");
  authorsOpt.value = "authors";
  authorsOpt.textContent = "Authors";

  let categiesOpt = document.createElement("option");
  categiesOpt.value = "categories";
  categiesOpt.textContent = "Categories";

  select.appendChild(searchOpt);
  select.appendChild(titleOpt);
  select.appendChild(authorsOpt);
  select.appendChild(producersOpt);
  select.appendChild(categiesOpt);

  let favInputField = document.createElement("input");
  favInputField.placeholder = "Enter title";
  favInputField.className = "search";
  let favSeacrhBtn = document.createElement("button");
  favSeacrhBtn.textContent = "Search";
  favSeacrhBtn.className = "submit";

  if (searchDiv.innerHTML == "") {
    searchDiv.appendChild(select);
    searchDiv.appendChild(favInputField);
    searchDiv.appendChild(favSeacrhBtn);
    sectionEl.appendChild(searchDiv);
    favSeacrhBtn.addEventListener("click", fetchFav);
  }

  function fetchFav() {
    let filterValue = favInputField.value;
    let value = select.options[select.selectedIndex].value;

    fetch(`http://localhost:5000/api/posts?${value}=${filterValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        cardContainer.innerHTML = "";
        data.forEach((book) => {
          createBook(book);
        });
      });
  }
}

function deleteBook(book) {
  const deleteQuery = book.id;
  fetch(`http://localhost:5000/api/posts/${deleteQuery}`, {
    method: "DELETE",
  });

  setTimeout(() => {
    getFavourites();
  }, 500);

  setTimeout(() => {
    formDiv.style.display = "none";
  }, 550);
}

function pageNotFound() {
  console.log(htmlBody);
  htmlBody.style.display = "none";
}
