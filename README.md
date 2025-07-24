🏋️‍♀️ Fitness Booking App

A full-stack web application that allows users to view fitness classes and book slots. Built using React (frontend) and Django REST Framework (backend).


🚀 Features

- View all available fitness classes.
- Book a class using name and email.
- View your bookings via email.
- Admin can manage classes and bookings via Django Admin panel.



🛠️ Tech Stack

- Frontend: React, TailwindCSS, Axios
- Backend: Django, Django REST Framework
- Database: SQLite (default, can be changed)



🧰 Project Setup

🔧 Backend (Django)

1. Clone the repository
   git clone https://github.com/Nikhil-Singh2508/Fitness-Booking-App.git
   cd Fitness-Booking-App/backend

2. Create and activate virtual environment
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate

3. Install dependencies
   pip install -r requirements.txt

4. Apply migrations
   python manage.py migrate

5. Create superuser (for Django Admin)
   python manage.py createsuperuser

6. Run the server
   python manage.py runserver

💻 Frontend (React)

1. Navigate to frontend
   cd ../frontend

2. Install dependencies
   npm install

3. Start the development server
   npm run dev



📡 API Usage

Base URL: http://localhost:8000/

🔹 Get all fitness classes
curl http://localhost:8000/fitness-classes/

🔹 Book a class
curl -X POST http://localhost:8000/bookings/ \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "John Doe",
    "client_email": "john@example.com",
    "fitness_class": 1
}'

🔹 Get bookings by email
curl http://localhost:8000/bookings/?email=john@example.com



📬 API Endpoints

Method | Endpoint              | Description
-------|-----------------------|----------------------------
GET    | /fitness-classes/     | List all available classes
POST   | /bookings/            | Book a fitness class
GET    | /bookings/?email=     | Get bookings by client email





📄 License

This project is licensed under the MIT License.
