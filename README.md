# The Problem it solves
My application solves project management, by allowing users to contribute to projects via updates, which allows everybody to follow along with the progress and see who did what.

# SetUp instructions
## 1. Clone the GitHub reposotory into your local projectfolder
1. Open Terminal
2. Change directory into your project folder
3. Enter `git clone https://github.com/JuriRappold/fullstack_lab.git`

## 2. Setting up the `./utils/` folder
1. run `npm run setup` **inside of the *UTILS* directory**

## 3. Setting Up the database (& backend)

1. Create/LogIn to your [MongoDB Account](https://account.mongodb.com/account/login)
2. Create a Cluster (Free Tier is enough) & Database
3. Click the three dots of the created cluster & '*click connect via...*'
4. Click on *Drivers* on the pop up
5. Follow instructions to the end
6. copy the provided URL `mongodb+srv://<username>:<password>@<clustername>.kj5113y.mongodb.net/?appName=<Clustername>`
7. Create a `.env` file, use `.env.example` as a template
8. change `DB_URL` to your specified mondoDB url: `mongodb+srv://<username>:<password>@<clustername>.kj5113y.mongodb.net/?appName=<Clustername>`
9. run `npm run setup` **inside of the backend directory** --> installs backend dependencies & seeds the database

## 4. Setting up the Frontend
1. run `npm install` **inside of the *FRONTEND* directory**

## 5. Starting the Application for the 1st Time
1. run `npm run dev` **in the project directory** (probably *fullstack_lab*)

