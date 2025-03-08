# Nepalese Game Portal – A Fun Online Experience

## Introduction
Welcome to the Nepalese Game Portal – A Fun Online Experience! This web application is a gaming portal where users can sign up, log in, and enjoy various Nepalese games. In addition to offering an engaging gaming experience, this portal provides information about various games played in Nepal, offering users a comprehensive and culturally rich understanding of Nepalese gaming traditions. Guests without login credentials can view basic content about games but will not have access to detailed game information or the ability to play games.

## Problem Statement
Nepal boasts a rich and diverse cultural heritage, which includes a variety of traditional games. Many of these games are unique to Nepal and reflect its cultural nuances and historical significance. However, several challenges exist:
- **Lack of Online Availability:** Not all traditional Nepalese games are available to play online. This limits their accessibility and the ability for a broader audience to experience and enjoy them.
- **Unique Games:** Some Nepalese games are unique and are not played or recognized internationally. These games often have distinct rules and play styles that are not widely known outside Nepal.
- **Common Games with Different Names:** Some Nepalese games share similarities with international games but have different names and slight variations in rules. This can lead to confusion and a lack of recognition.
- **Inadequate Documentation:** Many traditional Nepalese games are not documented properly. The rules, history, and cultural significance of these games are often passed down orally, leading to inconsistent and incomplete information.
- **Cultural Preservation:** There is a need to preserve and promote these traditional games to ensure they remain a vital part of Nepalese culture for future generations.

## Features
### User Authentication
- **Sign Up:** Users can register by providing necessary information to create an account.
- **Login:** Registered users can log in to access detailed game information and play games.
- **Encryption:** Secure storage of passwords in encrypted form to protect user data.

### Game Listing and Details
- **Game List:** Displays a list of all available games, including brief descriptions.
- **Game Details:** Provides detailed information about each game, such as rules, history, and how to play.

### Profile Management
- **User Profile:** Allows users to update their profile information, including username and password.
- **Admin Management:** Admins can view and edit all users' profiles. They can also manage game content, including adding, editing, and deleting games.

### Game Development
- **Simple Games:** Currently includes Tic-Tac-Toe that users can play directly on the portal.
- **Points System:** Implements a points calculation system for future games like Teen Patti, enhancing the gaming experience.
- **Future Expansion:** Plans to extend the application with more games, including Teen Patti (Three-card brag), incorporating user feedback and advanced features.

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript, AJAX
- **Backend:** Node.js, Express, JSON or XML
- **Server:** `http://localhost:4200` (frontend) and `http://localhost:5000` (backend)
- **Database:** MySQL (or any other relational database)
- **Security:** Password encryption using bcrypt
- **Testing:** Unit testing

## Data Collection Method
The primary method for data collection in this project is secondary research. This involves gathering existing information from various sources to ensure comprehensive and accurate data collection. The steps include:

- **Books and Articles:** Utilize academic books, journals, and articles that discuss Nepalese culture and traditional games.
- **Online Resources:** Refer to reliable websites, blogs, and online forums dedicated to Nepalese games or cultural heritage.
- **Documentaries & Videos:** Watch documentaries and videos that feature traditional Nepalese games and their significance.
- **Reports and Studies:** Access reports and studies conducted by cultural organizations and researchers on traditional games.
- **Historical Records:** Explore historical records and archives that document the evolution and rules of traditional Nepalese games.

## Database
### User Table
The `users` table stores information about users in the system. It has fields such as `user_id` (INT, auto increment, primary key) to uniquely identify each user, `username` (VARCHAR) to store the user’s name, `email` (VARCHAR) for the user’s email address, `password` (VARCHAR) for storing the user’s password, and `created_date` (TIMESTAMP, default current timestamp) to record when the user account was created. Each field has a specific data type that ensures the data stored is valid and appropriate for its purpose.

| Field         | Data Type    | Description                            |
|---------------|--------------|----------------------------------------|
| user_id       | INT          | User ID, auto increment (primary key)  |
| first_name    | VARCHAR(255) | User's first name                      |
| last_name     | VARCHAR(255) | User's last name                       |
| username      | VARCHAR(255) | Username                               |
| email         | VARCHAR(255) | Email address                          |
| password      | VARCHAR(255) | Password                               |
| is_admin      | BOOLEAN      | Admin or not, default is false         |
| created_date  | TIMESTAMP    | Default current timestamp              |
| modified_date | TIMESTAMP    | Default modified timestamp             |

### Game Table
The `games` table contains details about various games. It includes fields such as `game_id` (INT, auto increment, primary key) to uniquely identify each game, `game_name` (VARCHAR) for the name of the game, `category` (VARCHAR) for the category of the game, `description` (TEXT) to provide a description of the game, `game_rule` (TEXT) to outline the rules of the game, `image_url` (VARCHAR) to store the URL of an image representing the game, and `created_date` (TIMESTAMP, default current timestamp) to track when the game entry was created. These fields and their data types help organize and store information about the games effectively.

| Field            | Data Type    | Description                                     |
|------------------|--------------|-------------------------------------------------|
| game_id          | INT          | Game ID, auto increment (primary key)           |
| game_name        | VARCHAR(255) | Name of the game                                |
| category         | VARCHAR(255) | Category of the game                            |
| description      | TEXT         | Description of the game                         |
| game_rule        | TEXT         | Rules of the game                               |
| image_url        | VARCHAR(255) | URL to an image representing the game           |
| type             | VARCHAR(255) | Type (Indoor/Outdoor)                           |
| created_date     | TIMESTAMP    | Default current timestamp                       |
| modified_date    | TIMESTAMP    | Modified date timestamp                         |

## Features Overview
### User-Friendly Interface
The portal features a user-friendly interface that allows users to easily navigate through different sections, view game listings, and access detailed information about each game.

### Secure Authentication
Users can securely sign up and log in to access exclusive content and features. Passwords are encrypted for added security.

### Comprehensive Game Information
Logged-in users can view detailed information about each game, including its rules, history, and cultural significance. This helps in preserving and promoting traditional Nepalese games.

### Play Games Online
Users can play simple games like Tic-Tac-Toe directly on the portal. Future games, including Teen Patti (Three-card brag), will be added to enhance the gaming experience.

### Profile Management
Users can update their profile information, while admins have the ability to manage all user profiles and game content. This ensures the portal remains up-to-date and relevant.

### Continuous Improvement
The portal is designed with future expansion in mind. Feedback from users will be incorporated to add more games and features, making the portal a continuously evolving platform.

## Conclusion
This project aims to create an engaging and secure online gaming portal that highlights Nepalese games. Through this project, I have applied the concepts learned in this course, such as web document structure, authentication flows, form validation, and server-side programming. The application serves as a foundation for future enhancements and additional game development.
