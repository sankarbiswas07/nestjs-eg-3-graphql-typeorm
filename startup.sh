#!/bin/bash

# Check if the db_data directory exists, if not create it
if [ ! -d "db_data" ]; then
  echo "Creating db_data directory..."
  mkdir -p db_data
else
  echo "db_data directory already exists."
fi

# Build the Docker image
docker build -f infra/Dockerfile -t mysql_image .

# Run the MySQL container
docker run -d \
  --name mysql_container \
  -v $(pwd)/db_data:/var/lib/mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  mysql_image

# Wait for MySQL to initialize
echo "Waiting for MySQL to start..."
sleep 20

# Run NestJS application
echo "Starting NestJS application..."
npm run start:dev
