# Effing package manager docker

GitLab CI optimized Docker image for FPM

## Pulling

This image is on Docker Hub, you can pull it like this:
```
# docker pull adfinissygroup/effing-package-manager:latest
```

## Usage

This image is optimized to be used by the GitLab runners, but you can
use it standalone as well:

```
# docker run -it adfinissygroup/effing-package-manager:latest bash
# fpm --help
```

For FPM Usage please look at: https://github.com/jordansissel/fpm/wiki

## Building

Build the image:
```
# make image
```

Push it to Docker Hub:
```
# make push
```
