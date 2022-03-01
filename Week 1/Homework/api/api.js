import { sectionEl, createBook, searchInput } from "../app.js";

export function getUrl(e) {
  e.preventDefault();
  sectionEl.innerHTML = "";
  console.log("done");

  let inputValue = searchInput.value;
  let url = `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`;

  getData(url);
}

export function getData(url) {
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
