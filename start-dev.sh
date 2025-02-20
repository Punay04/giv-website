#!/bin/bash

# Check if backend server is running
check_backend() {
    curl -s http://localhost:3000/api/health > /dev/null
    return $?
}

# Start backend server if not running
if ! check_backend; then
    echo "Starting backend server..."
    cd server && npm start &
    sleep 5
fi

# Start frontend development server
cd client && npm start
