#Yeoman generator for tray.io Node.JS connectors

This Yeoman generator allows you to quickly create a skeleton Node.JS project for tray.io connectors.

There are several commands you can use with this generator to do things like create new connectors or add new message handlers.

##Getting Started

To start using this generator, you need to first follow the [Yeoman Getting Started](http://yeoman.io/learning/index.html) Guide.

##Installation

To install this generator for use with Yeoman, use the following command in your terminal:

```npm install -g generator-trayio-nodejs-connector```


##Creating A Connector Project

Once you have setup Yeoman and installed this generator using NPM, you can now get started with creating a new skeleton project.

First you must create a new directory for your connector. Please only use lowercase letters and dashes.

```
mkdir my-custom-connector
cd my-custom-connector
```

Then run the generator using yo, followig the instructions to create your skeleton project.

```yo trayio-nodejs-connector```

If you want to create workflow trigger connector, you will be prompted to **Include an HTTP trigger?**. If you say yes, a trigger connector will be created and the associated init message handler and http request handlers. For more information see the **HTTP Connectors** section below.

##Running / Testing Your Connector

If you want to test your connector you can run it using the included `yart_run.sh`.  This is for use with our Yart connector testing tool and has the default environment variables already set for you. Please see yart for more details.

##Creating Connectors

Each project can support many connectors.  Each connector defined within a project will be displayed as a seperate icon with the tray.io builder interface.  When you created your skeleto project if you chose Yes when asked **Include an HTTP trigger?**, the generator will have already created a trigger connector for you, you can however create additional connectors which represent general service functionality or outputs.

Please remember to try and defined as few connectors as possible.  In general you should only need a single trigger connector and a generic service connector.

To create a new connector you can run the following yo command, which will prompt you for some details about the new connector.

```yo trayio-nodejs-connector:connector```

####Connector Name
The name of your connector.  Please use only lower case a-z and dashes.

####Connector Type
The connector type, which is used to group and display the connector in the tray.io builder UI using different colours.

- trigger: a connector that kicks off a workflow
- logic: a connector that affects the flow or execution of the workflow
- service: a connector that represents an external service or platform
- output: a connector whos primary goal is to output data somewhere

####Help Link
An optional URL to a help document about the connector.


##Creating HTTP Workflow Triggers

If you didnt create an HTTP trigger when you created the skeleton project, or if you wish to create an additional one, run the following yo command and follow the instructions.

```yo trayio-nodejs-connector:trigger```


##Creating Message Handlers

To create a new message handler, run the following yo command and follow the instructions.

```yo trayio-nodejs-connector:message```