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



Library.push(new Book('Bill', "Bill's Kitchen", 150, true));
Library.push(new Book('J.R.R Tolkien', "Lord of the Rings", 1000, false));
Library.push(new Book('James Jonathan', "JJ's Ultimate Survival Guide", 5, false));


function generateBooks() {
    document.getElementById("books-panel").innerHTML = "";

    for (let book of Library) {
        addBook(book);    
    }
}

generateBooks();