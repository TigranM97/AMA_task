# Project Overview

This application processes bank customer statement records in CSV and XML formats, performs validations on transaction references and end balances, and generates reports for failed records.

- [Technologies Used](#technologies-used)
- [Packages Used](#packages-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Runnning the application](#running-the-application)
- [Usage](#usage)
- [Validation Process](#validation-process)


## Technologies Used

- Node.js
- React

## Packages used
- csv-parse: A Node.js package used to parse CSV files and extract data.
- xml2js: Used for parsing XML files into a JavaScript object structure.
- multer: Middleware for handling file uploads in Node.js applications.


# Project Structure
 
There are two main directories in this project
-  server directory for the Express API (back-end)
- client directory for the React frontend (front-end)

# Installation

Node.js: Ensure you have Node.js installed. (v20.0.0)


sh  
//  Clone the Repository
 git clone https://github.com/TigranM97/AMA_task.git

sh  
//  Install server dependencies
cd server
npm install | yarn install

sh  
//  Install client dependencies
cd client
npm install | yarn install

 
# Running the Application

sh  
//  Run server
cd server
npm run start  | yarn start

sh  
//  Run client
cd client
npm run start  | yarn start

# Usage

After runnning the project:
- Open "http://localhost:3000" in your browser 
- Click UploadFile and choose records in XML or CSV format
- Press validate button
- After validation proccess, UI shows wrong record's description and references or text `Records are valid` 


# Validation Process

There are two main validations: uniqueness of transaction references and v**alidation of end balances(start balance + mutation).**