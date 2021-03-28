//const { response } = require("express");

// handle API call to google books.
const searchBooks = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({ search: searchInput }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
  console.log(data.items[0].volumeInfo.title);
  console.log(data.items[0].volumeInfo.authors);
  console.log(data.items[0].volumeInfo.description);
  console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

  document.querySelector(".getBook").innerHTML = "";
  renderAllBooks(data);
};

const renderAllBooks = (volumeData) => {
  //event.preventDefault();
  console.log(volumeData);
  const getBooks = document.querySelector(".getBook");
  //for (let i = 0; i < volumeData.length; i++) {

  let bookCard =
          `
     <div class="card mb-5">
        <div class="row g-0">
          <div class="col-md-2 picApi">
            <img src="${volumeData.items[0].volumeInfo.imageLinks.thumbnail}" alt="...">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">${volumeData.items[0].volumeInfo.title}</h5>
              <p class="card-text">${volumeData.items[0].volumeInfo.description}</p>
              <p class="card-text"><small class="text-muted">${volumeData.items[0].volumeInfo.authors}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  getBooks.insertAdjacentHTML("beforeend", bookCard);
  //addHaveRead(volumeData);
}
//}

const addHaveRead = async (event) => {
  event.preventDefault();

 // const getHaveRead = await document.querySelector(".haveRead");

  const response = await fetch("/api/books/past", {
    method: "POST",
    body: JSON.stringify({ 
      title: "Book title",
      description: "description",
      image_link: "",
      author: "author",
     }),
    headers: { "Content-Type": "application/json" },

  });
  console.log(response);
}

/********Add books to my I want to read list***********/
const addWantRead = () => {
  //event.preventDefault();
  console.log(volumeData.items);
  const haveReadBooks = document.querySelector(".haveRead");
//for (let i = 0; i < volumeData.length; i++) {

  let haveWantCard =
          `
     <div class="card mb-3" col-md-3>
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${volumeData.items[0].volumeInfo.imageLinks.thumbnail}" alt="...">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">${volumeData.items[0].volumeInfo.title}</h5>
              <p class="card-text"><small class="text-muted">${volumeData.items[0].volumeInfo.authors}</small></p>
            </div>
          </div>
        </div>
      </div>
      `;
      haveReadBooks.insertAdjacentHTML("beforeend", haveWantCard);
}

document.querySelector("#booksearch").addEventListener("click", searchBooks);
document.querySelector("#btn-haveread").addEventListener("click", addHaveRead);
document.querySelector("#btn-wantread").addEventListener("click", addWantRead);
