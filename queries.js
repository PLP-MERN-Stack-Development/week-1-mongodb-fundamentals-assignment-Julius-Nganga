// queries.js - Comprehensive MongoDB Bookstore Operations

// =============================================
// TASK 2: BASIC CRUD OPERATIONS
// =============================================

// 1. Find all books in a specific genre
function findBooksByGenre(genre) {
    return db.books.find({ genre: genre });
}

// 2. Find books published after a certain year
function findBooksPublishedAfter(year) {
    return db.books.find({ published_year: { $gt: year } });
}

// 3. Find books by a specific author
function findBooksByAuthor(author) {
    return db.books.find({ author: author });
}

// 4. Update the price of a specific book
function updateBookPrice(title, newPrice) {
    return db.books.updateOne(
        { title: title },
        { $set: { price: newPrice, last_updated: new Date() } }
    );
}

// 5. Delete a book by its title
function deleteBookByTitle(title) {
    return db.books.deleteOne({ title: title });
}

// =============================================
// TASK 3: ADVANCED QUERIES
// =============================================

// 1. Find books in stock published after 2010
function findInStockBooksAfter2010() {
    return db.books.find({
        in_stock: true,
        published_year: { $gt: 2010 }
    });
}

// 2. Projection for title, author, and price
function getBooksProjection() {
    return db.books.find(
        {},
        { title: 1, author: 1, price: 1, _id: 0 }
    );
}

// 3. Sorting by price
function sortBooksByPrice(ascending = true) {
    return db.books.find().sort({ price: ascending ? 1 : -1 });
}

// 4. Pagination (5 books per page)
function getPaginatedBooks(pageNumber) {
    const pageSize = 5;
    return db.books.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
}

// =============================================
// TASK 4: AGGREGATION PIPELINES
// =============================================

// 1. Average price by genre
function getAveragePriceByGenre() {
    return db.books.aggregate([
        { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
    ]);
}

// 2. Author with most books
function findAuthorWithMostBooks() {
    return db.books.aggregate([
        { $group: { _id: "$author", bookCount: { $sum: 1 } } },
        { $sort: { bookCount: -1 } },
        { $limit: 1 }
    ]);
}

// 3. Books by publication decade
function groupBooksByDecade() {
    return db.books.aggregate([
        {
            $project: {
                decade: {
                    $subtract: [
                        "$published_year",
                        { $mod: ["$published_year", 10] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: "$decade",
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
}

// =============================================
// TASK 5: INDEXING
// =============================================

// 1. Create index on title field
function createTitleIndex() {
    return db.books.createIndex({ title: 1 });
}

// 2. Create compound index on author and published_year
function createAuthorYearIndex() {
    return db.books.createIndex({ author: 1, published_year: 1 });
}

// 3. Explain query performance
function explainQueryPerformance(query) {
    return db.books.find(query).explain("executionStats");
}

// =============================================
// EXPORT FOR NODE.JS APPLICATIONS
// =============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // CRUD Operations
        findBooksByGenre,
        findBooksPublishedAfter,
        findBooksByAuthor,
        updateBookPrice,
        deleteBookByTitle,
        
        // Advanced Queries
        findInStockBooksAfter2010,
        getBooksProjection,
        sortBooksByPrice,
        getPaginatedBooks,
        
        // Aggregation Pipelines
        getAveragePriceByGenre,
        findAuthorWithMostBooks,
        groupBooksByDecade,
        
        // Indexing
        createTitleIndex,
        createAuthorYearIndex,
        explainQueryPerformance
    };
}