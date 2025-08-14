import { useState, useEffect } from 'react';
import { fetchTest } from '../../../api';
import { useNavigate, useParams } from 'react-router-dom';
// import GenerateTest from './pages/GenerateTest';
// import FinalizeTest from './pages/FinalizeTest';
import GiveTest from '../../Recruiter/combinedcodes/GiveTest';
// import TestSuccess from './pages/TestSuccess';

const GiveTestWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testQuestions, setTestQuestions] = useState([]);
  const [testDuration, setTestDuration] = useState(null); // Add state for duration
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadTest = async () => {
      try {
        const data = await fetchTest(id);
        console.log('📄 Fetched test data in GiveTestWrapper:', data); // Debug
        setTestQuestions(data.questions || []);
        setTestDuration(data.duration); // Set duration
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to load test:', err);
        setErrorMsg('This test is either expired or does not exist.');
        setLoading(false);
      }
    };
    loadTest();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-lg font-medium">Loading test...</p>;
  }

  if (errorMsg) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg font-semibold">
        {errorMsg}
        <br />
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <GiveTest
      testQuestions={testQuestions}
      testDuration={testDuration} // Pass duration
      questionSetId={id}
      onNavigate={(page) => {
        if (page === 'home') navigate('/');
        else if (page === 'generate') navigate('/'); // Match onNavigate in GiveTest
        else if (page === 'success') navigate('/success');
      }}
    />
  );
};

export default GiveTestWrapper;