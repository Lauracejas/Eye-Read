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

  // document.querySelector(".getBook").innerHTML = " ";
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
              <button class="btn btn-haveRead" data-bookId="${volumeData.items[i].id}">Have Read</button>
              <button class="btn btn-wantRead" data-wantbookId="${volumeData.items[i].id}">Want Read</button>
            </div>
          </div>
          </div>
      </div>
  `;
    getBooks.insertAdjacentHTML("beforeend", bookCard);
    //addHaveRead(id);
  };
}

const addHaveRead = async (id) => {
  console.log(id);

  // const haveReadBook = document.querySelector(".haveReadList");
  // const clickHaveRead = document.querySelector(".btn-haveRead");

  //if (haveReadBook && clickHaveRead) {
    const response = await fetch(`/api/books/past`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); 
    if (response.ok) {
      
    }
 // }

};


// const addHaveRead = async (id) => {
//   console.log(id);
//  // event.preventDefault();
//   const getHaveRead = await document.querySelector("#btn-haveread");
//   console.log(id);
//   const response = await fetch("/api/books/past", {
//     method: "POST",
//     body: JSON.stringify({ getHaveRead
//       // title: "book title",
//       // description: "This is the descrption",
//       // image_link: "",
//       // author: "author",
//       // read: true,
//      }),
//     headers: { "Content-Type": "application/json" },

//   });
//   const data = await response.json(); 
//   console.log(data);
// }



//}



/********Add books to my I want to read list***********/
// const addWantRead = async (id) => {
//   console.log(id);
//   // event.preventDefault();

//   const haveReadBooks = document.querySelector(".wantRead");

//   const response = await fetch("/api/books/past", {
//     method: "POST",
//     body: JSON.stringify({
//       title: "Book title",
//       //description: "description",
//       image_link: "",
//       author: "author",
//       read: false,
//     }),
//     headers: { "Content-Type": "application/json" },

//   });

// }

document.querySelector("#booksearch").addEventListener("click", searchBooks);

document.querySelector('body').addEventListener('click', event => {
  if (event.target.matches('.btn-haveRead')) {
    console.log('click');
    addHaveRead(event.target.getAttribute('data-bookId'));
  }
  else if (event.target.matches('.btn-wantRead')) {
    addWantRead(event.target.getAttribute('data-wantbookId'));
  }
})
// document.querySelector('body').addEventListener('click', event => {
//   if (event.target.matches('.btn-wantRead')) {
//     addWantRead(event.target.dataset.id);
//   }
// })

