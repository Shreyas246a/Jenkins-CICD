# Solar System Project

## Overview
The **Solar System Project** is a Node.js-based web application that interacts with a MongoDB database. It provides API endpoints to retrieve and manage planetary data. The project includes security scanning, unit testing, code coverage, and CI/CD deployment using Jenkins and Docker.

## Features
- RESTful API for planetary data
- MongoDB database integration
- CI/CD pipeline with Jenkins
- Docker containerization
- Automated security scanning and testing
- Deployment to AWS EC2 (EKS in future)

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **CI/CD**: Jenkins, SonarQube, OWASP Dependency Check
- **Containerization**: Docker
- **Cloud**: AWS (EC2, future EKS integration)

## Installation
1. Clone the repository:
   ```sh
   git clone <Gitea_Repo_URL>
   ```
2. Navigate to the project directory:
   ```sh
   cd solar-system
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running Locally
```sh
npm start
```

## Deployment
The project is deployed using Jenkins and Docker. The pipeline automates:
- Code quality checks
- Security scans
- Unit tests
- Docker image builds and pushes
- Deployment to AWS EC2

## Future Enhancements
- Integration with Kubernetes (EKS)
- More robust logging and monitoring
- Advanced authentication and authorization

## Maintainers
- **[Your Name]** - Developer & Maintainer

## Acknowledgments
- KodeKloud training courses for Git, Jenkins, and Docker
- Open-source tools and libraries used in this project

---
Let me know if you need additional sections or modifications! 🚀
