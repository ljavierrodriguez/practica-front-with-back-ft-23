from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

bp = Blueprint('bp3', __name__)

@bp.route('/me')
@jwt_required() # convertimos el endpoint en una ruta privada
def me():
    id = get_jwt_identity() # accedemos a la informacion guardada en el token    
    user = User.query.get(id) # buscamos el usuario por esa informacion
    return jsonify(user.serialize()), 200