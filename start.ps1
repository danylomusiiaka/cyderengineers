#!/bin/bash

# Run Docker Compose
$networkExists = docker network ls --filter name=traefik -q
if (-not $networkExists) {
    docker network create traefik
}

# Перевірити чи існують контейнери
$containersExist = docker ps -a --filter name=client -q -o name
if (-not $containersExist) {
    docker-compose build
}

$containersRunning = docker ps --filter name=client -q -o name
if (-not $containersRunning) {
    docker-compose up -d
}

# Output localhost link
Start-Process "http://localhost:8080"
