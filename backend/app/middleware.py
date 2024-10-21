from flask import g, request, jsonify
import jwt
from functools import wraps
from app.models import User, db

SECRET_KEY = "your-secret-key"

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Missing or invalid token"}), 401

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = payload['id']
            user = db.session.get(User, user_id)
            if not user:
                return jsonify({"message": "User not found"}), 401

            g.current_user = user  # Set the user in g
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.DecodeError:
            return jsonify({"message": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated_function
