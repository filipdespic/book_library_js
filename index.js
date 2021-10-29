let library = [];

function Book(title, author, publisher, read) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.read = read;
}

function addBookToLibrary(book) {
    if (book != null) {
        library.push(book);
    }
}

let book1 = new Book("Ivo Andric", "Na Drini cuprija", "Laguna", true);
addBookToLibrary(book1);

let book2 = new Book("Ernest Hemingvej", "Starac i more", "Laguna", true);
addBookToLibrary(book2);


library.forEach(b => {
    console.log(b);

    let content = document.getElementById("content");
    let div = document.createElement('div');
    div.className = "element";

    let title = document.createElement('h3');
    title.innerText = "Naziv: " + b.title;
    let author = document.createElement('h4');
    author.innerText = "Autor: " + b.author;
    let publisher = document.createElement('h4');
    publisher.innerText = "Izdavac: " + b.publisher;
    let read = document.createElement('h4');
    read.innerText = "Procitano: " + b.read;
    

    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(publisher);
    div.appendChild(read);

    content.appendChild(div);

});