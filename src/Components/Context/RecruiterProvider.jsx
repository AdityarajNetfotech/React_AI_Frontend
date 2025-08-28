import React, { useState, useEffect } from 'react'
import { AuthContext } from './RecruiterContext';
import axios from "axios";
import { baseUrl } from '../../utils/ApiConstants';


const RecruiterProvider = ({ children }) => {

  const [recruiterData, setRecruiterData] = useState(null);

  useEffect(() => {
    const fetchRecruiter = async (req, res) => {
      const token = localStorage.getItem("recruiterAuthToken");

      if (!token)
        return;

      try {
        const response = await axios.get(`${baseUrl}/api/recruiter/getRecruiterData`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setRecruiterData(response.data);
      } catch (error) {
        console.log(error);
      }

    }

    fetchRecruiter();

  }, [])

  const recruiterObj = { recruiterData, setRecruiterData };

  return (
    <AuthContext.Provider value={recruiterObj}>
      {children}
    </AuthContext.Provider>
  )
}

export default RecruiterProvider
