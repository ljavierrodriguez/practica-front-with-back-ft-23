from flask import Blueprint, jsonify

bp = Blueprint('bp1', __name__)

@bp.route('/')
def main():
    return jsonify({ "status": "Server running successfully"}), 200