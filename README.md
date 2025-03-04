# Solar System NodeJS Application
# Check Out enabling-cicd branch for all the ongoing files
A simple HTML+MongoDB+NodeJS project to display Solar System and it's planets.

---

## Requirements

For development, you will only need Node.js and NPM installed in  your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

---
## Install Dependencies from `package.json`
    $ npm install

## Run Unit Testing
    $ npm test

## Run Code Coverage
    $ npm run coverage

## Run Application
    $ npm start

## Access Application on Browser
    http://localhost:3000/

 
## Features
- RESTful API for planetary data
- MongoDB database integration
- CI/CD pipeline with Jenkins
- Docker containerization
- Automated security scanning and testing
- Deployment to AWS EC2 (EKS in future)

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