# Carbon Footprint Monitoring System

This repository contains the full-stack Carbon Footprint Monitoring System.

Structure:
- backend/  (Spring Boot 4.x, Java 21, Maven)
- frontend/ (React + Vite)

This branch: feature/full-stack/carbon-footprint

Quick start (backend):

1. Ensure Docker and Docker Compose are running (Postgres will be used).
2. Configure database in backend/src/main/resources/application.properties if needed.
3. From backend directory run: mvn clean package
4. Run: java -jar target/carbon-footprint-0.0.1-SNAPSHOT.jar

Quick start (frontend):

1. cd frontend
2. npm install
3. npm run dev

Full instructions will be added progressively as the project is implemented.
