const searchBtn = document
  .getElementById("search-btn")
  .addEventListener("click", getBooks);
const searchInput = document.getElementById("search-input");
const sectionEl = document.getElementById("main");
const asideBtns = document.querySelectorAll(".aside-btn");
const asideSectionEl = document.getElementById("aside-content");

fetch(`https://www.googleapis.com/books/v1/volumes?q=book`)
  .then((resp) => resp.json())
  .then((data) => {
    let arr = data.items;
    for (let i = 0; i < 3; i++) {
      let asideCard = document.createElement("div");
      let asideCardImg = document.createElement("img");
      let asideCardTitle = document.createElement("h2");
      let asideCardAuthor = document.createElement("h3");
      let asideCardPublisher = document.createElement("span");
      let asideCardYear = document.createElement("span");
      let asideCardCategory = document.createElement("span");
      let asideCardDescription = document.createElement("span");

      asideCard.innerHTML = `<img src=${arr[i].volumeInfo.imageLinks.thumbnail}>`;
      asideCardTitle.textContent = arr[i].volumeInfo.title;
      asideCardAuthor.textContent = arr[i].volumeInfo.authors;
      asideCardPublisher.textContent = arr[i].volumeInfo.publisher;
      asideCardYear.textContent = arr[i].volumeInfo.publishedDate;
      asideCardCategory.textContent = arr[i].volumeInfo.categories;
      asideCardDescription.textContent = arr[i].volumeInfo.description;

      asideCard.appendChild(asideCardImg);
      asideCard.appendChild(asideCardTitle);
      asideCard.appendChild(asideCardAuthor);
      asideCard.appendChild(asideCardPublisher);
      asideCard.appendChild(asideCardYear);
      asideCard.appendChild(asideCardCategory);
      asideCard.appendChild(asideCardDescription);

      asideSectionEl.appendChild(asideCard);
    }
  });

function getBooks(e) {
  e.preventDefault();

  sectionEl.innerHTML = "";

  let inputValue = searchInput.value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}`)
    .then((resp) => resp.json())
    .then((response) => {
      response.items.forEach((book) => {
        let data = book.volumeInfo;

        let card = document.createElement("div");
        let cardImg = document.createElement("img");
        let cardTitle = document.createElement("h2");
        let cardAuthor = document.createElement("h3");
        let cardPublisher = document.createElement("span");
        let cardYear = document.createElement("span");
        let cardCategory = document.createElement("span");
        let cardDescription = document.createElement("span");

        card.innerHTML = `<img src=${data.imageLinks.thumbnail}>`;
        cardTitle.textContent = data.title;
        cardAuthor.textContent = data.authors;
        cardPublisher.textContent = data.publisher;
        cardYear.textContent = data.publishedDate;
        cardCategory.textContent = data.categories;
        cardDescription.textContent = data.description;

        card.appendChild(cardImg);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPublisher);
        card.appendChild(cardYear);
        card.appendChild(cardCategory);
        card.appendChild(cardDescription);

        sectionEl.appendChild(card);
      });
    });
}

asideBtns.forEach((button) => {
  button.addEventListener("click", exampleBooks);
});

function exampleBooks(e) {
  e.preventDefault();

  asideSectionEl.innerHTML = "";

  let query = e.target.value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((resp) => resp.json())
    .then((data) => {
      let arr = data.items;
      for (let i = 0; i < 3; i++) {
        let asideCard = document.createElement("div");
        let asideCardImg = document.createElement("img");
        let asideCardTitle = document.createElement("h2");
        let asideCardAuthor = document.createElement("h3");
        let asideCardPublisher = document.createElement("span");
        let asideCardYear = document.createElement("span");
        let asideCardCategory = document.createElement("span");
        let asideCardDescription = document.createElement("span");

        asideCard.innerHTML = `<img src=${arr[i].volumeInfo.imageLinks.thumbnail}>`;
        asideCardTitle.textContent = arr[i].volumeInfo.title;
        asideCardAuthor.textContent = arr[i].volumeInfo.authors;
        asideCardPublisher.textContent = arr[i].volumeInfo.publisher;
        asideCardYear.textContent = arr[i].volumeInfo.publishedDate;
        asideCardCategory.textContent = arr[i].volumeInfo.categories;
        asideCardDescription.textContent = arr[i].volumeInfo.description;

        asideCard.appendChild(asideCardImg);
        asideCard.appendChild(asideCardTitle);
        asideCard.appendChild(asideCardAuthor);
        asideCard.appendChild(asideCardPublisher);
        asideCard.appendChild(asideCardYear);
        asideCard.appendChild(asideCardCategory);
        asideCard.appendChild(asideCardDescription);

        asideSectionEl.appendChild(asideCard);
      }
    });
}
