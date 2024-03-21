import axios from "axios";
export default async function executecode(sourceCode, languageId, stdin) {
       const options = {
         method: 'POST',
         url: 'https://judge0-ce.p.rapidapi.com/submissions',
         params: {
           base64_encoded: 'true',
           fields: '*'
         },
         headers: {
           'content-type': 'application/json',
           'X-RapidAPI-Key': '327cc48bd7msh959f0bb3761023dp1b312bjsnb1eeb33d5327',
           'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
         },
         data: {
           language_id: languageId,
           source_code: sourceCode,
           stdin: stdin
         }
       };
     
       try {
         const response = await axios.request(options);
         console.log(response);
         return response;
       } catch (error) {
         console.error(error);
         return error;
       }
     }