# minelev-vis-tools

Tools for converting data from ViS to tjommi

## Setup

Add a local `.env` file and configure it for your environment

```
VIS_PERSONS=http://VigoBas.server/PifuPerson
VIS_GROUPS=http://VigoBas.server/PifuGroup
VIS_MEMBERSHIPS=http://VigoBas.server/PifuMembership
MONGODB_CONNECTION=mongodb-connection-string
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongo-db-name
```

## Scripts
These are the individual scripts used to manipulate and structure the data from ViS

It is important to run the scripts in the listed order, as their results depend on each other!

### vis:files
Downloads constructed files from VigoBas
- `groups.json`
- `persons.json`
- `memberships.json`

```
$ npm run vis:files
```

### extract
Extracts various groups of data

**Extract all**
```
npm run extract:all
```

**Or extract each part**

```
$ npm run extract:grep
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
$ npm run extract:groups:utdanningsprogrammer
```

```
$ npm run link:groups:utdanningsprogrammer
```

```
$ npm run merge:groups
```

```
$ npm run extract:persons:students
```

```
$ npm run extract:persons:teachers
```

```
$ npm run extract:export
```

### export data full

Flush database and add all entries from *export.json*

```
$ npm run export:full
```

### export data delta

Compare data in database and *export.json* and `add`/`update`/`remove` accordingly

```
$ npm run export:delta
```

# License

[MIT](LICENSE)
