#!/bin/bash
docker network create shared-network

# Get the current working directory
CURRENT_DIR=$(pwd)

# Navigate to the server folder and run docker-compose up
cd "$CURRENT_DIR/server"
docker compose up --build --force-recreate -d

# Navigate to the client folder and run docker-compose up
cd "$CURRENT_DIR/client"
docker compose up --build --force-recreate -d

echo "Docker containers for server and client are running in detached mode."
