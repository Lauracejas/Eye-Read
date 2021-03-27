// handle API call to google books.
const searchBooks = async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector(".search-input").value.trim();

  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({ search: searchInput.value }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);

  renderBook(data);
};



// Add a book I have read to a mysql database
// const addHaveRead = (event) => {
//   event.preventDefault();
//   const haveReadTable = [];
//var searchInput = JSON.parse({ search: searchInput.value }) || [];  
//};

// Add a book I want read to a mysql database
// const addWantRead = async (event) => {
//   event.preventDefault();

// };


document.querySelector("#booksearch").addEventListener("click", searchBooks);
document.querySelector("#btn-haveread").addEventListener("click", addHaveRead);
document.querySelector("#btn-wantread").addEventListener("click", addWantRead);
