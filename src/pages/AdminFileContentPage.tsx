import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import "../assets/styles/fileContent.css";
import { useParams, useNavigate} from 'react-router-dom';
import { FileContent,File, Student } from '../types/types';
import axios from 'axios';


function AdminFileContentPage() {
    // const { fileId } = useParams<{ fileId: string }>();
    const [fileContent, setFileContent] = useState<FileContent | null>(null);
    const navigate = useNavigate();

    //burada sayfadaki content in id değiştiğinde değişmemesi lazım çünkü sadece başlangıçta atılan bir istekmiş gibi yazılmış.
  //   useEffect(() => {
  //     // Fetch file content
  //     fetch(`/getFileContent/${fileId}`)
  //         .then(res => res.json())
  //         .then(data => setFileContent(data))
  //         .catch(err => console.log(err));
  // },[]);

  console.log(import.meta.env.VITE_API_URL);
  const file: File = {
    id: 1,
    fileName: 'example.pdf',
    mimeType: 'application/pdf',
    studentId: 1,
    fileData: null
  };

  const student: Student = {
    id: 1,
    username: 'John Doe',
    email: 'john.doe@example.com',
  };

  const fileCon: FileContent = {
    student: student,
    file: file,
    uniName: 'Example University',
    departmentName: 'Example Department',
  };
    useEffect(()=>setFileContent(fileCon), []);

    const handleAction = async (action: 'approve' | 'reject') => {
      if (!fileContent) return;
  
      const isApproved = action === 'approve';
      const studentId = fileContent.student.id;
  
      try {
        const response = await axios.put(`/admin/student/${studentId}`, {
          isApproved: isApproved
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const data = response.data;
        if (data.message) {
          alert(data.message);
          navigate('/displayFiles');
        } else {
          alert('Action failed: ' + (data.errors || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error processing the request:', error);
        alert('An error occurred. Please try again later.');
      }
    };
    
    
     
  return (
    <>
    <NavBar user={{userType: 'admin', id: "1"}} />
    <main className="container">
        <section className="student-info">
          <h1>Student Information</h1>
          {fileContent === null ? <p>Loading...</p> :
          (<>
          <p><strong>Username:</strong> {fileContent.student.username}</p>
          <p><strong>Email:</strong> {fileContent.student.email}</p>
          <p><strong>University:</strong> {fileContent.uniName}</p>
          <p><strong>Department:</strong> {fileContent.departmentName}</p>
          </>)}
        </section>
        <section className="file-info">
        {fileContent === null ? <p>Loading...</p> :
          (<>
          <h2 style={{ wordWrap: 'break-word' }}>File: {fileContent.file.fileName}</h2>
          <div className="file-content">
            {fileContent.file.mimeType === 'application/pdf' && (
              // <embed src={`/serveFile/${fileContent.file.id}`} type={fileContent.file.mimeType} width="100%" height="600px" />
              <embed src={`/no1.pdf`} type={fileContent.file.mimeType} width="100%" height="900px" />
            )}
            {/* {fileContent.file.mimeType === 'text/plain' && (
              <pre>{new TextDecoder().decode(fileContent.file.fileData)}</pre>
            )} */}
            {fileContent.file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
              <iframe src={`/serveFile/${fileContent.file.id}`} width="100%" height="600px"></iframe>
            )}
            
          </div>
          </>)}
        </section>
        <div className="buttons">
          <button className="btn btn-success" onClick={() => handleAction('approve')}>Approve</button>
          <button className="btn btn-danger" onClick={() => handleAction('reject')}>Reject</button>
        </div>
      </main>
    </>
  )
}

export default AdminFileContentPage