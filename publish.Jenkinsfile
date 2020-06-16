def authenticateNpm(String npmToken) {
    sh(String.format("npm config set //registry.npmjs.org/:_authToken=%s -q", npmToken))
}

pipeline {
    agent {
        docker {
            image "tray/node:10"
        }
    }

    environment {
        NPM_TOKEN = credentials("NPM_PUBLISH_TOKEN")
    }

    stages {

        stage("Install dependencies") {
            steps {
                authenticateNpm(env.NPM_TOKEN)
                sh("npm ci")
            }
        }
        stage("Publish packages") {
            steps {
                sshagent(["1a0031cf-e5b8-4c00-b6cb-b7e214edb435"]) {
                    sh("bash ./scripts/publish.sh")
                }
            }
        }
    }

    options {
        timeout(time: 5, unit: "MINUTES")
        timestamps()
        ansiColor("xterm")
        disableConcurrentBuilds()
    }
}