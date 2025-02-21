import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../assets/styles/displayFiles.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentFiles } from '../redux/studentFilesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { StudentFile } from '../types/types';
import NavBar from '../components/NavBar';

function AdminShowFilesPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchStudentFiles());
    }, []);

    // const studentFiles:StudentFile[] = useSelector((state: RootState) => state.studentFiles.studentFiles);

    const studentFiles:StudentFile[] = [
        {
            fileName: "file1",
            Student: {
                id: 1,
                username: "student1",
                email: ""
            }
        },
        {
            fileName: "file2",
            Student: {
                id: 2,
                username: "student2",
                email: ""
            }
        },
        {
            fileName: "file3",
            Student: {
                id: 3,
                username: "student3",
                email: ""
            }
        }]

      



  return (
    <>
    <NavBar user={{userType: 'admin', id: "1"}} />
    <main className="main">
      <div className="main__content">
        <h1 className="main__title">Admin Panel</h1>
        <table className="admin__table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploaded By</th>
            </tr>
          </thead>
          <tbody id="adminTableBody">
            {studentFiles.map((file) => (
              <tr key={file.fileName} onClick={() => navigate(`/file/${file.Student.id}`)}>
                <td>
                  {file.fileName}
                </td>
                <td>{file.Student.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </main>
        </>
  )
}

export default AdminShowFilesPage