# Docker Training
A collection of instructions and sample files for training on Docker

# Docker Machine

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

Create a machine called 'dev' using the VirtualBox driver:

    $ docker-machine create --driver virtualbox dev

Create a machine called 'server' with default ssh user 'ubuntu' on AWS using the ec2 driver, running Ubuntu Server 16.10 (the ami is the machine operating system):

    $ docker-machine create --driver amazonec2 --amazonec2-access-key $AWS_ACCESS_KEY --amazonec2-secret-key $AWS_SECRET_KEY --amazonec2-region us-west-2 --amazonec2-instance-type m3.medium --amazonec2-ami ami-319e1e51 --amazonec2-ssh-user ubuntu server

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

# Docker Basics

## Commands:
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

## Examples

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

Stop a running container:

    $ docker stop <CONTAINER ID>

Remove a running container:

    $ docker rm -f <CONTAINER ID>

Print a list of installed docker *images*:

    $ docker images
    REPOSITORY              TAG     ...
    macinv/flask-example    latest  ...
