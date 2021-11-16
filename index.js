document.getElementById("addBookModal").style.display = "none";

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        //if (!this.isInLibrary(newBook)) {
        this.books.push(newBook)
        //}
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    // isInLibrary(newBook) {
    //     return this.books.some((book) => book.title === newBook.title)
    // }
}
const library = new Library();

const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');
const booksGrid = document.getElementById('booksGrid');



const openAddBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    
    document.getElementById("addBookModal").style.display = "block";
    // overlay.classList.add('active')
}

const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    // overlay.classList.remove('active')
    // errorMsg.classList.remove('active')
    // errorMsg.textContent = ''
}

const closeAllModals = () => {
    closeAddBookModal()
    //closeAccountModal()
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeAllModals()
}


/////////////////////////

const updateBooksGrid = () => {
    resetBooksGrid()
    for (let book of library.books) {
        createBookCard(book)
    }
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = ''
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('h3')
    const pages = document.createElement('h3')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    bookCard.classList.add('book-card')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    removeBtn.classList.add('btn-red')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('btn-light-green')
    } else {
        readBtn.textContent = 'Not read'
        readBtn.classList.add('btn-light-red')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(readBtn)
    bookCard.appendChild(removeBtn)
    booksGrid.appendChild(bookCard)
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}



const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()

    // if (library.isInLibrary(newBook)) {
    //   errorMsg.textContent = 'This book already exists in your library'
    //   errorMsg.classList.add('active')
    //   return
    // }

    // if (auth.currentUser) {
    //   addBookDB(newBook)
    // } else {
    library.addBook(newBook)
    //   saveLocal()
    updateBooksGrid()
    // }
    closeAddBookModal()
}

const removeBook = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')

    // if (auth.currentUser) {
    //   removeBookDB(title)
    // } else {
    library.removeBook(title)
    //saveLocal()
    updateBooksGrid()
    //}
}

const toggleRead = (e) => {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
    const book = library.getBook(title)

    //if (auth.currentUser) {
    //    toggleBookIsReadDB(book)
    //} else {
        book.isRead = !book.isRead
    //    saveLocal()
        updateBooksGrid()
    //}
}


addBookBtn.onclick = openAddBookModal
addBookForm.onsubmit = addBook


