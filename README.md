# vegidio/nodejs

[![Actions](https://github.com/vegidio-docker/nodejs/workflows/build/badge.svg)](https://github.com/vegidio-docker/nodejs/actions)
[![Docker Pulls](https://img.shields.io/docker/pulls/vegidio/nodejs.svg)](https://hub.docker.com/r/vegidio/nodejs)
[![Apache 2.0](https://img.shields.io/badge/license-Apache_License_2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

A Docker image for Node.js that supports multiple applications running at the same instance.

This image inherits directly from the [official Node.js image](https://hub.docker.com/_/node) in the Docker Store.

## 🤖 Usage

### Pre-built image

Run the container using pre-built image **vegidio/nodejs**:

```
$ docker run -d \
    -p 8081:8081 \
    -p 8082:8082 \
    -v /path/to/local/www:/var/www \
    --name nodejs vegidio/nodejs
```

### Build the image

In the project root folder, type:

```
$ docker build -t vegidio/nodejs .
```

## 🧩 Setting-up multiple applications

The easiest way to set-up your applications to run in this single Node.js instance, is following the 2 configuration steps described below:

- Create the appropriate [Directory Structure](#directory-structure).
- Create the [config.yml](#configyml) file that will tell Node.js how each application is supposed to run.

### Directory Structure

1. In your local file system, create a folder where your Node.js applications will be located. In this example, we are using a folder called `www`.

2. Inside the `www` folder, you must create sub-folders where each application will be located. In this example, we created two sub-folders, `helloworld1` and `helloworld2`, each one representing a different application. The code for the applications must be placed on those folders.

3. Also inside the `www` folder, in the same level where your application folders are located, you must create a file called [config.yml](#configyml).

In the end, your directory structure should look like this:

```
www
├── config.yml
├── helloworld1
│   └── index.js
└── helloworld2
    └── index.js
```

### config.yml

You now must edit the configuration file to describe how each application must behave while running in your Node.js instance.

The **config.yml** file must have the following YAML structure, starting with a `apps:` element at the top and followed by the subelements described below:

```yml
apps:
  - name: helloworld1
    script: index.js
    cwd: /var/www/helloworld1/
    watch: true
    exec_mode: cluster
    env:
      NODE_PORT: 8081

  - name: helloworld2
    script: index.js
    cwd: /var/www/helloworld2/
    watch: true
    exec_mode: cluster
    env:
      NODE_PORT: 8082
```

These are the parameters that you must set for each application. All fields are mandatory:

- `name`: a string to uniquely identify your app.
- `script`: a string that specifies what script must be executed when the application runs.
- `cwd`: a string that specify the path where the application folder is located. **Important:** the path __must__ start with `/var/www/` and be concatenated with the folder that you created on step [#2](#directory-structure) of the directory structure.
- `env`: here you can specify the environment variables that you want to created when the script runs.

For the full list of parameters available to configure your application, please check the [PM2 documentation](http://pm2.keymetrics.io/docs/usage/application-declaration/).

## 🏃‍♂️ Running the instance

After you have both the directory structure and the `config.yml` file properly configured, you can now run the instance using the following command:

```
$ docker run -d \
    -p 8081:8081 \
    -p 8082:8082 \
    -v /path/to/local/www:/var/www \
    --name nodejs vegidio/nodejs
```

But before you run the instance don't forget to update/add/remove the ports (`-p` parameter) to reflect the ports that you set for each application in the `config.yml` file.

You also need to update the volume path (`-v` parameter) to reflect the correct path in your local environment. As for the path in the Docker instance, it must always be `/var/www`.

## 📝 License

**vegidio/nodejs** is released under the Apache License. See [LICENSE](LICENSE.txt) for details.

## 👨🏾‍💻 Author

Vinicius Egidio ([vinicius.io](http://vinicius.io))