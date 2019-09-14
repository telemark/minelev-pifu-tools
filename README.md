# minelev-pifu-tools

Tools for converting data from pifu.xml to tjommi

## Setup

Add a local `.env` file and configure it for your environment

```
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

### extract
Extracts various groups of data

```
$ npm run extract:memberships
```

```
$ npm run extract:groups
```

```
$ npm run extract:groups:skoler
```

```
$ npm run extract:groups:basisgrupper
```

```
$ npm run extract:groups:undervisningsgrupper
```

```
$ npm run extract:groups:kontaktlarergrupper
```

```
$ npm run extract:groups:faggrupper
```

```
$ npm run extract:persons
```

```
$ npm run extract:persons:students
```

```
$ npm run extract:persons:teachers
```

# License

[MIT](LICENSE)
