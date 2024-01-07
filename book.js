/*
1. Store all book objects in an array
- take user input
- create new book
- store in array
2. Create function that loops through the array
- displays each book on the page
*/
//submit button
const submitNewBookForm = document.getElementById("submit-new-book-btn");
//close button
const closeNewBookForm = document.getElementById("close-new-book-btn");
//JS Functions for the Add New Book Button
const addNewBookBtn = document.getElementById("add-new-book-btn");
const newBookFormContainer = document.querySelector(".new-book-form-container");
addNewBookBtn.addEventListener("click", () => {
  newBookFormContainer.classList.add("show-new-book-form");
});

//Getting the elements of the user

const myLibrary = []; //intializing empty array

//Book constructor for creating book objects
function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

//Takes user input and stores book in the array
function addBookToLibrary() {
  let userTitle = document.getElementById("title").value;
  let userAuthor = document.getElementById("author").value;
  let userNumPage = document.getElementById("page-number").value;
  let userIsRead = document.querySelector('input[name="have-read"]:checked');
  const isReadValue = userIsRead ? userIsRead.value : "No";

  const book = new Book(userTitle, userAuthor, userNumPage, isReadValue);

  myLibrary.push(book);
}

//Function that loops through the array and displays the books
function displayBooks() {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = ""; // Clear existing content to avoid duplicates

  myLibrary.forEach((book, index) => {
    const tableRow = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    tableRow.appendChild(titleCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    tableRow.appendChild(authorCell);

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.numPages;
    tableRow.appendChild(pagesCell);

    const readCell = document.createElement("td");
    readCell.textContent = book.isRead;
    tableRow.appendChild(readCell);

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash-alt");
    removeButton.appendChild(trashIcon);
    removeButton.addEventListener("click", () => removeBook(index));
    removeCell.appendChild(removeButton);
    tableRow.appendChild(removeCell);

    bookContainer.appendChild(tableRow);
  });
}

// Function to remove book from the library array and update display
function removeBook(index) {
  myLibrary.splice(index, 1); // Remove the book at the specified index
  saveBooksToStorage(myLibrary); // Update local storage after removing the book
  displayBooks(); // Re-display books after removal
}

//Local Storage
//Books stay saved no matter what
function retrieveBooksFromStorage() {
  const storedBooks = localStorage.getItem("libraryBooks");
  if (storedBooks) {
    return JSON.parse(storedBooks);
  } else {
    return [];
  }
}
//Saving books to local storage
function saveBooksToStorage(books) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}
//Loading as user opens window page
window.addEventListener("load", () => {
  const storedBooks = retrieveBooksFromStorage();
  if (storedBooks.length > 0) {
    myLibrary.push(...storedBooks);
  }
  displayBooks();
});

//Function of submit button
//Once user submits, we call addBookToLibrary followed by displayBooks

submitNewBookForm.addEventListener("click", () => {
  addBookToLibrary();
  saveBooksToStorage(myLibrary);

  // Reset form after adding a book
  document.getElementById("new-book-form").reset();

  // Display books after adding a new one
  displayBooks();
});

//Function of close button
//User clicks close button, it closes the add new book form
closeNewBookForm.addEventListener("click", () => {
  newBookFormContainer.classList.remove("show-new-book-form");
});
