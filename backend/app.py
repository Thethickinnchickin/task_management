from flask import Flask
from .app.routes import task_routes
from .app.auth import auth_routes
from .app.models import db
from flask_swagger_ui import get_swaggerui_blueprint
from flask_migrate import Migrate
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Configure the app (e.g., SQLAlchemy connection settings)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your-database.db'  # Update this to your actual DB URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database with the Flask app
    db.init_app(app)

    migrate = Migrate(app, db)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()  # This will create all tables for the models

    # Swagger UI setup
    SWAGGER_URL = '/swagger'  # URL for accessing Swagger UI
    API_URL = '/static/swagger.yaml'  # Path to your Swagger YAML file

    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,  # Swagger UI will be available at /swagger
        API_URL,      # Swagger file URL
        config={      # Swagger UI config settings
            'app_name': "Task Management API"
        }
    )

    # Register the blueprint for Swagger UI
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    # Register Blueprints
    app.register_blueprint(task_routes)
    app.register_blueprint(auth_routes)

    return app


app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)