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

  document.querySelector(".haveRead").innerHTML = "";
  renderAllBooks(data);
};