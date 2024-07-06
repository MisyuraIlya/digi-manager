#!/bin/bash

# Check if the user provided the folder path
if [ -z "$1" ]; then
  echo "Usage: $0 /path/to/specific/folder"
  exit 1
fi

# Define the path to the specific folder
SPECIFIC_FOLDER="$1"

# Navigate to the specific folder
echo "Navigating to $SPECIFIC_FOLDER"
cd "$SPECIFIC_FOLDER" || { echo "Directory not found: $SPECIFIC_FOLDER"; exit 1; }

# Navigate to the 'front' folder
echo "Navigating to 'front' directory"
cd front || { echo "'front' directory not found in $SPECIFIC_FOLDER"; exit 1; }

# Perform a git pull to update from GitHub
echo "Pulling latest changes from GitHub"
git pull || { echo "Failed to pull from GitHub"; exit 1; }
echo "Update from GitHub completed successfully"

# Execute Docker commands
DOCKER_CONTAINER_ID=$(docker ps --filter "ancestor=testproject-php81-service" --format "{{.ID}}")

if [ -z "$DOCKER_CONTAINER_ID" ]; then
  echo "No running container found for image testproject-php81-service"
  exit 1
fi

echo "Running make:migration"
docker exec "$DOCKER_CONTAINER_ID" php bin/console make:migration --no-interaction || { echo "[ERROR 1] Failed to run make:migration"; exit 1; }

echo "Running doctrine:migrations:migrate"
docker exec "$DOCKER_CONTAINER_ID" php bin/console doctrine:migrations:migrate --no-interaction || { echo "[ERROR 2] Failed to run doctrine:migrations:migrate"; exit 1; }

echo "Docker commands executed successfully"
