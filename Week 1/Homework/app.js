const searchBtn = document
  .getElementById("search-btn")
  .addEventListener("click", getBooks);
const searchInput = document.getElementById("search-input");
const sectionEl = document.getElementById("main");
const asideBtns = document.querySelectorAll(".aside-btn");
const asideSectionEl = document.getElementById("aside-content");

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getBooks();
  }
});

asideBtns.forEach((button) => {
  button.addEventListener("click", exampleBooks);
});
exampleIsUsed = false;

exampleBooks();

function exampleBooks(e) {
  asideSectionEl.innerHTML = "";

  let url = "";

  if (e === undefined) {
    url = `https://www.googleapis.com/books/v1/volumes?q=google`;
  } else {
    let query = e.target.value;
    url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  }

  exampleIsUsed = true;

  getData(url);
}

function getBooks() {
  sectionEl.innerHTML = "";

  let inputValue = searchInput.value;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;

  exampleIsUsed = false;
  console.log(exampleIsUsed);

  getData(url);
}

function getData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      response.items.forEach((book) => {
        let data = book.volumeInfo;

        let card = document.createElement("div");

        let cardImg = document.createElement("img");
        card.innerHTML = `<img src=${data.imageLinks.thumbnail}>`;

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

        let subDescription = "";

        if (data.description !== undefined) {
          data.description.substring(0, 140);
        }

        cardDescription.innerHTML = `<strong>Description</strong>: ${subDescription}...`;
        cardDescription.className = "description-span";

        let moreBtn = document.createElement("button");
        let favourites = document.createElement("button");

        moreBtn.textContent = "See more";
        moreBtn.addEventListener("click", moreDescription);

        favourites.textContent = "Add to Favourites";
        favourites.id = "fav-btn";

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

        if (exampleIsUsed === true) {
          asideSectionEl.appendChild(card);
          if (asideSectionEl.children.length >= 2) {
            throw "Stop";
          }
        } else {
          sectionEl.appendChild(card);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      // const errorMsg = document.createElement("h2");
      // errorMsg.textContent =
      //   "There was an error fetching the data, try with another keyword.";
      // sectionEl.appendChild(errorMsg);
    });
}
