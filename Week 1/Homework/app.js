import page from "../node_modules/page/page.mjs";

const searchForm = document
  .getElementById("form-wrapper")
  .addEventListener("submit", getUrl);
const searchBtn = document.getElementById("submit");
// .addEventListener("click", getUrl);
const searchInput = document.getElementById("search");
const sectionEl = document.getElementById("main");
const asideBtns = document.querySelectorAll(".aside-btn");
const asideSectionEl = document.getElementById("aside-content");

let favouriteBooks = [];
page(
  "/",
  getData.bind(null, "https://www.googleapis.com/books/v1/volumes?q=google")
);
// page("/favourite", getFavourites());
page.start();

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getUrl();
  }
});

asideBtns.forEach((button) => {
  button.addEventListener("click", exampleBooks);
});

function getUrl(e) {
  e.preventDefault();
  sectionEl.innerHTML = "";
  console.log("done");

  let inputValue = searchInput.value;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;

  getData(url);
}

function getData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      response.items.forEach((book) => {
        createBook(book);
      });
    })
    .catch((err) => {
      console.log(err);
      const errorMsg = document.createElement("h2");
      errorMsg.textContent =
        "There was an error fetching the data, try with another keyword.";
      sectionEl.appendChild(errorMsg);
    });
}

function createBook(book) {
  let data = "";
  let imgPath = book;
  if (book.title === undefined) {
    data = book.volumeInfo;
    imgPath = book.volumeInfo.imageLinks;
  } else {
    data = book;
  }
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
  card.appendChild(favourites);

  sectionEl.appendChild(card);
}

function addToFavourites(book) {
  // getFavourites();
  const id = book.id;
  const thumbnail = book.volumeInfo.imageLinks.thumbnail;
  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors;
  const publisher = book.volumeInfo.publisher;
  const publishedDate = book.volumeInfo.publishedDate;
  const categories = book.volumeInfo.categories;
  const description = book.volumeInfo.description;

  favouriteBooks.push({
    thumbnail,
    title,
    authors,
    publisher,
    publishedDate,
    categories,
    description,
  });

  console.log(favouriteBooks);
}

function postFavourites() {
  fetch("http://localhost:5000/api/posts", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(favouriteBooks),
  }).then((resp) => console.log(resp));
  // .then((data) => console.log(data));
}

let test = document
  .getElementById("test")
  .addEventListener("click", postFavourites);

function getFavourites() {
  postFavourites();
  sectionEl.innerHTML = "";
  fetch("http://localhost:5000/api/posts")
    .then((resp) => resp.json())
    .then((data) => data[0].forEach((book) => createBook(book)));
}
