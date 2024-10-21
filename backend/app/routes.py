from flask import Blueprint, request, jsonify
import jwt
from app.models import Task, User, db
from app.auth import verify_token
from app.middleware import token_required
from flask import g

task_routes = Blueprint('task_routes', __name__)

def get_user_id(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"message": "Missing or invalid token"}), 401

    # Extract the token part of the header
    token = auth_header.split(" ")[1]

    # Verify the token
    try:
        user_id = verify_token(token)
        if not user_id:
            return jsonify({"message": "Invalid or expired token"}), 401
        else:
            return user_id
    except jwt.exceptions.DecodeError:
        return jsonify({"message": "Invalid token"}), 401

@task_routes.route("/", methods=["GET"])
@token_required
def get_tasks():
    user_id = g.current_user.id
    completed = request.args.get('completed', None)  # filter by completed status
    sort_by = request.args.get('sort_by', 'created_at')  # sort by created_at or title
    sort_order = request.args.get('sort_order', 'asc')  # sort order: asc or desc

    query = Task.query.filter_by(user_id=user_id)

    # Filter by completion status
    if completed is not None:
        completed = completed.lower() == 'true'  # Convert string to boolean
        query = query.filter_by(completed=completed)

    # Sort tasks
    if sort_by == 'title':
        query = query.order_by(Task.title.asc() if sort_order == 'asc' else Task.title.desc())
    else:  # default to sorting by created_at
        query = query.order_by(Task.created_at.asc() if sort_order == 'asc' else Task.created_at.desc())

    tasks = query.all()
    return jsonify([task.to_dict() for task in tasks])


@task_routes.route("/", methods=["POST"])
@token_required
def create_task():
    try:
        user_id = g.current_user.id
        if not user_id:
            return jsonify({"message": "Invalid or expired token"}), 401
    except jwt.exceptions.DecodeError:
        return jsonify({"message": "Invalid token"}), 401
    
    # Parse the incoming JSON data
    try:
        data = request.get_json()
    except Exception:
        return jsonify({"message": "Invalid JSON data"}), 400

    if not data.get('title'):
        return jsonify({"message": "Title is required"}), 400

    # Get priority from request, default to 'medium'
    priority = data.get('priority', 'medium')  
    if priority not in ['high', 'medium', 'low']:
        return jsonify({"message": "Priority must be high, medium, or low"}), 400

    task = Task(title=data['title'], description=data.get('description'), user_id=user_id, priority=priority)
    db.session.add(task)
    db.session.commit()

    return jsonify(task.to_dict()), 201

@task_routes.route("/<int:task_id>", methods=["DELETE"])
@token_required
def delete_task(task_id):
    try:
        user_id = g.current_user.id
        if not user_id:
            return jsonify({"message": "Invalid or expired token"}), 401
    except jwt.exceptions.DecodeError:
        return jsonify({"message": "Invalid token"}), 401
    
    task = db.session.get(Task, task_id)

    # Check if the task exists
    if not task:
        return jsonify({"message": "Task not found"}), 404

    # Ensure that the task belongs to the current user
    if task.user_id != g.current_user.id:
        return jsonify({"message": "Unauthorized to delete this task"}), 403

    # Delete the task
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200

@task_routes.route("/<int:task_id>", methods=["PUT"])
@token_required
def update_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    if task.user_id != g.current_user.id:
        return jsonify({"message": "Unauthorized to update this task"}), 403

    data = request.json
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')
    completed = data.get('completed')  # Retrieve the completed value

    if title:
        task.title = title
    if description:
        task.description = description
    if priority and priority in ['high', 'medium', 'low']:
        task.priority = priority
    if completed is not None:  # Update completed only if it's provided
        task.completed = completed

    db.session.commit()

    return jsonify({"message": "Task updated successfully", "task": task.to_dict()}), 200



@task_routes.route("/<int:task_id>", methods=["GET"])
@token_required
def get_task_by_id(task_id):
    task = db.session.get(Task, task_id)  # Use db.session.get()

    # Check if the task exists
    if not task:
        return jsonify({"message": "Task not found"}), 404

    # Ensure the task belongs to the current user
    if task.user_id != g.current_user.id:
        return jsonify({"message": "Unauthorized to view this task"}), 403

    return jsonify(task.to_dict()), 200

def handler(event, context):
    return app(event, context)
