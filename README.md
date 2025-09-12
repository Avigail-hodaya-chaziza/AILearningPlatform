AI-Driven Learning Platform
Project Overview
This AI-driven learning platform allows users to select study topics, submit questions to an artificial intelligence model, and receive personalized lessons. The system includes a backend with a REST API, a database, and integration with an AI model. The project also features a simple user interface (frontend).

Technologies Used
Backend
Language: C#

Architecture: 3-Tier Model

Database: Microsoft SQL Server

Integration: AI model integration (via API)

Frontend
Language: React

Design: Responsive user interface

System Architecture
The project's backend is built on a 3-tier model, ensuring a separation of responsibilities:

API Layer: Handles HTTP requests from the frontend.

Business Logic Layer (BLL): Contains all business logic and business rules.

Data Access Layer (DAL): Responsible for all communication with the database.

The frontend is developed in React and is responsible for communicating with the API and displaying data to the user.

Assumptions
Microsoft SQL Server database is installed and configured correctly.

The .NET module is installed on the system to run the backend.

The npm package manager is installed on the system to run the frontend.

Installation and Operation Instructions
Backend
Install Dependencies: Open the project in Visual Studio or a code editor and ensure all dependencies are loaded.

Database Connection: Ensure the database connection is correctly configured in the appsettings.json file.

Run: Run the following command from the terminal in the backend directory:

dotnet run

Frontend
Navigate to Directory: Navigate to the frontend directory.

Install Dependencies: Run the following command from the terminal to install the dependencies:

npm install

Run: Run the following command from the terminal to start the local server:

npm start

SQL Usage
The database is based on Microsoft SQL Server and includes tables such as users, categories, sub_categories, and prompts with defined relationships.
