const allBooks= [
    { id: 1, title: 'Martyr!', author: 'Kaveh Akbar', genre: 'Fiction', weeks: 1},
    { id: 2, title: 'James', author: 'Percival Everett', genre: 'Fiction', weeks: 2},
    { id: 3, title: 'The Life Impossible', author: 'Matt Haig', genre: 'Fiction', weeks: 3},
    { id: 4, title: 'After Annie', author: 'Anna Quindlen', genre: 'Fiction', weeks: 2},
    { id: 5, title: 'The God of the Woods', author: 'Liz Moore', genre: 'Fiction', weeks: 5 },
    { id: 6, title: 'Intermezzo', author: 'Sally Rooney', genre: 'Fiction', weeks: 4},
    { id: 7, title: 'The Housemaid', author: 'Freida McFadden', genre: 'Mystery', weeks: 15},
    { id: 8, title: 'The Hunter', author: 'Tana French', genre: 'Mystery', weeks: 8},
    { id: 9, title: 'The Blue Hour', author: 'Paula Hawkins', genre: 'Mystery', weeks: 6},
    { id: 10, title: 'We Solve Murders', author: 'Richard Osman', genre: 'Mystery', weeks: 9},
    { id: 11, title: 'The Grey Wolf', author: 'Louis Penny', genre: 'Mystery', weeks: 10},
    { id: 12, title: 'The Last One at the Wedding', author: 'Jason Rekulak', genre: 'Mystery', weeks: 4},
    { id: 13, title: "Merlin's Tour of the Universe", author: 'Neil DeGrasse Tyson', genre: 'Nonfiction', weeks: 6},
    { id: 14, title: 'John Lewis - A Life', author: 'David Greenberg', genre: 'Nonfiction', weeks: 15},
    { id: 15, title: 'Nexus', author: 'Yuval Noah Harari', genre: 'Nonfiction', weeks: 8},
    { id: 16, title: "Don't Believe Everything You Think", author: 'Joseph Nguyen', genre: 'Nonfiction', weeks: 5},
    { id: 17, title: 'The Elements of Marie Curie', author: 'Dava Sobel', genre: 'Nonfiction', weeks: 8},
    { id: 18, title: 'The Backyard Bird Chronicles', author: 'Amy Tan', genre: 'Nonfiction', weeks: 8},
    { id: 19, title: 'The Most Wonderful Crime of the Year', author: 'Ally Carter', genre: 'Romance', weeks: 4},
    { id: 20, title: 'This Summer Will Be Different', author: 'Carley Fortune', genre: 'Romance', weeks: 4},
    { id: 21, title: 'Not In Love', author: 'Ali Hazelwood', genre: 'Romance', weeks: 6},
    { id: 22, title: 'Funny Story', author: 'Emily Henry', genre: 'Romance', weeks: 15},
    { id: 23, title: 'The Paradise Problem', author: 'Christina Lauren', genre: 'Romance', weeks: 10},
    { id: 24, title: 'A Jingle Bell Mingle', author: 'Julie Murphy & Sierra Simone', genre: 'Romance', weeks: 5},
]  

let categories = new Map();
let allProducts;

function loadProducts(products) {
    document.querySelector('#product-list').innerHTML = '';

    products.forEach(product => {
    let categorySlug = product.category.replaceAll(' ', '_').replaceAll("'", '');
    categories.set(product.category, categorySlug);

    addProduct(product);
    });

if (products.length == 0) document.querySelector('#product-list').innerHTML = '<p>No matching products.</p>';
}
 
function addProduct(item) {

const template = document.getElementById("card-template").content.cloneNode(true);
    template.querySelector('.card-title').innerText = item.title;
    template.querySelector('.card-header').innerHTML = getCategoryIcon(item.category) + item.category;
    template.querySelector('.card-sub-title').innerText = item.author;
    template.querySelector('.card-img-top').src = item.image;
    template.querySelector('.card-img-top').alt = item.genre;
    template.querySelector('.card-text').innerText = item.description.substring(0, 50) + '...';
    template.querySelector('.card').className = 'card ' + categories.get(item.category);
    template.querySelector('.card').id = 'product' + item.id;
    template.querySelector('.btn').addEventListener('click', (e) => expandText(e, item.id, item.description));
    document.querySelector('#product-list').appendChild(template);
}

function getCategoryIcon(cat) {
    switch (cat.toLowerCase()) {
        case "fiction": return '<i class="fa-solid fa-glasses"></i> ';
        case "mystery": return '<i class="fa-solid fa-user-secret"></i> ';
        case "nonfiction": return '<i class="fa-solid fa-brain"></i> ';
        case "romance": return '<i class="fa-solid fa-heart"></i> ';
    }

    return '<i class="fa-solid fa-book"></i> ';
}

function sortProducts(e) {
    let selectedOrder = e.target.value;
    let sortedProducts = [...allProducts];

    switch (selectedOrder) {
        case 'price_lohi': sortedProducts.sort((p1, p2) => p1.price - p2.price); break;
        case 'price_hilo': sortedProducts.sort((p1, p2) => p2.price - p1.price); break;
        case 'title_az': sortedProducts.sort((p1, p2) => p2.title == p1.title ? 0 : (p1.title > p2.title ? 1 : -1)); break;
        case 'title_za': sortedProducts.sort((p1, p2) => p2.title == p1.title ? 0 : (p2.title > p1.title ? 1 : -1)); break;
    }

    loadProducts(sortedProducts)
}
