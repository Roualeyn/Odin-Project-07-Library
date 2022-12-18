class Book {
    constructor(author, title, pages, read=false) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }

    static library = [];

    static generateBooks() {
        document.getElementById("books-panel").innerHTML = `<svg id="addBook" version="1.1" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="m12.5 28v-12.5h-12.5v-3h12.5v-12.5h3v12.5h12.5v3h-12.5v12.5z"/></svg>`;
        document.getElementById("addBook").addEventListener("click", Book.showForm)
    
        for (let book of Book.library) {
            Book.addBook(book);
        }
    }

    static showForm() {
        let bookForm = document.getElementById("new-book-form");
        bookForm.style.display = "block";
    }

    static addBook(book) {
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
            Book.generateBooks();
        });
        buttons.appendChild(readButton);
    
        /* Delete Button */
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        buttons.appendChild(deleteButton);
        deleteButton.addEventListener("click", function() {
            Book.library.splice(Book.library.indexOf(book), 1);
            Book.generateBooks();
        })
    
        newDiv.appendChild(buttons);
    
        booksPanel.appendChild(newDiv);
    }

    static addFormBook() {
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
        Book.library.push(newBook);
        Book.generateBooks();
        document.getElementById("form-element").reset();
    }
};

/* Main Code Starts Here */
Book.library.push(new Book("H. G. Wells", "The War of the Worlds", 287, true));
Book.library.push(new Book("Jules Verne", "Around the World in Eighty Days", 237, false));
Book.library.push(new Book("The Shadow over Innsmouth", "H.P. Lovecraft", 138, false));
document.getElementById("form-element").addEventListener("submit", Book.addFormBook, false)
Book.generateBooks();