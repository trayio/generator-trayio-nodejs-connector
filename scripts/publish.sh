#!/usr/bin/env bash

set -xe

allowUnknownKeyHostsPairsInGit() {
    export GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"
}

checkIfAlreadyPublished() {
  name=$(node -pe "require('./package.json').name")
  latestVersion=$(npm show $name:latest version)
  if [ "$latestVersion" == "$version" ]; then
    echo "Version $version is already the latest published version"
    exit 0
  fi
}

publish() {
  npm publish
}

tag() {
  git tag $version
  git push origin tags/$version
}
version=$(node -pe "require('./package.json').version")
checkIfAlreadyPublished
allowUnknownKeyHostsPairsInGit

publish
tag