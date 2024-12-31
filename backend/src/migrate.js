
const db = require("./db/dbConfig");


const createUsersTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS users (
            userid INT AUTO_INCREMENT PRIMARY KEY, 
            username VARCHAR(255) NOT NULL UNIQUE, 
            firstname VARCHAR(255) NOT NULL, 
            lastname VARCHAR(255) NOT NULL, 
            email VARCHAR(255) NOT NULL UNIQUE, 
            password VARCHAR(255) NOT NULL, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )
    `;

  return db.query(query);
};

// Function to create the questions table
const createQuestionsTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS questions (
            questionid VARCHAR(36) PRIMARY KEY, 
            userid INT NOT NULL, 
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
            FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE 
        )
    `;

  return db.query(query);
};

// Function to create the answers table
const createAnswersTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS answers (
            answerid INT AUTO_INCREMENT PRIMARY KEY,
            answer TEXT NOT NULL, 
            questionid VARCHAR(36), 
            userid INT, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
            FOREIGN KEY (questionid) REFERENCES questions(questionid) ON DELETE CASCADE, 
            FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE 
        )
    `;

  return db.query(query);
};

// Run all migrations
const runMigrations = async () => {
  try {
    await createUsersTable(); // Create users table
    console.log("Users table created or already exists.");

    await createQuestionsTable(); // Create questions table
    console.log("Questions table created or already exists.");

    await createAnswersTable(); // Create answers table
    console.log("Answers table created or already exists.");
  } catch (err) {
    console.error("Error running migrations:", err); // Catch and log any errors
  } finally {
    db.end(); // Close the database connection
  }
};

// Execute the migrations
runMigrations();
