import React, { useState } from "react";
import axios from "axios";
import "./CodeSubmissionForm.css";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const CodeSubmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    codeLanguage: "C",
    stdin: "",
    sourceCode: "",
  });

  const langIdMap = {
    C: 49,
    Java: 27,
    JavaScript: 63,
    Python: 70,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var { sourceCode, stdin, codeLanguage } = formData;
    //console.log(codeLanguage);
    const languageId = langIdMap[codeLanguage];
    console.log(codeLanguage);
    //  var sourcecode=JSON.stringify(sourcecode);
    // var stdin=JSON.stringify(stdin);
    var encodedSourceCode = await btoa(sourceCode);
    var encodedStdin = await btoa(stdin);
    //const var=`${encodedSourceCode}`'&'+`s='${encodedStdin}'
    console.log(encodedSourceCode);
    console.log(stdin);

    //console.log(encodedSourceCode);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": '86244e55fdmshb71ff5fd01cce8fp1fb6e2jsndb9f024be764', // Replace with your RapidAPI Key
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
      },
      data: {
        language_id: languageId,
        source_code: encodedSourceCode,
        stdin: encodedStdin,
      },
    };

    try {
      const response1 = await axios.request(options);
     
      //console.log(jsonresponse);
      const token = response1.data.token;
       console.log(token);
      //console.log(response1.data);
      const options2 = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "X-RapidAPI-Key":
            "86244e55fdmshb71ff5fd01cce8fp1fb6e2jsndb9f024be764", // Replace with your RapidAPI Key
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      };

      const response2 = await axios.request(options2);
      var { stderr, stdout ,compile_output} = response2.data;
      
    
      compile_output=atob(compile_output);
     stdout=atob(stdout);
     console.log(compile_output);
      //console.log(stdout);
      if (!stdout ) stdout= "compilation error or runtime error";
     
      console.log(stdout);
      if (stderr == null) {
        const response = await axios.post("https://backend-swarajbharadwaj-swaraj-kumars-projects.vercel.app/submit", {
          username: formData.username,
          codeLanguage: formData.codeLanguage,
          stdin: formData.stdin,
          sourceCode: formData.sourceCode,

          out: stdout,
        });

        alert(response.data.message);
        console.log("Form submitted:", formData);
        navigate("/Snippet");
        // Redirect to another page after submission
        // Change "/success" to your desired route
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Code Submission Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="codeLanguage">Preferred Code Language:</label>
          <select
            id="codeLanguage"
            name="codeLanguage"
            value={formData.codeLanguage}
            onChange={handleChange}
          >
            <option value="C">C</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="standardInput">Standard Input:</label>
          <textarea
            id="standardInput"
            name="stdin"
            value={formData.stdin}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sourceCode">Source Code:</label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            rows={8}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CodeSubmissionForm;
