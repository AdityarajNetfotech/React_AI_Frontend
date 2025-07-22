import React, { useContext } from 'react'
import { AuthContext } from '../../Components/Context/RecruiterContext'

const RecruiterMainLandingPage = () => {

  const { recruiterData, setRecruiterData } = useContext(AuthContext) 

  console.log( "Recruiterdata" ,recruiterData)

  if (!recruiterData) {
    return <div className='text-center mt-8 text-gray-500'>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-3xl text-blue-700 text-center mb-4'>Welcome {recruiterData.name} to Recruiter Landing Page</h1>
      <p className='mb-2'>ID: {recruiterData._id}</p>
      <p className='mb-2'>NAME: {recruiterData.name}</p>
      <p className='mb-2'> EMAIL: {recruiterData.email}</p>
      <p className='mb-2'>COMPANY_NAME :{recruiterData.companyName}</p>
      <p className='mb-2'>COMPANY_WEBSITE: {recruiterData.companyWebsite}</p>
      <p className='mb-2'>MOBILE_NUMBER: {recruiterData.number}</p>
      <p className='mb-2'> DESIGNATION: {recruiterData.designation}</p>
      <p className='mb-2'>INDUSTRY: {recruiterData.industry}</p>
      <p className='mb-2'>LINKEDIN_PROFILE: {recruiterData.linkedInProfile}</p>
      {/* <p className='mb-2'>TOKEN: {recruiterData.token}</p> */}
    </div>
  )
}

export default RecruiterMainLandingPage
