# tests/test_api.py
import json

def test_register(test_client):
    response = test_client.post('/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 201
    assert b"User registered successfully" in response.data

def test_login(test_client):
    # Register first
    test_client.post('/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    
    # Log in
    response = test_client.post('/auth/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    assert 'token' in json.loads(response.data)

def test_create_task(test_client):
    # First, register and login to get a token
    test_client.post('/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    login_response = test_client.post('/auth/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    token = json.loads(login_response.data)['token']

    # Create a new task
    response = test_client.post('/', json={
        'title': 'Test Task',
        'description': 'This is a test task.'
    }, headers={'Authorization': f'Bearer {token}'})

    assert response.status_code == 201
    assert b'Test Task' in response.data

def test_delete_task(test_client):
    # First, register and login to get a token
    test_client.post('/auth/register', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    login_response = test_client.post('/auth/login', json={
        'username': 'testuser',
        'password': 'testpassword'
    })
    token = json.loads(login_response.data)['token']

    # Create a new task
    create_response = test_client.post('/', json={
        'title': 'Test Task',
        'description': 'This is a test task.'
    }, headers={'Authorization': f'Bearer {token}'})

    task_id = json.loads(create_response.data)['id']

    # Delete the task
    delete_response = test_client.delete(f'/{task_id}', headers={'Authorization': f'Bearer {token}'})

    assert delete_response.status_code == 200
    assert b'Task deleted successfully' in delete_response.data
