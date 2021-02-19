# magnitopic.com-express
# About this project
~~This repository holds the source code for the magnitopic.com web page.~~
The source code that the magnitopic.com web page is currently hosted is in [this repo](https://github.com/magnitopic/magnitopic.com-JAMStack). I plan on changing this once the code of this project is ready to be hosted.


The long-term goal is to have a group of repositories that can all hosted in magnitopic.com, but each one of them uses different technologies, as I go about learning them. This one uses NodeJS with express, and MongoDB as it's server. As for the frontend, I'll be using [ejs](https://www.npmjs.com/package/ejs).
# Install
For ease of use you can run the project in Docker.
## Install Docker
-**Linux:** [Choose your distro](https://docs.docker.com/engine/install/#server)

-**MacOS:** [Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)

-**Windows:** [Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)
# Run
Once Docker is installed, go to the folder where you cloned the repository and run the following commands:
### Build Docker image
```bash
docker build -t magnitopic/server:1.0 .
```
### Run the MongoDB container
```bash
docker run --name=mongo -d -v ~/nginxlogs:/var/log/nginx -p 80:5000 mongo
```
### Run the NodeJS container
```bash
docker run --net container:mongo --name node magnitopic/server:1.0
```
## Server is now runing
Go to http://localhost to see the page.