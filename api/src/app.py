import os
from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from dotenv import load_dotenv

from routes.main import bp as main_routes
from routes.auth import bp as auth_routes
from routes.user import bp as user_routes

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(main_routes)
app.register_blueprint(auth_routes, url_prefix='/api')
app.register_blueprint(user_routes, url_prefix='/api')

if __name__ == '__main__':
    app.run()