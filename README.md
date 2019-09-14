# minelev-pifu-tools

Tools for converting data from pifu.xml to tjommi

## Setup

Add a local `.env` file and configure it for your environment

```
DATA_DIRECTORY_PATH=path-to-data-directory
PIFU_XML_FILE_PATH=path-to-pifu-xml-file
MONGODB_CONNECTION=mongodb-connection-string
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongo-db-name
```

## Scripts
These are the individual scripts used in the run all

### convert
Converts pifu-xml file to a json file

```
$ npm run convert
```


# License

[MIT](LICENSE)
