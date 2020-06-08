# Yeoman generator for tray.io Node.JS connectors

This Yeoman generator allows you to quickly create a skeleton Node.JS project for tray.io connectors.

## Installation

To install this generator for use with Yeoman, use the following command in your terminal:

```npm install -g generator-trayio-nodejs-connector```

Make sure you have yeoman installed:
```npm install -g yo```

## Creating A Connector Project

Once you have setup Yeoman and installed this generator using NPM, you can now get started with creating a new skeleton project.

First you must create a new directory for your connector. Please only use lowercase letters and dashes.

```
mkdir my-custom-connector
cd my-custom-connector
```

Then run the generator using yo, following the instructions to create your skeleton project.

```yo trayio-nodejs-connector```

If you want to create workflow trigger connector, you will be prompted to **Include an HTTP trigger?**. If you say yes, a trigger connector will be created and the associated init operation handler and http request handlers.

## Running / Testing Your Connector

To run the connector, you'll need to run:

```
NODE_ENV=development node main.js
```