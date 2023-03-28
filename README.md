# MovieReview
A Movie Review application that allows users to browse and review movies, as well as receive personalized movie recommendations based on their reviews.

# Features
Browse through a collection of movies
Read and write movie reviews
Vote movie reviews
Personalized movie recommendations based on user reviews
User authentication and profile management
Responsive design for optimal viewing on desktop and mobile devices

# Start Back-End for development

Make sure these are installed:

- Django extensions
- Rest Framework
- Cors Headers 

Navigate to the directory MovieReview/Back-End/DjangoMR:

- ensure models are migrated:
  - python manage.py makemigrations
  - python manage.py migrate

- start the server:
  - python manage.py runserver 

Ensure the BASE_URL in api.js in the Front-End is the same as the Django server

# Start Front-End for development

- navigate to the directory MoviewReview/Front-End/
- run 'npm install'
- then run 'npm start'
- The application should now be running on http://localhost:3000

# Run Back-End unit tests

- python manage.py test mrapp

# Run Front-End unit tests

navigate to MovieReview/Front-End/src/unitTests

- run 'python test_login.py'

# Mock Account

Using this account, one can view recommendations as the account has written reviews already.

- Go to log in:
  - Username: Craw
  - Password: 123456