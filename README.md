# Docker Training
A collection of instructions and sample files for training on Docker

## Docker Machine

### Installation

https://docs.docker.com/machine/install-machine/

### Commands

docker-machine is a tool for creating and managing Docker hosts, running Docker Engine. Commands:

- active		Print which machine is active
- config		Print the connection config for machine
- create		Create a machine
- env			Display the commands to set up the environment for the Docker client
- inspect		Inspect information about a machine
- ip			Get the IP address of a machine
- kill			Kill a machine
- ls			List machines
- provision		Re-provision existing machines
- regenerate-certs	Regenerate TLS Certificates for a machine
- restart		Restart a machine
- rm			Remove a machine
- ssh			Log into or run a command on a machine with SSH.
- scp			Copy files between machines
- start			Start a machine
- status		Get the status of a machine
- stop			Stop a machine
- upgrade		Upgrade a machine to the latest version of Docker
- url			Get the URL of a machine
- version		Show the Docker Machine version or a machine docker version
- help			Shows a list of commands or help for one command

### Examples

To get started, make sure you have VirtualBox installed. VirtualBox makes it easy to run virtual machines on your computer, and there are some helpful integrations between `docker-machine` and VirtualBox that make it easy to get started:

https://www.virtualbox.org/wiki/Downloads

Create a machine called 'default' using the VirtualBox driver:

    $ docker-machine create --driver virtualbox default

List locally installed machines:

    $ docker-machine ls
    NAME                       ACTIVE   DRIVER       ...
    default                    *        virtualbox   ...
    dev                        -        virtualbox   ...

Print out the environment variables for running machine:

    $ docker-machine env default
    export DOCKER_TLS_VERIFY="1"
    export DOCKER_HOST="tcp://192.168.99.100:2376"
    export DOCKER_CERT_PATH="/Users/bigedubs/.docker/machine/machines/default"
    export DOCKER_MACHINE_NAME="default"

Configure your terminal to connect to a docker-machine (all `docker` commands from then on will be run on the host machine):

    $ eval $(docker-machine env default)


From here, you can jump to the next section. However, if you'd like you can also learn more about creating new docker machines using other drivers, allowing you to host them on the cloud. Here is an example command you might use to create a machine hosted on Amazon EC2:

    $ docker-machine create --driver amazonec2 --amazonec2-access-key $AWS_ACCESS_KEY --amazonec2-secret-key $AWS_SECRET_KEY --amazonec2-region us-west-2 --amazonec2-instance-type m3.medium --amazonec2-ami ami-319e1e51 --amazonec2-ssh-user ubuntu server

## Docker Basics

### Commands:
- attach      Attach to a running container
- build       Build an image from a Dockerfile
- commit      Create a new image from a container's changes
- cp          Copy files/folders between a container and the local filesystem
- create      Create a new container
- diff        Inspect changes on a container's filesystem
- events      Get real time events from the server
- exec        Run a command in a running container
- export      Export a container's filesystem as a tar archive
- history     Show the history of an image
- images      List images
- import      Import the contents from a tarball to create a filesystem image
- info        Display system-wide information
- inspect     Return low-level information on Docker objects
- kill        Kill one or more running containers
- load        Load an image from a tar archive or STDIN
- login       Log in to a Docker registry
- logout      Log out from a Docker registry
- logs        Fetch the logs of a container
- pause       Pause all processes within one or more containers
- port        List port mappings or a specific mapping for the container
- ps          List containers
- pull        Pull an image or a repository from a registry
- push        Push an image or a repository to a registry
- rename      Rename a container
- restart     Restart one or more containers
- rm          Remove one or more containers
- rmi         Remove one or more images
- run         Run a command in a new container
- save        Save one or more images to a tar archive (streamed to STDOUT by default)
- search      Search the Docker Hub for images
- start       Start one or more stopped containers
- stats       Display a live stream of container(s) resource usage statistics
- stop        Stop one or more running containers
- tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
- top         Display the running processes of a container
- unpause     Unpause all processes within one or more containers
- update      Update configuration of one or more containers
- version     Show the Docker version information
- wait        Block until one or more containers stop, then print their exit codes

### Examples

Launch a container for an image (pulling it from a repository if it is not already available), running with an optional command:

    $ docker run docker/whalesay cowsay hello
    Unable to find image 'docker/whalesay:latest' locally
    latest: Pulling from docker/whalesay
    e190868d63f8: Pull complete
    ...
    Digest: sha256:178598e51a26abbc958b8a2e48825c90bc22e641de3d31e18aaf55f3258ba93b
    Status: Downloaded newer image for docker/whalesay:latest

    _______
    < hello >
    -------
       \
        \
         \     
                       ##        .            
                 ## ## ##       ==            
              ## ## ## ##      ===            
          /""""""""""""""""___/ ===        
     ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   
          \______ o          __/            
           \    \        __/             
             \____\______/   

Print a list of running containers:

    $ docker ps

Print a list of all containers (including those that are stopped):

    $ docker ps -a
    CONTAINER ID        IMAGE             ...
    0eba25ca25d6        docker/whalesay   ...

Inspect a container (printing out its configuration):

    $ docker inspect <CONTAINER ID>
    [
    {
        "Id": "<uuid>",
        "Created": "2017-03-03T20:42:03.854697371Z",
        "Path": "cowsay",
        "Args": [
            "hello"
        ],
        ...

Tail logs for a container, starting with the last 50 lines:

    $ docker logs -f --tail=50 <CONTAINER ID>

Run a container, exposing port 8080 on the host machine (this will run in 'attached' mode, printing out the logs into the terminal):

    $ docker run -p 8080:8080 macinv/flask-example

Add `-d` to run a container in detached mode:

    $ docker run -d -p 8080:8080 macinv/flask-example

Use `exec` to execute a command on a running container, such as `/bin/bash`, which will open a bash terminal for the container (this command only works if the container has /bin/bash installed). In this example, we launch an example container `appserver` and then run a terminal on it:

    $ docker run -d -p9080:80 appserver/example
    $ docker exec -it <CONTAINER ID> /bin/bash
    $ root@d883dca5ee4e:/opt/appserver# pwd
    > /opt/appserver

Add `--name` to launch a container with a defined name (this name can be used in place of the container id):

    $ docker run -d -p9080:80 --name appserver appserver/example
    $ docker ps
    CONTAINER ID      ...    NAMES
    1765b8cfab84      ...    appserver

Stop a running container:

    $ docker stop <CONTAINER ID>

Remove a running container:

    $ docker rm -f <CONTAINER ID>

Stop all running containers:

    $ docker stop $(docker ps -aqf status=running)

Remove all inactive containers:

    $ docker rm $(docker ps -a -q -f status=exited)

Remove all unused images:

    $ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

Print a list of installed docker `images`:

    $ docker images
    REPOSITORY              TAG     ...
    macinv/flask-example    latest  ...

Remove an image:

    $ docker rmi -f <IMAGE ID>


## Building Images

### Dockerfile

Docker can build images automatically by reading the instructions from a `Dockerfile`. A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using `docker build`, users can create an automated build that executes several command-line instructions in succession.

### Example application: Ideas Node Server

Dockerfile:

    # Define base image
    FROM node:boron

    # Create app directory
    RUN mkdir -p /usr/src/app
    WORKDIR /usr/src/app

    # Install app dependencies
    COPY package.json /usr/src/app/
    RUN npm install

    # Bundle app source
    COPY . /usr/src/app

    EXPOSE 8080
    CMD [ "npm", "start" ]

Building the docker image:

    $ docker build .

    Step 1/8 : FROM node:boron
     ---> 0cc9958f0aa8
    Step 2/8 : RUN mkdir -p /usr/src/app
     ---> Using cache
     ---> 0e276f9c7ba6
    Step 3/8 : WORKDIR /usr/src/app
     ---> Using cache
     ---> c472f6717822
    Step 4/8 : COPY package.json /usr/src/app/
     ---> Using cache
     ---> 7a08da69041b
    Step 5/8 : RUN npm install
     ---> Using cache
     ---> 78bfb3bf351d
    Step 6/8 : COPY . /usr/src/app
     ---> fc7862184c97
    Removing intermediate container 94b3f3412272
    Step 7/8 : EXPOSE 8080
     ---> Running in be609df5dbb3
     ---> 572c14389bf9
    Removing intermediate container be609df5dbb3
    Step 8/8 : CMD npm start
     ---> Running in ad86c91ff7f4
     ---> e96359b87a81
    Removing intermediate container ad86c91ff7f4
    Successfully built e96359b87a81

Listing images:

    $ docker images
    REPOSITORY        TAG        IMAGE ID
    <none>             <none>    e96359b87a81

Building again, tagging with a repository and a default tag:

    $ docker build -t mkulumadzi/ideas-node-server .
    $ docker images
    REPOSITORY                      TAG           IMAGE ID
    mkulumadzi/ideas-node-server    latest        e96359b87a81

Running the image (note: this server requires an environment variable MONGO_HOST pointing to a valid MongoDB instance; in this case we will point it at a running mongo instance on our laptop, which will be accessible to the docker-machine at IP address 192.168.99.1):

    $ docker run -d -p 8080:8080 -e MONGO_HOST=192.168.99.1 --name node_idea_server mkulumadzi/ideas-node-server

    $ curl -X POST http://192.168.99.100:8080/ideas -H 'Content-Type: application/json' --data '{ "idea": "Learn Docker", "description": "I should run through the Docker training so that I know how to use it." }' | python -m json.tool

    $ curl -X GET http://192.168.99.100:8080/ideas | python -m json.tool

Inspecting logs for the image:

    $ docker logs -f node_idea_server
    npm info it worked if it ends with ok
    npm info using npm@3.10.10
    npm info using node@v6.10.0
    npm info lifecycle node-server@1.0.0~prestart: node-server@1.0.0
    npm info lifecycle node-server@1.0.0~start: node-server@1.0.0

    > node-server@1.0.0 start /usr/src/app
    > node server.js

    restify.mongoose.example.ideas listening at http://[::]:8080
    MongoDB Connected!

Inspecting the image filesystem:

    $ docker exec -it node_idea_server /bin/bash
    root@348b2156820c:/usr/src/app# ls -al
    total 32
    drwxr-xr-x  4 root root 4096 Mar  6 00:37 .
    drwxr-xr-x  6 root root 4096 Mar  6 00:37 ..
    -rw-r--r--  1 root root   27 Mar  5 22:19 .dockerignore
    -rw-r--r--  1 root root  240 Mar  5 22:19 Dockerfile
    drwxr-xr-x  2 root root 4096 Mar  5 22:32 config
    drwxr-xr-x 89 root root 4096 Mar  5 22:28 node_modules
    -rw-r--r--  1 root root  360 Mar  5 22:21 package.json
    -rw-r--r--  1 root root 2225 Mar  6 00:37 server.js


## Publishing images

Docker images can be published to Docker Hub with the `docker push` command. A `Makefile` can help automate the process of testing, building and publishing an image.

### Using docker push

Tag the image with a repository and a release tag. Note that pushing/pulling using only the default tag of `latest` is risky, as Docker will look for the _first_ image published with that tag and no other release tag.

    $ docker image tag <IMAGE ID> mkulumadzi/ideas-node-sever:v0.1.0

Log in with the docker account that has access to this repository, if you haven't already:

    $ docker login

Push the image to its repository:

    $ docker push mkulumadzi/ideas-node-server:v0.1.0
    The push refers to a repository [docker.io/mkulumadzi/ideas-node-server]
    131f62950733: Pushed
    397b319d9f2e: Pushed
    ...


### Using a Makefile

Makefiles contain a set of directives used with the `make` build automation tool. Using Makefiles with docker, we can automate processes such as building, tagging and releasing our docker images:

    NAME = mkulumadzi/ideas-node-server
    VERSION = 0.1.0

    .PHONY: all build tag_latest release

    all: build

    build:
      docker build -t $(NAME):$(VERSION) --rm .

    tag_latest:
      docker tag $(NAME):$(VERSION) $(NAME):latest

    release: tag_latest
      @if ! docker images $(NAME) | awk '{ print $$2 }' | grep -q -F $(VERSION); then echo "$(NAME) version $(VERSION) is not yet built. Please run 'make build'"; false; fi
      docker push $(NAME)

In the above example, we record the name and version of our docker image as variables. The `.PHONY` command tells `make` to use the `all`, `build`, `tag_latest` and `release` commands in this file, rather than looking elsewhere. Using `make all` or `make build` we can build the latest version of our image:

    $ make all
    docker build -t mkulumadzi/ideas-node-server:0.1.0 --rm .
    Sending build context to Docker daemon 10.75 kB
    Step 1/8 : FROM node:boron
    ---> 0cc9958f0aa8
    Step 2/8 : RUN mkdir -p /usr/src/app
    ...

Using `make tag_latest`, we can take the most recent image we built:

    $ make tag_latest
    docker tag mkulumadzi/ideas-node-server:0.1.0 mkulumadzi/ideas-node-server:latest

And using `make release`, we can tag the latest version and push it to Dockerhub:

    $ make release
    docker tag mkulumadzi/ideas-node-server:0.1.0 mkulumadzi/ideas-node-server:latest
    docker push mkulumadzi/ideas-node-server
    The push refers to a repository [docker.io/mkulumadzi/ideas-node-server]
    6f8020f5067e: Pushed
    ...

## Running multi-container applications

### docker-compose

docker-compose is a command-line utility that makes it easy to run multiple containers in a single managed network.

Commands:

- build              Build or rebuild services
- bundle             Generate a Docker bundle from the Compose - file
- config             Validate and view the compose file
- create             Create services
- down               Stop and remove containers, networks, images, and volumes
- events             Receive real time events from containers
- exec               Execute a command in a running container
- help               Get help on a command
- kill               Kill containers
- logs               View output from containers
- pause              Pause services
- port               Print the public port for a port binding
- ps                 List containers
- pull               Pull service images
- push               Push service images
- restart            Restart services
- rm                 Remove stopped containers
- run                Run a one-off command
- scale              Set number of containers for a service
- start              Start services
- stop               Stop services
- unpause            Unpause services
- up                 Create and start containers
- version            Show the Docker-Compose version information

## Example application: Ideas App with angular client, node server and mongo backend

The `docker-compose` file lists the configuration options required to run each container, including links between containers and custom environment variables, which can reference these links:

    server:
      image: mkulumadzi/ideas-node-server
      links:
        - mongodb:mongodb
      ports:
        - "8080:8080"
      environment:
        MONGO_HOST: mongodb
    mongodb:
      image: mongo
      expose:
        - "27017"
      ports:
        - "27017:27017"
    webapp:
      image: mkulumadzi/ideas-angular-client
      links:
      - server:api1
      ports:
      - "80:80"

Running the application:

    $ docker-compose -f ideas-app-docker-compose.yml up -d
    Creating dockertraining_mongodb_1
    Creating dockertraining_server_1
    Creating dockertraining_webapp_1

    $ docker ps
    CONTAINER ID        IMAGE                             COMMAND
    7cef223eaa9c        mkulumadzi/ideas-angular-client   "nginx -g 'daemon ..."
    93e11369cba4        mkulumadzi/ideas-node-server      "npm start"  
    91dd2eba9d4b        mongo                             "/entrypoint.sh mo...

The ideas angular client is now available at http://192.168.99.100

Stopping a single container in the application:

    $ docker-compose -f ideas-app-docker-compose.yml stop webapp

Starting a single container:

    $ docker-compose -f ideas-app-docker-compose.yml start webapp

Inspecting the application's managed network:

    $ docker network ls
    NETWORK ID          NAME                DRIVER              SCOPE
    00d688216bf3        bridge              bridge              local
    ae8facdd6a9a        host                host                local
    fa5bff74d774        none                null                local

    $ docker network inspect bridge

    [
      {
          "Name": "bridge",
          "Id": "00d688216bf33c54bb72f4562f257e645e4f0bd24241292612f408516c75a11a",
          "Created": "2017-03-06T23:36:45.911606912Z",
          "Scope": "local",
          "Driver": "bridge",
          "EnableIPv6": false,
          "IPAM": {
              "Driver": "default",
              "Options": null,
              "Config": [
                  {
                      "Subnet": "172.17.0.0/16",
                      "Gateway": "172.17.0.1"
                  }
              ]
          },
          "Internal": false,
          "Attachable": false,
          "Containers": {
              "7cef223eaa9cca26bdb55f5795f5151c01b25636d4ef2156f17c44a311a11755": {
                  "Name": "dockertraining_webapp_1",
                  "EndpointID": "5ae2c624a60a739beedc2f9d87c70b565f895ccc8634aedf6f179765fe6a0388",
                  "MacAddress": "02:42:ac:11:00:04",
                  "IPv4Address": "172.17.0.4/16",
                  "IPv6Address": ""
              },
              "91dd2eba9d4bbd63bb50aaf0e534b910a1759c32aec6be09fbfba1c0aafad062": {
                  "Name": "dockertraining_mongodb_1",
                  "EndpointID": "1d4ef38a46b4f5433d32768c3083f9c6cf71a1887ef9c099107d5a9fd3743a80",
                  "MacAddress": "02:42:ac:11:00:02",
                  "IPv4Address": "172.17.0.2/16",
                  "IPv6Address": ""
              },
              "93e11369cba44832b3829553f975784a36055a2eefb5e43c4b0b9ba229e00e6a": {
                  "Name": "dockertraining_server_1",
                  "EndpointID": "a98589d664aeea3aeb1b51de8f5b7ae88cc4b0d28a582730e2ae23280862b492",
                  "MacAddress": "02:42:ac:11:00:03",
                  "IPv4Address": "172.17.0.3/16",
                  "IPv6Address": ""
              }
          },
          "Options": {
              "com.docker.network.bridge.default_bridge": "true",
              "com.docker.network.bridge.enable_icc": "true",
              "com.docker.network.bridge.enable_ip_masquerade": "true",
              "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
              "com.docker.network.bridge.name": "docker0",
              "com.docker.network.driver.mtu": "1500"
          },
          "Labels": {}
        }
    ]

## Running applications in a multi-host environment

A variety of tools are available to facilitate the management of an application running containers across multiple hosts.

COMING SOON: Intro to Docker Swarm.
