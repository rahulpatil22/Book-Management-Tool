const mysql = require("mysql2");
const ExcelJS = require("exceljs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rahul@4972",
  database: "books_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

async function exportSchemaAndDataToExcel() {
  const workbook = new ExcelJS.Workbook();

  const schemaSheet = workbook.addWorksheet("Books Table Schema");

  schemaSheet.columns = [
    { header: "Column Name", key: "COLUMN_NAME", width: 20 },
    { header: "Data Type", key: "DATA_TYPE", width: 15 },
    { header: "Is Nullable", key: "IS_NULLABLE", width: 15 },
    { header: "Column Default", key: "COLUMN_DEFAULT", width: 20 },
    { header: "Extra", key: "EXTRA", width: 20 },
  ];

  connection.query(
    `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = 'books_db' AND TABLE_NAME = 'books'`,
    async (err, results) => {
      if (err) {
        console.error("Error fetching schema:", err);
        return;
      }

      results.forEach((row) => {
        schemaSheet.addRow(row);
      });

      console.log("Schema added to Excel.");
    }
  );

  const dataSheet = workbook.addWorksheet("Books Table Data");

  dataSheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Title", key: "title", width: 25 },
    { header: "Author", key: "author", width: 20 },
    { header: "Type", key: "type", width: 15 },
    { header: "Genre", key: "genre", width: 20 },
    { header: "Publication", key: "publication", width: 20 },
    { header: "Pages", key: "pages", width: 10 },
    { header: "Price", key: "price", width: 10 },
    { header: "Cover", key: "cover", width: 30 },
  ];

  connection.query("SELECT * FROM books", async (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      return;
    }

    rows.forEach((row) => {
      dataSheet.addRow(row);
    });

    console.log("Data added to Excel.");

    const filePath = "books_database.xlsx";
    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file created: ${filePath}`);

    connection.end();
  });
}

exportSchemaAndDataToExcel();
