# Vote Maadi

## Description about the project here...
This is a web application used to deploy elections online, aimed at hosting small scale elections. It is a secure platform with a easy to use interface. The application also analyses election/candidate data to provide insights about voting trends, and also sentiment analyze candidate's manifesto.

## Technologies 
MERN Stack

## Files

-   config
    -   default.json - Used to define any global variables
    -   db.js - Function for connecting to DB
-   middleware
    -   auth.js - Function for JWT token verification
-   models
    -   Any database collections required for the application are defined here
-   routes/api
    -   Any API's required for application are defined here
-   client/src
    -   Any files for frontend(React)

## Setup

1. Install MongoDB
2. Clone/Pull the repository
3. Run `npm install` to install all the required packages
4. Run `npm run dev` to run the frontend and backend servers together
5. Run `npm run server` to run only the server

## Tasks

### Frontend

-   Landing Page 
-   Sign Up and Sign In Pages 
-   Admin Page for managing elections
    -   creating, deleting elections
    -   adding voter list and candidate details
-   Viewing Elections
-   Candidate Info Page for voters to view
-   Voting Page
-   Results Page

### Backend

-   User Authentication 
-   User Sign In and Sign Up 
    -   email voters the link/pwd 
-   Create, List and Delete Elections
-   Add Candidate Details, Voter List
-   Update Votes, Get Votes for an election and 
-   Data Analytics
    -   Election, Voting Trends
    -   Sentiment Analysis
