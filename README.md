# WebExperiments
# About this project
This proyect was made for me to lear NodeJS, Express, MongoDB... and any future web technology that I throw into the mix. Each page in this website has it's own gimmick wich helps me learn a new technology or service.


You can see this poryect deployed in Heroku: https://limitless-refuge-99811.herokuapp.com/

## Available pages 

- [Dice](https://limitless-refuge-99811.herokuapp.com/dice)
- [Dead Pixel Checker](https://limitless-refuge-99811.herokuapp.com/pixel)
- [ESP8266 thermometer](https://limitless-refuge-99811.herokuapp.com/esp)
- [Google Maps](https://limitless-refuge-99811.herokuapp.com/map)
- [Spain's petrol prices](https://limitless-refuge-99811.herokuapp.com/petrol)
- [Nasa's APOD](https://limitless-refuge-99811.herokuapp.com/apod)

# Install
For ease of use you can run the project in Docker.
## Install Docker

![Doker](https://1.bp.blogspot.com/-68aYf9ZNiZk/X33sbaV4AwI/AAAAAAAAFZo/Hf1BCsZT7KAIwbhmPx1yBitJ2LCpXQT-QCLcBGAsYHQ/s0/logo_docker.png)

- **Windows:** [Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/)

- **MacOS:** [Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)

- **Linux:** [Choose your distro](https://docs.docker.com/engine/install/#server)
    
    - Or install using the convenience script (CentOS/ Debian/ Fedora/ Raspbian/ Ubuntu):

        ```bash
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        ```
# Run
Once Docker is installed, go to the folder where **you cloned the repository** and run the following command:

__NOTE:__ Don't forget to change the command with your own GOOGLE_API_KEY and NASA_KEY
### Comand for Linux/ MacOS
```bash
sudo docker build -t magnitopic/server:1.0 . && sudo docker run --name=mongo -d -v /home/mag:/mongodb_data_volume -p 80:5000 mongo && sudo docker run --name node -e DB_URL=mongodb://localhost:27017/NodeServerDB -d --net container:mongo magnitopic/server:1.0 -e GOOGLE_API_KEY=[Insert your GOOGLE_API_KEY] -e NASA_KEY=[Isert your NASA_KEY]
```
### Comad for Windows-
```powershell
docker build -t magnitopic/server:1.0 . && docker run --name=mongo -d -v /home/mag:/mongodb_data_volume -p 80:5000 mongo && docker run --name node -e DB_URL=mongodb://localhost:27017/NodeServerDB -d --net container:mongo magnitopic/server:1.0 -e GOOGLE_API_KEY=[Insert your GOOGLE_API_KEY] -e NASA_KEY=[Isert your NASA_KEY]
```
## Server is now runing
Go to http://localhost to see the page.

[comment]: <> (sudo docker stop node && sudo docker rm node && sudo docker build -t magnitopic/server:1.0 . && sudo docker run --name node -e DB_URL=mongodb://localhost:27017/NodeServerDB -d --net container:mongo magnitopic/server:1.0)

[comment]: <> (docker stop node && docker rm node && docker build -t magnitopic/server:1.0 . && docker run --name node -e DB_URL=mongodb://localhost:27017/NodeServerDB -d --net container:mongo magnitopic/server:1.0)