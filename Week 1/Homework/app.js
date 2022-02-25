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

fetch(`https://www.googleapis.com/books/v1/volumes?q=react`)
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
      asideCardAuthor.textContent = `Author: ${arr[i].volumeInfo.authors}`;
      asideCardPublisher.textContent = `Publisher: ${arr[i].volumeInfo.publisher}`;
      asideCardYear.textContent = `Date: ${arr[i].volumeInfo.publishedDate}`;
      asideCardCategory.textContent = `Category: ${arr[i].volumeInfo.categories}`;
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
  })
  .catch((err) => {
    console.log(err);
    const errorMsg = document.createElement("h2");
    errorMsg.textContent =
      "There was an error fetching the data, try with another keyword.";
    asideSectionEl.appendChild(errorMsg);
  });

function getBooks(e) {
  // e.preventDefault();

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
        let moreBtn = document.createElement("button");

        let subDescription = data.description.substring(0, 40);
        moreBtn.textContent = "See more";
        moreBtn.addEventListener("click", moreDescription);

        card.innerHTML = `<img src=${data.imageLinks.thumbnail}>`;
        cardTitle.textContent = data.title;
        cardAuthor.innerHTML = `<strong>Authors</strong>: ${data.authors}`;
        cardPublisher.innerHTML = `<strong>Publisher</strong>: ${data.publisher}`;
        cardYear.innerHTML = `<strong>Date</strong>: ${data.publishedDate}`;
        cardCategory.innerHTML = `<strong>Category</strong>: ${data.categories}`;
        cardDescription.innerHTML = `<strong>Description</strong>: ${subDescription}...`;

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

        sectionEl.appendChild(card);
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

asideBtns.forEach((button) => {
  button.addEventListener("click", exampleBooks);
});

function exampleBooks(e) {
  // e.preventDefault();

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
    })
    .catch((err) => {
      console.log(err);
      const errorMsg = document.createElement("h2");
      errorMsg.textContent =
        "There was an error fetching the data, try with another keyword.";
      asideSectionEl.appendChild(errorMsg);
    });
}
