

Marvel Universe Application
Welcome to the Marvel Universe Application! This is a React-based web application that allows users to explore, create, update,
and delete Marvel characters. The app integrates with a Flask backend and a database to manage character data.

Features
View Characters: Browse a list of Marvel characters with their details.

Character Profiles: View detailed information about individual characters.

Add Characters: Create new characters and add them to the database.

Update Characters: Edit existing character profiles.


Delete Characters: Remove characters from the database.

Responsive Design: Fully responsive and works on all device sizes.

404 Page: A custom 404 page with a countdown redirect.

Prerequisites

Before running the application, ensure you run and install the following on your system:
make sure to have mySQL installed and input your password where you find 'root:YOUR-PASSWORD' may have another password
input so just switch it out with your known local sql password if you have one in the server.py file to 
ensure it syncs with your local database. Once done run:


py -m venv venv (windows) || python3 -m venv venv - create virtual env (mac)
source venv/bin/activate (mac) || venv\Scripts\activate (windows)

navigate to the backend folder, run:
cd backend 
pip install -r requirements.txt
python server.py


once installed 
navigate to the marvel folder in your terminal with (cd marvel-site-app)
and do the following 

- npm install 
- npm install react-bootstrap bootstrap
- npm install axios 
- npm install react-router-dom 
- npm run dev 

and browse the application 


