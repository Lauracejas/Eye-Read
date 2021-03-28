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
    console.log(volumeData);
  const getBooks = document.querySelector(".getBook");
  for (let i = 0; i < volumeData.items.length; i++) {

  let bookCard =
          `
     <div class="card mb-5">
        <div class="row g-0">
          <div class="col-md-2 picApi">
            <img src="${volumeData.items[i].volumeInfo.imageLinks.thumbnail}" alt="...">
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h5 class="card-title">${volumeData.items[i].volumeInfo.title}</h5>
              <p class="card-text">${volumeData.items[i].volumeInfo.description}</p>
              <p class="card-text"><small class="text-muted">${volumeData.items[i].volumeInfo.authors}</small></p>
              <button class="btn btn-haveRead" id="btn-haveread">Have Read</button>
              <button class="btn btn-wantRead" id="btn-wantread">Want Read</button>
            </div>
          </div>
          </div>
      </div>
  `;
  getBooks.insertAdjacentHTML("beforeend", bookCard);
  addHaveRead();
}
}

const addHaveRead = async (event) => {
 // event.preventDefault();

 // const getHaveRead = await document.querySelector(".haveRead");

  const response = await fetch("/api/books/past", {
    method: "POST",
    body: JSON.stringify({ 
      title: "book title",
      description: "This is the descrption",
      image_link: "",
      author: "author",
      read: true,
     }),
    headers: { "Content-Type": "application/json" },

  }); 
  const data = await response.json();
  console.log(data);
}



/********Add books to my I want to read list***********/
const addWantRead = async (event) => {
 // event.preventDefault();
 
  //const haveReadBooks = document.querySelector(".haveRead");

  const response = await fetch("/api/books/past", {
    method: "POST",
    body: JSON.stringify({ 
      title: "Book title",
      //description: "description",
      image_link: "",
      author: "author",
      read: false,
     }),
    headers: { "Content-Type": "application/json" },

  });
  console.log(response);

}

document.querySelector("#booksearch").addEventListener("click", searchBooks);

document.querySelector('body').addEventListener('click', event => {
  if(event.target.matches('#btn-haveread')) {
    addHaveRead();
  }
})
document.querySelector('body').addEventListener('click', event => {
  if(event.target.matches('#btn-wantread')) {
    addWantRead();
  }
})

