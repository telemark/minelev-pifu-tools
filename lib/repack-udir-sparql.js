const getValue = (obj) => {
  if (!obj) return undefined
  if (!obj.value) return undefined
  return obj.value
}

module.exports = (sparqlObj) => {
  return {
    id: getValue(sparqlObj.id).replace('uuid:', ''),
    kode: getValue(sparqlObj.kode),
    url: getValue(sparqlObj.uri),
    data_url: getValue(sparqlObj.data_url),
    type_utdanningsprogram: getValue(sparqlObj.type_utdanningsprogram),
    tittel: {
      default: getValue(sparqlObj.tittel_def),
      nob: getValue(sparqlObj.tittel_nob),
      nno: getValue(sparqlObj.tittel_nno),
      eng: getValue(sparqlObj.tittel_eng),
      sme: getValue(sparqlObj.tittel_sme),
      smj: getValue(sparqlObj.tittel_smj),
      sma: getValue(sparqlObj.tittel_sma)
    },
    kortform: {
      default: getValue(sparqlObj.kortform_def),
      nob: getValue(sparqlObj.kortform_nob),
      nno: getValue(sparqlObj.kortform_nno),
      eng: getValue(sparqlObj.kortform_eng),
      sme: getValue(sparqlObj.kortform_sme),
      smj: getValue(sparqlObj.kortform_smj),
      sma: getValue(sparqlObj.kortform_sma)
    }
  }
}
