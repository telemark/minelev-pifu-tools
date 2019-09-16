const sql = require('mssql')
const config = {
  user: process.env.VIGOBAS_DB_USER,
  password: process.env.VIGOBAS_DB_PASSWORD,
  server: process.env.VIGOBAS_DB_SERVER,
  database: process.env.VIGOBAS_DB_DATABASE
}

module.exports = async ssn => {
  try {
    const pool = await sql.connect(config)
    const { recordset } = await pool.request()
      .input('SSN', sql.VarChar(11), ssn)
      .query(`SELECT TOP 1 Username FROM ${process.env.VIGOBAS_DB_TABLENAME} WHERE SocialSecurityNumber = @SSN`)
    return recordset.length > 0 ? recordset[0].Username : ''
  } catch (error) {
    console.error(error)
  }
}
