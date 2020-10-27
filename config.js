module.exports = {
  PIFU_FILES: [
    process.env.PIFU_XML_FILE_PATH_1,
    process.env.PIFU_XML_FILE_PATH_2
  ],
  OVERRIDE_FILE_PATH: process.env.OVERRIDE_FILE_PATH || false,
  GREP: {
    SPARQL_URL: process.env.GREP_SPARQL_URL || 'http://sandkasse-data.udir.no:7200/repositories/NavnFiksing',
    FAGKODER_QUERY: process.env.GREP_FAGKODER_QUERY || `
      PREFIX u: <http://psi.udir.no/ontologi/kl06/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?kode ?id ?uri ?data_url ?tittel_def ?tittel_nob ?tittel_nno ?tittel_sme ?tittel_smj ?tittel_sma ?tittel_eng ?kortform_def ?kortform_nob ?kortform_nno ?kortform_sme ?kortform_smj ?kortform_sma ?kortform_eng 
      WHERE {
        ?uri a u:fagkode ;
        u:id ?id ;
        u:kode ?kode ;
        u:url-data ?data_url ;
        u:tittel ?tittel_def ;
        u:status ?status .
        OPTIONAL { ?uri u:tittel ?tittel_nob . FILTER (lang(?tittel_nob) = 'nob') } .
        OPTIONAL { ?uri u:tittel ?tittel_nno . FILTER (lang(?tittel_nno) = 'nno') } .
        OPTIONAL { ?uri u:tittel ?tittel_sme . FILTER (lang(?tittel_sme) = 'sme') } .
        OPTIONAL { ?uri u:tittel ?tittel_smj . FILTER (lang(?tittel_smj) = 'smj') } .
        OPTIONAL { ?uri u:tittel ?tittel_sma . FILTER (lang(?tittel_sma) = 'sma') } .
        OPTIONAL { ?uri u:tittel ?tittel_eng . FILTER (lang(?tittel_eng) = 'eng') } .
        
        OPTIONAL { ?uri u:kortform ?kortform_def . FILTER (lang(?kortform_def) = 'default') } .
        OPTIONAL { ?uri u:kortform ?kortform_nob . FILTER (lang(?kortform_nob) = 'nob') } .
        OPTIONAL { ?uri u:kortform ?kortform_nno . FILTER (lang(?kortform_nno) = 'nno') } .
        OPTIONAL { ?uri u:kortform ?kortform_sme . FILTER (lang(?kortform_sme) = 'sme') } .
        OPTIONAL { ?uri u:kortform ?kortform_smj . FILTER (lang(?kortform_smj) = 'smj') } .
        OPTIONAL { ?uri u:kortform ?kortform_sma . FILTER (lang(?kortform_sma) = 'sma') } .
        OPTIONAL { ?uri u:kortform ?kortform_eng . FILTER (lang(?kortform_eng) = 'eng') } .
        FILTER REGEX(str(?status), "publisert", "i")
        FILTER (lang(?tittel_def) = 'default')   
      }
    `,
    UTDANNINGSPROGRAM_QUERY: process.env.GREP_UTDANNINGSPROGRAM_QUERY || `
      PREFIX u: <http://psi.udir.no/ontologi/kl06/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      SELECT ?kode ?id ?uri ?data_url ?type_utdanningsprogram ?tittel_def ?tittel_nob ?tittel_nno ?tittel_sme ?tittel_smj ?tittel_sma ?tittel_eng ?kortform_def ?kortform_nob ?kortform_nno ?kortform_sme ?kortform_smj ?kortform_sma ?kortform_eng 
      WHERE {
        ?uri a u:utdanningsprogram ;
        u:id ?id ;
        u:kode ?kode ;
        u:url-data ?data_url ;
        u:tittel ?tittel_def ;
        u:type-utdanningsprogram ?type_utdanningsprogram ;
        u:status ?status .
        OPTIONAL { ?uri u:tittel ?tittel_nob . FILTER (lang(?tittel_nob) = 'nob') } .
        OPTIONAL { ?uri u:tittel ?tittel_nno . FILTER (lang(?tittel_nno) = 'nno') } .
        OPTIONAL { ?uri u:tittel ?tittel_sme . FILTER (lang(?tittel_sme) = 'sme') } .
        OPTIONAL { ?uri u:tittel ?tittel_smj . FILTER (lang(?tittel_smj) = 'smj') } .
        OPTIONAL { ?uri u:tittel ?tittel_sma . FILTER (lang(?tittel_sma) = 'sma') } .
        OPTIONAL { ?uri u:tittel ?tittel_eng . FILTER (lang(?tittel_eng) = 'eng') } .
        
        OPTIONAL { ?uri u:kortform ?kortform_def . FILTER (lang(?kortform_def) = 'default') } .
        OPTIONAL { ?uri u:kortform ?kortform_nob . FILTER (lang(?kortform_nob) = 'nob') } .
        OPTIONAL { ?uri u:kortform ?kortform_nno . FILTER (lang(?kortform_nno) = 'nno') } .
        OPTIONAL { ?uri u:kortform ?kortform_sme . FILTER (lang(?kortform_sme) = 'sme') } .
        OPTIONAL { ?uri u:kortform ?kortform_smj . FILTER (lang(?kortform_smj) = 'smj') } .
        OPTIONAL { ?uri u:kortform ?kortform_sma . FILTER (lang(?kortform_sma) = 'sma') } .
        OPTIONAL { ?uri u:kortform ?kortform_eng . FILTER (lang(?kortform_eng) = 'eng') } .
        FILTER REGEX(str(?status), "publisert", "i")
        FILTER (lang(?tittel_def) = 'default')   
      }
    `,
    PROGRAMOMRAADER_QUERY: process.env.GREP_PROGRAMOMRAADER_QUERY || `
      PREFIX u: <http://psi.udir.no/ontologi/kl06/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      
      SELECT ?kode ?id ?uri ?data_url ?type_utdanningsprogram ?tittel_def ?tittel_nob ?tittel_nno ?tittel_sme ?tittel_smj ?tittel_sma ?tittel_eng ?kortform_def ?kortform_nob ?kortform_nno ?kortform_sme ?kortform_smj ?kortform_sma ?kortform_eng 
      WHERE {
        ?uri a u:programomraade ;
        u:id ?id ;
        u:kode ?kode ;
        u:url-data ?data_url ;
        u:utdanningsprogram-referanse ?up ;
        u:tittel ?tittel_def ;
        u:status ?status .
        OPTIONAL { ?uri u:tittel ?tittel_nob . FILTER (lang(?tittel_nob) = 'nob') } .
        OPTIONAL { ?uri u:tittel ?tittel_nno . FILTER (lang(?tittel_nno) = 'nno') } .
        OPTIONAL { ?uri u:tittel ?tittel_sme . FILTER (lang(?tittel_sme) = 'sme') } .
        OPTIONAL { ?uri u:tittel ?tittel_smj . FILTER (lang(?tittel_smj) = 'smj') } .
        OPTIONAL { ?uri u:tittel ?tittel_sma . FILTER (lang(?tittel_sma) = 'sma') } .
        OPTIONAL { ?uri u:tittel ?tittel_eng . FILTER (lang(?tittel_eng) = 'eng') } .
        
        OPTIONAL { ?uri u:kortform ?kortform_def . FILTER (lang(?kortform_def) = 'default') } .
        OPTIONAL { ?uri u:kortform ?kortform_nob . FILTER (lang(?kortform_nob) = 'nob') } .
        OPTIONAL { ?uri u:kortform ?kortform_nno . FILTER (lang(?kortform_nno) = 'nno') } .
        OPTIONAL { ?uri u:kortform ?kortform_sme . FILTER (lang(?kortform_sme) = 'sme') } .
        OPTIONAL { ?uri u:kortform ?kortform_smj . FILTER (lang(?kortform_smj) = 'smj') } .
        OPTIONAL { ?uri u:kortform ?kortform_sma . FILTER (lang(?kortform_sma) = 'sma') } .
        OPTIONAL { ?uri u:kortform ?kortform_eng . FILTER (lang(?kortform_eng) = 'eng') } .
        ?up u:type-utdanningsprogram ?type_utdanningsprogram .
        FILTER REGEX(str(?status), "publisert", "i")
        FILTER (lang(?tittel_def) = 'default')   
      }
    `
  }
}
