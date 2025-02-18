import { Question, University } from '../types/types'
import "../assets/styles/home.css";
import "../assets/styles/universityDetails.css";
import { useEffect } from 'react';
import NavBar from '../components/NavBar';
import UniDetails from '../components/UniDetails';

const universityNames = [
  "İstanbul University",
  "Hacettepe University",
  "Ankara University",
  "Boğaziçi University",
  "Middle East Technical University",
  "Ege University",
  "İzmir Institute of Technology",
  "Koç University",
  "Sabancı University",
  "Bilkent University",
  "Yıldız Technical University",
  "Marmara University",
  "Dokuz Eylül University",
  "Gazi University",
  "Çukurova University",
  "Uludağ University",
  "Atatürk University",
  "Karadeniz Technical University",
  "Akdeniz University",
  "Erciyes University"
];
  
  const questions = [
    'What is the admission process?',
    'What are the tuition fees?',
    'What scholarships are available?',
    'What is the campus life like?',
    'What are the accommodation options?',
    'What are the research opportunities?',
    'What is the student-to-faculty ratio?',
    'What are the internship opportunities?',
    'What is the graduation rate?',
    'What are the job placement rates?'
  ];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function UniPage() {

    const universityChosen: University[]= universityNames.map((name, index) => ({
          uni_id: 100 + index,
          uni_name: name,
          il_id: getRandomInt(1, 81),
          status: 1
        })).filter((uni) => uni.uni_id === getRandomInt(101,120));

    const questionArray:Question[]= questions.map((question, index) => ({ 
        question_id: 100 + index,
        question_text: question,
        created_at: new Date(),
        Answers: getRandomInt(0, 10)
      }));

    


  useEffect(() => {
    document.body.style.backgroundImage = `url('/uni_background/${universityChosen[0].uni_id}.jpg')`;
  }, []);

  return (
    <div>
        <NavBar user={{id: '1', userType: 'student'}} />
        <UniDetails university={universityChosen[0]} questions={questionArray} />
    </div>
  )
}

export default UniPage