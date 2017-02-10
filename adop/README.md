# What is a Cartridge?

A Cartridge is a set of resources that are loaded into ADOP for a particular project. They may contain anything from a simple reference implementation for a technology to a set of best practice examples for building, deploying, and managing a technology stack that can be used by a project.

This cartridge consists of source code repositories and jenkins jobs for the adop-pipeline-builder 

## Source code repositories

Cartridge loads this source code repository only 

## Jenkins Jobs

This cartridge generates the jenkins jobs and pipeline views to -

* Performs static code analysis using Dockerlint on the Dockerfile in the Git repository.
* Builds the app and the Dockerfile.
* Performs a vulnerability scan on the built image using Clair [Requires Clair Platform Extension](https://github.com/kramos/adop-platform-extension-clair)
* Container testing by creating a new testing image internally.
* Pushes the built and scanned image to a registry.

**Note** : The credential parameter used in the jenkins job expects the docker hub credentials to be added to jenkins with ID **docker-credentials**.

# License
Please view [license information](LICENSE.md) for the software contained on this image.

## Documentation
Documentation will be captured within this README.md and this repository's Wiki.

## Issues
If you have any problems with or questions about this repository, please contact us through a GitHub issue.

## Contribute
You are invited to contribute new features, fixes, or updates, large or small; we are always thrilled to receive pull requests, and do our best to process them as fast as we can.

Before you start to code, we recommend discussing your plans through a GitHub issue, especially for more ambitious contributions. This gives other contributors a chance to point you in the right direction, give you feedback on your design, and help you find out if someone else is working on the same thing.
