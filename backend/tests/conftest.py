import pytest
from app import create_app
from app.models import db  # Import the existing db instance

@pytest.fixture(scope='module')
def test_client():
    app = create_app()

    # Configure the app for testing
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Use in-memory SQLite for tests
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        db.create_all()  # Create the database tables
        yield app.test_client()  # This will yield the test client

        db.session.remove()  # Clean up after tests
        db.drop_all()  # Drop the database tables

@pytest.fixture(scope='module')
def app(test_client):
    return test_client
