# minelev-pifu-tools

Tools for converting data from pifu.xml to tjommi

## Setup

Add a local `.env` file and configure it for your environment

```
PIFU_XML_FILE_PATH_1=path-to-pifu-xml-file
PIFU_XML_FILE_PATH_2=path-to-another-pifu-xml-file
MONGODB_CONNECTION=mongodb-connection-string
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongo-db-name
MONGODB_COSMOS_RUS=400
VIGOBAS=true
VIGOBAS_DB_SERVER=servername
VIGOBAS_DB_USER=user
VIGOBAS_DB_PASSWORD=vigobas-password
VIGOBAS_DB_DATABASE=vigobas-database
VIGOBAS_DB_TABLENAME=[dbo].[User]
```

## Scripts
These are the individual scripts used to manipulate and structure the data from the pifu.xml

It is important to run them in the listed order.

### convert
Converts pifu-xml file to a json file

```
$ npm run convert
```

### extract
Extracts various groups of data

Extract all
```
npm run extract:all
```

Or extract each part

```
$ npm run extract:memberships
```

```
$ npm run extract:groups
```

```
$ npm run extract:groups:skoleeier
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
$ npm run merge:groups
```

```
$ npm run extract:vigobasUsers
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

### export data

```
$ npm run export
```

# License

[MIT](LICENSE)
