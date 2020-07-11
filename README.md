# vegidio/nodejs

[![GitHub Actions](https://img.shields.io/github/workflow/status/vegidio-docker/nodejs/build)](https://github.com/vegidio-docker/nodejs/actions)
[![Docker Pulls](https://img.shields.io/docker/pulls/vegidio/nodejs.svg)](https://hub.docker.com/r/vegidio/nodejs)
[![ISC License](https://img.shields.io/npm/l/vimdb?color=important)](LICENSE.txt)

A Docker image for Node.js that supports multiple applications running at the same instance.

This image inherits directly from the [official Node.js image](https://hub.docker.com/_/node) in the Docker Store.

## 🤖 Usage

Run the container using the pre-built image **vegidio/nodejs**:

```
$ docker run \
    -e APPS_PREFIX=site \
    -v /path/to/local/www:/var/www \
    -p 80:80 \
    nodejs vegidio/nodejs
```

## 🧩 Setting-up multiple applications

The easiest way to set-up your applications to run in this single Node.js instance, is following the 2 configuration steps described below:

- Create the appropriate [Directory Structure](#directory-structure).
- Create the [apps.config.js](#appsconfigjs) file that will tell Node.js how each application is supposed to run.

### Directory Structure

1. In your local file system, create a folder where your Node.js applications will be located. In this example, we are using a folder called `www`.

2. Inside the `www` folder, you must create sub-folders where each application will be located. In this example, we created two sub-folders, `helloworld1` and `helloworld2`, each one representing a different application. The code for the applications must be placed on those folders.

3. Also inside the `www` folder, in the same level where your application folders are located, you must create a file called [apps.config.js](#appsconfigjs).

In the end, your directory structure should look like this:

```
www
├── apps.config.js
├── helloworld1
│   └── index.js
└── helloworld2
    └── index.js
```

### apps.config.js

You now must edit the configuration file to describe how each application must behave while running in your Node.js instance.

The **apps.config.js** file must have the following JavaScript structure, starting with a `apps:` element at the top and followed by the subelements described below:

```javascript
module.exports = {
    apps: [{
        name: "helloworld1",
        script: "npm",
        args: "start",
        cwd: "/var/www/helloworld1/",
        watch: true,
        ignore_watch: ["node_modules", "package-lock.json"],
        exec_mode: "cluster"
    }, {
        name: "helloworld2",
        script: "index.js",
        cwd: "/var/www/helloworld2/",
        watch: true,
        ignore_watch: ["node_modules", "package-lock.json"],
        exec_mode: "cluster"
    }]
}
```

These are some mandatory parameters that you must set for each application:

- `name`: a string to uniquely identify your app.
- `script`: a string that specifies what script must be executed when the application runs.
- `cwd`: a string that specify the path where the application folder is located. **Important:** the path __must__ start with `/var/www/` and be concatenated with the folder that you created on step [#2](#directory-structure) of the directory structure.
- `env`: here you can specify the environment variables that you want to created when the script runs.

For the full list of parameters available to configure your application, please check the [PM2 documentation](http://pm2.keymetrics.io/docs/usage/application-declaration/).

## 🏃‍♂️ Running the instance

After you have both the directory structure and the `apps.config.js` file properly configured, you can now run the instance using the following command:

```
$ docker run -d \
    -v /path/to/local/www:/var/www \
    -p 80:80 \
    --name nodejs vegidio/nodejs
```

Don't forget to update the volume path (`-v` parameter) above to reflect the correct path in your local environment. As for the path in the Docker instance, it must always be `/var/www`.

### Listening port

In order for the reverse proxy to work and you be able to access your applications through friendly URLs, instead of server ports (i.e. `localhost/app/hello` 👍, instead of `localhost:50487` 🤮), you must make sure that your app listen to the correct port when it's executed.

Each application will have the environment variable `NODE_PORT` automatically injected in it, so make sure to listen to the port contained in this variable. For example, if you are creating an Express.js application then your code will look similar to this:

```typescript
import * as express from 'express'
const app = express()

// The port comes from the environment variable NODE_PORT
app.listen(process.env.NODE_PORT, () => console.log('Listening to the correct port!'))
```

### Accessing your applications

With the container running, each app can be accessed through the URL [container_url/`prefix`/`name`](); where `name` is the parameter that you defined for each app in the [apps.config.js](#appsconfigjs) file above.

As for `prefix`, the default value is `app`; so if you run a application called **restapi** then the URL to access it will [container_url/app/restapi](). The prefix can be changed by you to something else by passing the environment variable `APPS_PREFIX` when you execute the container.

## 🛠 Build the image

If you prefer to build this image yourself, instead of using the pre-built image available on [Docker Hub](https://hub.docker.com/r/vegidio/nodejs), then enter the following command in terminal, in the project's root directory:

```
$ docker build -t vegidio/nodejs --build-arg VERSION=1.2.3 .
```

## 📝 License

**vegidio/nodejs** is released under the ISC License. See [LICENSE](LICENSE.txt) for details.

## 👨🏾‍💻 Author

Vinicius Egidio ([vinicius.io](http://vinicius.io))