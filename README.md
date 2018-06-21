# Yeoman generator for tray.io Node.JS connectors

This Yeoman generator allows you to quickly create a skeleton Node.JS project for tray.io connectors, and provides several commands you can use to do things like create new connectors or add new operation handlers.

The core functionality of a Node.JS connector is wrapped up into the [tray.io Node.JS connector sdk](https://github.com/trayio/trayio-connector-sdk-nodejs), you should also read the connector specification so you understand how the connector works.

## Getting Started

To start using this generator, you need to first follow the [Yeoman Getting Started](http://yeoman.io/learning/index.html) Guide.

## Installation

To install this generator for use with Yeoman, use the following command in your terminal:

```npm install -g generator-trayio-nodejs-connector```


## Creating A Connector Project

Once you have setup Yeoman and installed this generator using NPM, you can now get started with creating a new skeleton project.

First you must create a new directory for your connector. Please only use lowercase letters and dashes.

```
mkdir my-custom-connector
cd my-custom-connector
```

Then run the generator using yo, followig the instructions to create your skeleton project.

```yo trayio-nodejs-connector```

If you want to create workflow trigger connector, you will be prompted to **Include an HTTP trigger?**. If you say yes, a trigger connector will be created and the associated init operation handler and http request handlers. For more information see the **HTTP Connectors** section below.

## Running / Testing Your Connector

To run the connector, you'll need to run:

```
NODE_ENV=development node main.js
```

You'll also need to run `yart` in your command line to mimic how the tray platform will interact with your connector.


### Grunt workflow

* Run `grunt dev` to automatically lint JS files as you go. 
* Run `grunt` to link them just the once

More to come here.


