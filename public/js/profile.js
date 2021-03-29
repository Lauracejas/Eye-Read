//const { response } = require("express");

// handle API call to google books.
const searchBooks = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  // const response = await fetch("/api/books", {
  //   method: "POST",
  //   body: JSON.stringify({ search: searchInput }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const data = await response.json();
  // console.log(data);
  // console.log(data.items[0].volumeInfo.title);
  // console.log(data.items[0].volumeInfo.authors);
  // console.log(data.items[0].volumeInfo.description);
  // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

  location.replace(`/search/${searchInput}`);

  // document.querySelector(".getBook").innerHTML = " ";
  //renderAllBooks(data);
};

const renderAllBooks = async (volumeData) => {
  console.log(volumeData)
  const getBooks = document.querySelector(".getBook");
  const response = await fetch(`/api/books`, {
    method: 'POST',
    body: JSON.stringify({ volumeData }),
    headers: {
      'Content-Type': 'application/json',
    },
  }); 
  
}

// const renderAllBooks = (volumeData) => {
//   console.log(volumeData);
//   const getBooks = document.querySelector(".getBook");
//   for (let i = 0; i < volumeData.items.length; i++) {

  //   let bookCard =
  //     `
  //    <div class="card mb-5">
  //       <div class="row g-0">
  //         <div class="col-md-2 picApi">
  //           <img src="${volumeData.items[i].volumeInfo.imageLinks.thumbnail}" alt="...">
  //         </div>
  //         <div class="col-md-10">
  //           <div class="card-body">
  //             <h5 class="card-title">${volumeData.items[i].volumeInfo.title}</h5>
  //             <p class="card-text">${volumeData.items[i].volumeInfo.description}</p>
  //             <p class="card-text"><small class="text-muted">${volumeData.items[i].volumeInfo.authors}</small></p>
  //             <button class="btn btn-haveRead" data-bookId="${volumeData.items[i].id}">Have Read</button>
  //             <button class="btn btn-wantRead" data-wantbookId="${volumeData.items[i].id}">Want Read</button>
  //           </div>
  //         </div>
  //         </div>
  //     </div>
  // `;
  //   getBooks.insertAdjacentHTML("beforeend", bookCard);
    //addHaveRead(id);
//   };
// }

const addHaveRead = async (id, read) => {
  console.log(id);

  // const haveReadBook = document.querySelector(".haveReadList");
  // const clickHaveRead = document.querySelector(".btn-haveRead");

  //if (haveReadBook && clickHaveRead) {
    const response = await fetch(`/api/books/past`, {
      method: 'POST',
      body: JSON.stringify({ id, read}),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 
    if (response.ok) {
      
    }
 // }

};


document.querySelector("#booksearch").addEventListener("click", searchBooks);

document.querySelector('body').addEventListener('click', event => {
  if (event.target.matches('.btn-haveRead')) {
    console.log('click');
    addHaveRead(event.target.getAttribute('data-bookId'), true);
  }
  else if (event.target.matches('.btn-wantRead')) {
    addHaveRead(event.target.getAttribute('data-wantbookId'), false);
  }
})


