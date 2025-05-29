# 📚 PLP Bookstore MongoDB Project

This project demonstrates the use of MongoDB for managing a bookstore database called `plp_bookstore`. It includes basic and advanced CRUD operations, aggregation pipelines, indexing, and performance analysis using MongoDB Shell or Compass.

## 🧰 Tools & Technologies

- MongoDB (Local or Atlas Cloud)
- MongoDB Shell (mongosh)
- MongoDB Compass (GUI)
- JavaScript (for MongoDB scripts)

---

## 📦 Project Structure

| File | Description |
|------|-------------|
| `insert_books.js` | JavaScript file to populate the `books` collection with 10 sample book documents |
| `queries.js` | Contains all MongoDB queries: CRUD, advanced filters, projections, sorting, pagination, aggregation, and indexing |
| `README.md` | This file, containing instructions and project details |
| `screenshot.png` | Screenshot showing the `books` collection in MongoDB Compass or Atlas (for submission) |

---

## 📚 Database Details

- **Database Name**: `plp_bookstore`
- **Collection Name**: `books`

### 📘 Book Document Schema

Each book in the `books` collection includes:

```json
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "published_year": number,
  "price": number,
  "in_stock": boolean,
  "pages": number,
  "publisher": "string"
}
