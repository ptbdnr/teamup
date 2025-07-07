# Developer Guide

## Requirements

* Python3.11
* Docker
* NextJS (https://nodejs.org/en/download)
* Vultr account with:
    * Container Registry
    * Compute instance

## Copy the environment variables to the project root

source: ask!

for sample: see `path/to/repo_root/.env.sample`

```shell
ln path/to/repo_root/.env.local /path/to/project_root/.env.local
```

or

```shell
cat << EOF > .env.local
KEY1=VALUE1
KEY2=VALUE2
EOF
```


### Evaluate dependencies

```shell
(ls .env.local && echo 'INFO: Found .env.local') || echo 'CRITICAL: Missing .env.local'
(ls requirements.txt && echo 'INFO: Found requirements.txt') || echo 'CRITICAL: Missing requirements.txt'
```

### Deploy to VM with Docker

Ensure Docker daemon is running on your machine.

```shell
# Build the image
docker build -t teamup/$IMAGE_NAME:$TAG .
# example: docker build -t teamup/front .
# Quick test
docker run -p 3000:3000 teamup/$IMAGE_NAME:$TAG
# example: docker run -p 3000:3000 teamup/front
# Quick test
curl "http://127.0.0.1:80/users/kxsb/text2img?title=burger&description=american%20double%20cheeseburger"
curl "http://127.0.0.1:80/users/kxsb/text2ingredients?text=two%20eggs%20and%20a%20slice%20of%20bread"
```

```shell
# Log into Vultr Container Registry 
docker login https://ams.vultrcr.com/teamupcrtstnl001 -u $CR_USER -p $CR_PASS

# [OPTIONAL] Pull yout latest image if not already on the machine
docker pull teamup/$IMAGE_NAME:latest
# on macOS you might need the suffix `--platform linux/x86_64`

# Tag and Push your image to Vults Container Registry
docker tag $IMAGE_NAME:latest ams.vultrcr.com/teamupcrtstnl001/$IMAGE_NAME:latest
# example: docker tag teamup/back:latest ams.vultrcr.com/teamupcrtstnl001/back:latest
docker push ams.vultrcr.com/teamupcrtstnl001/$IMAGE_NAME:latest
# example: docker push ams.vultrcr.com/teamupcrtstnl001/back:latest
```

On the server ensure docker is installed

```shell
apt  install docker.io

# create user `docker`
useradd -m -g users docker

# create user group `dockergroup`
sudo addgroup dockergroup

# add users to user group
usermod --append --groups dockergroup docker
usermod --append --groups dockergroup $ADMIN_USER

# switch to the `docker` user
su - docker
```

```shell
# Log into Vultr Container Registry 
docker login https://ams.vultrcr.com/teamupcrtstnl001 -u $CR_USER -p $CR_PASS

# Pull yout latest image
docker pull ams.vultrcr.com/teamupcrtstnl001/$IMAGE_NAME:latest
# on macOS you might need the suffix `--platform linux/x86_64`
# example: docker pull ams.vultrcr.com/teamupcrtstnl001/back:latest

# List all images available locally
docker images

# List all containers
docker ps -a

# :WARNING: Stop all containers
docker stop $(docker ps -q)
# :WARNING: Remove all containers
docker rm $(docker ps -a -q)

# Run image in detached mode
docker run -d --name $CONTAINER_NAME -p 80:80 ams.vultrcr.com/teamupcrtstnl001/$IMAGE_NAME
# example: docker run -d --name back -p 80:80 ams.vultrcr.com/teamupcrtstnl001/back
```