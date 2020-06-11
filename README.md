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
VIGOBAS=true
VIGOBAS_DB_SERVER=servername
VIGOBAS_DB_USER=user
VIGOBAS_DB_PASSWORD=vigobas-password
VIGOBAS_DB_DATABASE=vigobas-database
VIGOBAS_DB_TABLENAME=[dbo].[User]
PIFU_XML_FILE_PATH_1=data/pifu-tfk.xml
PIFU_XML_FILE_PATH_2=data/pifu-vfk.xml
```

## Scripts
These are the individual scripts used to manipulate and structure the data from the pifu.xml
The script support merging of multiple pifu.xml files.

It is important to run the scripts in the listed order, as their results depend on each other!

### convert
Converts the pifu-xml files to a json file (pifu.json)

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
