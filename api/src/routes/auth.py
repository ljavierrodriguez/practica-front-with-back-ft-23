import datetime
from flask import Blueprint, jsonify, request
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

bp = Blueprint('bp2', __name__)

@bp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if not email: 
        return jsonify({"msg":"Email is required!"}), 400
    if not password: 
        return jsonify({"msg":"Password is required!"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({ "msg": "User/Password are incorrects!"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({ "msg": "User/Password are incorrects!"}), 401
    
    expires = datetime.timedelta(days=1)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    
    data = {
        "success": "Login succesfully!",
        "access_token": access_token,
        "user": user.serialize()
    }
    
    return jsonify(data), 200

@bp.route('/register', methods=['POST'])
def register():
    
    name = request.json.get('name', '')
    email = request.json.get('email')
    password = request.json.get('password')
    active = request.json.get('active', True)
    
    if not email: 
        return jsonify({"msg":"Email is required!"}), 400
    if not password: 
        return jsonify({"msg":"Password is required!"}), 400
    
    found = User.query.filter_by(email=email).first()
    if found:
        return jsonify({"msg": "Email already exists!"}), 400
    
    user = User()
    user.name = name
    user.email = email
    user.password = generate_password_hash(password)
    user.active = active
    
    #db.session.add(user)
    #db.session.commit()
    
    user.save()
    
    if not user:
        return jsonify({ "msg": "Error, please try again later"}), 400
    
    return jsonify({"success": "Register successfully, please log in!"}), 200