const Library = [];

function Book(author, title, pages, read=false) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}


Book.prototype.toggleRead = function() {
    this.read = !this.read
};

function addBook(book) {
    let booksPanel = document.getElementById("books-panel");

    /* Add the div for a new book*/
    let newDiv = document.createElement("div");
    newDiv.classList.add("book");
    newDiv.setAttribute("book", book);
    newDiv.innerHTML = `<p class="title">${book.title}</p>
                        <p class="author">${book.author}</p>
                        <p class="pages">${book.pages}</p>`;
    
    /* Read/unread button */
    let buttons = document.createElement("div");
    buttons.classList.add("buttons-div");
    let readButton = document.createElement("button");
    if (book.read){readButton.textContent = "Read";}
    else {readButton.textContent = "Unread";}
    
    readButton.addEventListener("click", function() {
        book.toggleRead();
        generateBooks();
    });
    buttons.appendChild(readButton);

    /* Delete Button */
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    buttons.appendChild(deleteButton);
    deleteButton.addEventListener("click", function() {
        Library.splice(Library.indexOf(book), 1);
        generateBooks();
    })

    newDiv.appendChild(buttons);

    booksPanel.appendChild(newDiv);
}

function showForm() {
    let bookForm = document.getElementById("new-book-form");
    bookForm.style.display = "block";
}

function addFormBook(event){
    event.preventDefault();
    /* Hide the Form*/
    let bookForm = document.getElementById("new-book-form");
    bookForm.style.display = "none";
    /* Add new book */
    
    let readBook = false;
    if (document.getElementById("radio-yes").checked) {
        readBook = true;
    }

    let newBook = new Book(
        document.getElementById("author").value,
        document.getElementById("title").value,
        document.getElementById("pages").value,
        readBook
    );  
    Library.push(newBook);
    generateBooks();
    
    bookForm.reset();
}

function generateBooks() {
    document.getElementById("books-panel").innerHTML = `<svg id="addBook" version="1.1" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="m12.5 28v-12.5h-12.5v-3h12.5v-12.5h3v12.5h12.5v3h-12.5v12.5z"/></svg>`;
    document.getElementById("addBook").addEventListener("click", showForm)

    for (let book of Library) {
        addBook(book);
    }
}

/* Main Code Starts Here */

Library.push(new Book('Bill', "Bill's Kitchen", 150, true));
Library.push(new Book('J.R.R Tolkien', "Lord of the Rings", 1000, false));
Library.push(new Book('James Jonathan', "JJ's Ultimate Survival Guide", 5, false));
document.getElementById("add-book-button").addEventListener("click", addFormBook, false)
generateBooks();