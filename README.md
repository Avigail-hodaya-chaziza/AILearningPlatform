AI-Driven Learning Platform
Project Overview
This AI-driven learning platform allows users to select learning topics, submit questions to an AI model, and receive personalized lessons. The system includes a support system with REST API, database, and integration with an AI model. The project also includes a user interface (frontend).

Technical Requirements
backend
Language: C#

Architecture: 3-Tier Model

Database: Microsoft SQL Server

Integration: Integration with an AI model (via API)

frontend
Language: React

Design: Responsive UI

System Architecture
The backend of the project is built on a 3-tier model, which ensures separation of responsibilities:

API Layer: Handles incoming HTTP requests from the frontend.

Business Logic Layer (BLL): Contains all business logic and rules.

Data Access Layer (DAL): Responsible for all communication with the database.

The frontend is developed using React and is responsible for communicating with the API and presenting data to the user.

Using SQL
The database is based on Microsoft SQL Server and includes tables such as users, categories, subcategories, and directives with defined relationships.

Installation and Operation
To run the system, the backend and frontend must be run separately. Make sure that the database connection settings are correct in the project configuration files.
