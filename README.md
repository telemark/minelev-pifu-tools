# minelev-vis-tools

Tools for converting data from ViS to tjommi

## Setup

Add a local `.env` file and configure it for your environment

```
VIS_PERSONS=http://VigoBas.server/PifuPerson
VIS_GROUPS=http://VigoBas.server/PifuGroup
VIS_MEMBERSHIPS=http://VigoBas.server/PifuMembership
VIS_USERNAME=username # add this to use basic auth
VIS_PASSWORD=password # add this to use basic auth
MONGODB_CONNECTION=mongodb-connection-string
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongo-db-name
```

## Extras

Sometimes there's the need (for speed) to add some extra groups/students/teachers permanently temporaily.
If you feel this need, add a `extras.json` file in the root of the project with this schema:
```json
{
  "groups": [
    {
      "id": "1327096",
      "groupId": "SMI:1STA",
      "type": "basisgruppe",
      "name": "1STA",
      "description": "Basisgruppe 1STA ved Skolen for sosiale og medisinske institusjoner",
      "schoolId": "38321",
      "schoolName": "Skolen for sosiale og medisinske institusjoner",
      "validFrom": "2021-08-01",
      "validTo": "2022-07-31",
      "adminPeriod": "2021/2022",
      "memberIds": [
        "01010101011",
        "10101010101"
      ]
    }
  ],
  "students": [
    {
      "id": "01010101011",
      "ssn": "01010101011",
      "type": "student",
      "username": "tes0101",
      "sasUsername": "15203410",
      "givenName": "Test",
      "familyName": "Testesen",
      "fullName": "Test Testesen",
      "birthday": "2001-01-01",
      "email": "tes0101@skole.vtfk.no",
      "personalEmail": "",
      "phone": "",
      "address": {},
      "mainGroupName": "SMI:1STA",
      "level": "VG1",
      "utdanningsprogrammer": [],
      "groups": [],
      "groupIds": [
        "1327096",
        "1327096_427983",
      ],
      "schoolIds": [
        "38321",
      ],
      "basisgruppeIds": [
        "1327096"
      ],
      "kontaktlarergruppeIds": [
        "1327096_427983"
      ],
      "undervisningsgruppeIds": [],
      "utdanningsprogramIds": []
    }
  ],
  "teachers": [
    {
      "id": "10101010101",
      "ssn": "10101010101",
      "type": "teacher",
      "username": "tes1010",
      "sasUsername": "tes1010",
      "givenName": "Test",
      "familyName": "Testesen2",
      "fullName": "Test Testesen2",
      "birthday": "2010-10-10",
      "email": "tes1010@vtfk.no",
      "personalEmail": "",
      "phone": "81549300",
      "address": {},
      "mainGroupName": false,
      "level": false,
      "utdanningsprogrammer": [],
      "groups": [],
      "groupIds": [
        "1327096",
        "1327096_427983"
      ],
      "schoolIds": [
        "38026"
      ],
      "basisgruppeIds": [
        "1327096"
      ],
      "kontaktlarergruppeIds": [
        "1327096_427983"
      ],
      "undervisningsgruppeIds": [
      ],
      "utdanningsprogramIds": []
    }
  ]
}
```

The `extras.json` file will be read and merged into `export.json` when script `add:extras` is executed

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

```
$ npm run add:extras
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
