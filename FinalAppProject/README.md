# Nepalese Game Portal – A Fun Online Experience

## Introduction
I propose to create a web application titled “Nepalese Game Portal – A Fun Online Experience.” This application will be a gaming portal where users can sign up, log in, and enjoy various Nepalese games. In addition to offering an engaging gaming experience, this portal will provide information about various games played in Nepal. This will offer users a comprehensive and culturally rich understanding of Nepalese gaming traditions. Guests without login credentials can view basic content about games but will not have access to detailed game information or the ability to play games.

## Problem Statement
Nepal boasts a rich and diverse cultural heritage, which includes a variety of traditional games. Many of these games are unique to Nepal and reflect its cultural nuances and historical significance. However, several challenges exist:
- **Lack of Online Availability:** Not all traditional Nepalese games are available to play online. This limits their accessibility and the ability for a broader audience to experience and enjoy them.
- **Unique Games:** Some Nepalese games are unique and are not played or recognized internationally. These games often have distinct rules and play styles that are not widely known outside Nepal.
- **Common Games with Different Names:** Some Nepalese games share similarities with international games but have different names and slight variations in rules. This can lead to confusion and a lack of recognition.
- **Inadequate Documentation:** Many traditional Nepalese games are not documented properly. The rules, history, and cultural significance of these games are often passed down orally, leading to inconsistent and incomplete information.
- **Cultural Preservation:** There is a need to preserve and promote these traditional games to ensure they remain a vital part of Nepalese culture for future generations.

## User Authentication
- **Sign Up:** Users can register by providing the necessary information.
- **Login:** Users can access detailed game information and play games.
- **Encryption:** Ensure secure storage of passwords in encrypted form.

## Game Listing and Details
- **Game List:** Display a list of all available games.
- **Game Details:** Provide detailed information about each game to logged-in users.

## Profile Management
- **User:** Allow users to update their profile, including username and password.
- **Admin:** Managers can view and edit all users and their profiles. Managers can also modify game content.

## Game Development
- **Simple Games:** Include at least one simple game (such as Tic-Tac-Toe or a card game) that users can play.
- **Future Expansion:** Plan to extend the application with more games after gaining more knowledge from advanced classes.

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript, AJAX
- **Backend:** Node.js, Express, JSON or XML
- **Server:** `http://localhost:3000` (web) and `http://localhost:3001` (data)
- **Database:** MySQL (or any other relational database)
- **Security:** Password encryption using bcrypt
- **Testing:** Unit testing

## Data Collection Method
The primary method for data collection in this project will be secondary research. This involves gathering existing information from various sources to ensure comprehensive and accurate data collection. The steps include:

- **Books and Articles:** Utilize academic books, journals, and articles that discuss Nepalese culture and traditional games.
- **Online Resources:** Refer to reliable websites, blogs, and online forums dedicated to Nepalese games or cultural heritage.
- **Documentaries & Videos:** Watch documentaries and videos that feature traditional Nepalese games and their significance.
- **Reports and Studies:** Access reports and studies conducted by cultural organizations and researchers on traditional games.
- **Historical Records:** Explore historical records and archives that document the evolution and rules of traditional Nepalese games.

## Database
### User Table
The name of the user table is `users`. The user table stores information about users in the system. It has fields such as `id` (INT, auto increment, primary key) to uniquely identify each user, `username` (VARCHAR) to store the user’s name, `email` (VARCHAR) for the user’s email address, `password` (VARCHAR) for storing the user’s password, and `created_at` (TIMESTAMP, default current timestamp) to record when the user account was created. Each field has a specific data type that ensures the data stored is valid and appropriate for its purpose.

| Field      | Data Type    | Description                            |
|------------|--------------|----------------------------------------|
| id         | INT          | User ID, auto increment (primary key)  |
| username   | VARCHAR(255) | Username                               |
| email      | VARCHAR(255) | Email address                          |
| password   | VARCHAR(255) | Password                               |
| created_at | TIMESTAMP    | Default current timestamp              |

### Game Table
The name of the game table is `games`. The game table contains details about various games. It includes fields such as `game_id` (INT, auto increment, primary key) to uniquely identify each game, `game_name` (VARCHAR) for the name of the game, `game_description` (TEXT) to provide a description of the game, `game_image_url` (VARCHAR) to store the URL of an image representing the game, and `created_at` (TIMESTAMP, default current timestamp) to track when the game entry was created. These fields and their data types help organize and store information about the games effectively.

| Field            | Data Type    | Description                                     |
|------------------|--------------|-------------------------------------------------|
| game_id          | INT          | Game ID, auto increment (primary key)           |
| game_name        | VARCHAR(255) | Name of the game                                |
| game_description | TEXT         | Description of the game                         |
| game_image_url   | VARCHAR(255) | URL to an image representing the game           |
| created_at       | TIMESTAMP    | Default current timestamp                       |

## User Stories
### Viewing Webpage without Login
As an anonymous user, I want to view the homepage so that I can see the general content and information available without needing to log in.

### Login
As a registered user, I want to log in to the website so that I can access my personal account and features restricted to logged-in users.

### Register
As a new user, I want to register an account so that I can gain full access to the website's features and services.

### View Game Information
As a logged-in user, I want to view detailed information about games so that I can learn about the game, its features, and how to play it.

### Play Games
As a logged-in user, I want to play games available on the website so that I can enjoy the gaming experience and track my progress.

## Conclusion
This project aims to create an engaging and secure online gaming portal that highlights Nepalese games. Through this project, I will apply the concepts learned in this course, such as web document structure, authentication flows, form validation, and server-side programming. The application will be a foundation for future enhancements and additional game development.
