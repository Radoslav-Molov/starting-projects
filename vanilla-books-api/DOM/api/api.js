import {
  sectionEl,
  createBook,
  searchInput,
  cardContainer,
  formDiv,
  searchDiv,
} from "../app.js";

export function getUrl(e, url) {
  e.preventDefault();
  sectionEl.innerHTML = "";
  console.log("done");

  let inputValue = searchInput.value;
  url = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;

  getData(url);
}

export function getData(url) {
  searchDiv.style.display = "none";
  cardContainer.innerHTML = "";
  formDiv.style.display = "block";
  fetch(url)
    .then((resp) => resp.json())
    .then((response) => {
      response.items.forEach((book) => {
        createBook(book);
      });
      sectionEl.appendChild(cardContainer);
    })
    .catch((err) => {
      console.log(err);
      const errorMsg = document.createElement("h2");
      errorMsg.textContent =
        "There was an error fetching the data, try with another keyword.";
      sectionEl.appendChild(errorMsg);
    });
}
