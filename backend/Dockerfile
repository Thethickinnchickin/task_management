# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy everything from current folder (which is /backend) into /app inside container
COPY . .

# Install dependencies from requirements.txt (in the same folder now)
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Flask will run on
EXPOSE 80

# Set Flask app environment variable if needed
ENV FLASK_APP=app.py

# Run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
