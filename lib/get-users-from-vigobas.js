require('dotenv').config()
const sql = require('mssql')

module.exports = async () => {
  const config = {
    user: process.env.VIGOBAS_DB_USER,
    password: process.env.VIGOBAS_DB_PASSWORD,
    server: process.env.VIGOBAS_DB_SERVER,
    database: process.env.VIGOBAS_DB_DATABASE
  }

  // Return null if we don't want to speak with VigoBAS
  if (process.env.VIGOBAS !== 'true') {
    return null
  }

  const pool = await sql.connect(config)

  try {
    const { recordset } = await pool.request()
      .query(`SELECT SocialSecurityNumber, Username as username, WorkEmail + CASE WHEN UserType = 'employee' THEN '@vtfk.no' ELSE '@skole.vtfk.no' END AS mail FROM ${process.env.VIGOBAS_DB_TABLENAME}`)
    pool.close()
    return recordset
  } catch (error) {
    console.error(error)
  }
}
