#!/bin/bash

# Check for necessary commands
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) could not be found. Please install it and try again."
    exit 1
fi

if ! command -v git &> /dev/null
then
    echo "Git could not be found. Please install it and try again."
    exit 1
fi

# Variables
TEMPLATE_REPO_URL="git@github.com:MisyuraIlya/product-cicd.git" # Template repository URL
NEW_PROJECT_NAME=$1 # New project name passed as the first argument
GITHUB_USERNAME="MisyuraIlya" # Replace with your GitHub username

# Check if project name is provided
if [ -z "$NEW_PROJECT_NAME" ]; then
  echo "Usage: $0 <new-project-name>"
  exit 1
fi

# Clone the template repository
echo "Cloning the template repository..."
git clone $TEMPLATE_REPO_URL

# Check if cloning was successful
if [ $? -ne 0 ]; then
  echo "Failed to clone repository."
  exit 1
fi

# Extract the repository name from the URL
OLD_PROJECT_NAME=$(basename $TEMPLATE_REPO_URL .git)

# Rename the project directory
echo "Renaming the project directory from $OLD_PROJECT_NAME to $NEW_PROJECT_NAME..."
mv $OLD_PROJECT_NAME $NEW_PROJECT_NAME

# Check if renaming was successful
if [ $? -ne 0 ]; then
  echo "Failed to rename the project directory."
  exit 1
fi

# Move global.js to $NEW_PROJECT_NAME/front folder
echo "Moving global.js to $NEW_PROJECT_NAME/front folder..."
mv global.js $NEW_PROJECT_NAME/front/

# Move .env to $NEW_PROJECT_NAME/backend folder
echo "Moving .env to $NEW_PROJECT_NAME/backend folder..."
mv .env $NEW_PROJECT_NAME/backend/

# Copy media folder to $NEW_PROJECT_NAME/backend/public folder
echo "Copying media folder to $NEW_PROJECT_NAME/backend/public folder..."
cp -r media $NEW_PROJECT_NAME/backend/public/

# Navigate to the new project directory
cd $NEW_PROJECT_NAME

# Remove existing git history and reinitialize git
rm -rf .git
git init

# Create a new repository on GitHub
echo "Creating a new repository on GitHub..."
if ! gh repo create $GITHUB_USERNAME/$NEW_PROJECT_NAME --public --source=. --remote=origin; then
  echo "Failed to create GitHub repository."
  exit 1
fi

# Add remote origin manually if not added by gh
REMOTE_URL="git@github.com:$GITHUB_USERNAME/$NEW_PROJECT_NAME.git"
if ! git remote get-url origin &> /dev/null; then
  echo "Adding remote origin manually..."
  git remote add origin $REMOTE_URL
fi

# Make initial commit
git add .
git commit -m "Initial commit from template"

# Check the current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Push to the remote repository
echo "Pushing to the remote repository..."
git push -u origin $CURRENT_BRANCH

# Check if push was successful
if [ $? -ne 0 ]; then
  echo "Failed to push to remote repository."
  exit 1
fi

# Start Docker services
echo "Starting Docker services..."
docker-compose up -d

# Check if Docker services started successfully
if [ $? -ne 0 ]; then
  echo "Failed to start Docker services."
  exit 1
fi

echo "Project setup complete."
