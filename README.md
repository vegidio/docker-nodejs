# vegidio/nodejs

[![Travis](https://img.shields.io/travis/vegidio/docker-nodejs.svg)](https://travis-ci.org/vegidio/docker-nodejs/)
[![Docker Pulls](https://img.shields.io/docker/pulls/vegidio/nodejs.svg)](https://store.docker.com/community/images/vegidio/nodejs)
[![Apache 2.0](https://img.shields.io/badge/license-Apache_License_2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

A Docker image for Node.js that supports multiple applications running at the same instance.

This image inherits directly from the [official Node.js image](https://store.docker.com/images/node) in the Docker Store.

## Usage

### Pre-built image

Run the container using pre-built image **vegidio/nodejs**:

```
$ docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/local/www:/var/www \
    --name nodejs vegidio/nodejs
```

### Build the image

In the project root folder, type:

```
$ docker build -t my-nodejs-image .
```

## Setting-up multiple applications

The easiest way to set-up your applications to run in this single Node.js instance, is following the 2 configuration steps described below:

- Create the appropriate [Directory Structure](#directory-structure).
- Create the [config.json](#configjson) file that will tell Node.js how each application is supposed to run.

### Directory Structure

1. In your local file system, create a folder where your Node.js applications will be located. In this example, we are using a folder called `www`.

2. Inside the `www` folder, you must create sub-folders where each application will be located. In this example, we created two sub-folders, `helloworld1` and `helloworld2`, each one representing a different application. The code for the applications must be placed on those folders.

3. Also inside the `www` folder, in the same level where your application folders are located, you must create a file called [config.json](#configjson).

In the end, your directory structure should look like this:

```
www
├── config.json
├── helloworld1
│   └── index.js
└── helloworld2
    └── index.js
```

### config.json

You now must edit the configuration file to describe how each application must behave while running in your Node.js instance.

The **config.json** file must have the following structure - an JSON array `[` `]` with one or more JSON objects `{` `}` representing each application:

```json
[
    {
        "uid": "helloworld1",
        "append": true,
        "watch": false,
        "script": "index.js",
        "sourceDir": "/var/www/helloworld1",
        "args": ["8080"]
    },
    {
        "uid": "helloworld2",
        "append": true,
        "watch": false,
        "script": "index.js",
        "sourceDir": "/var/www/helloworld2",
        "args": ["8081"]
    }
]
```

These are the parameters that you must set for each application. All fields are mandatory:

- `uid`: a string to uniquely identify your app.
- `append`: a boolean to set if you want the application logs to be appended together every time the server runs.
- `watch`: a boolean to set if you want the application to automatically restart when a file is changed or created in the application folder.
- `script`: a string that specifies what script must be executed when the application runs.
- `sourceDir`: a string that specify the path where the application folder is located. **Important:** the path __must__ start with `/var/www/` and be concatenated with the folder that you created on step [#2](#directory-structure) of the directory structure.
- `args`: an array with the list of ports (in string format) that you want to expose for that application.

## Running the instance

After you have both the directory structure and the `config.json` file properly configured, you can now run the instance using the following command:

```
$ docker run -d \
    -p 8080:8080 \
    -p 8081:8081 \
    -v /path/to/local/www:/var/www \
    --name nodejs vegidio/nodejs
```

But before you run the instance don't forget to update/add/remove the ports (`-p` parameter) to reflect the ports that you set for each application in the `config.json` file.

You also need to update the volume path (`-v` parameter) to reflect the correct path in your local environment. As for the path in the Docker instance, it must always be `/var/www`.

## License

**vegidio/nodejs** is released under the Apache License. See [LICENSE](LICENSE.txt) for details.

## Author

Vinicius Egidio ([vinicius.io](http://vinicius.io))
