(async () => {
  const exportRelativeFilePath = '../../data/export.json'

  const colors = require('colors')
  const figures = require('figures')
  const inquirer = require('inquirer')
  const { writeFileSync } = require('fs')
  const { join } = require('path')
  const data = require(exportRelativeFilePath)

  const { teacherId, mockTeacherId, username, firstName, lastName, birthday, email, phone } = await inquirer.prompt([
    {
      type: 'input',
      name: 'teacherId',
      message: 'Teacher fnr to mock from:',
      validate: input => input.length === 11
    },
    {
      type: 'input',
      name: 'mockTeacherId',
      message: 'Fnr of user to mock in:',
      validate: input => input.length === 11
    },
    {
      type: 'input',
      name: 'username',
      message: 'SamAccountName:',
      validate: input => input.length >= 7 && input.length <= 8
    },
    {
      type: 'input',
      name: 'firstName',
      message: 'Firstname of user to mock in:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Lastname of user to mock in:'
    },
    {
      type: 'input',
      name: 'birthday',
      message: 'Birthday of user to mock in (optional):',
      default: () => {
        const today = new Date()
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email of user to mock in:',
      validate: input => input.includes('@')
    },
    {
      type: 'input',
      name: 'phone',
      message: 'Phone number of user to mock in (optional):',
      default: () => '81549300'
    }
  ])

  if (!teacherId) {
    console.log(colors.red(`${figures.cross} Teacher fnr is required!`))
    process.exit(-1)
  }
  if (!mockTeacherId) {
    console.log(colors.red(`${figures.cross} Mock user fnr is required!`))
    process.exit(-1)
  }
  if (!username) {
    console.log(colors.red(`${figures.cross} Username is required!`))
    process.exit(-1)
  }
  if (!firstName) {
    console.log(colors.red(`${figures.cross} Firstname is required!`))
    process.exit(-1)
  }
  if (!lastName) {
    console.log(colors.red(`${figures.cross} Lastname is required!`))
    process.exit(-1)
  }
  if (!email) {
    console.log(colors.red(`${figures.cross} Email is required!`))
    process.exit(-1)
  }

  // find teacher and replace info with mock teacher info
  const teacher = data.find(item => item.id === teacherId)
  const mockTeacher = {
    ...teacher,
    id: mockTeacherId,
    ssn: mockTeacherId,
    username,
    sasUsername: username,
    givenName: firstName,
    familyName: lastName,
    fullName: `${firstName} ${lastName}`,
    birthday,
    email,
    phone
  }

  // loop through groupIds and add mock teacher as member as well
  mockTeacher.groupIds.forEach(group => {
    const groupItem = data.find(item => item.id === group)
    groupItem.memberIds.push(mockTeacherId)
  })

  // add mock teacher to export
  data.push(mockTeacher)

  const exportPath = join(__dirname, `/${exportRelativeFilePath}`)
  const usernamePath = join(__dirname, `/../../data/${mockTeacher.username}.json`)
  writeFileSync(exportPath, JSON.stringify(data, null, 2), 'utf8')
  writeFileSync(usernamePath, JSON.stringify(mockTeacher, null, 2), 'utf8')
  console.log('\n', mockTeacher)
  console.log('\n', `Mock teacher (${firstName} ${lastName}) added to:`)
  console.log(colors.green(`${figures.tick} ${exportPath}`))
  console.log(colors.green(`${figures.tick} ${usernamePath}`))
})()
