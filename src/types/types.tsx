export interface University {
    uni_id: number;
    uni_name: string;
    il_id: number;
    status: number;
  }

  export interface Question {
    question_id: number;
    question_text: string;
    created_at: Date;
    Answers: number;
  }

  export interface Answer {
    answer_id: number;
    answer_text: string;
    created_at: Date;
    likes: number;
    dislikes: number;
    Student: {
      id: number;
      username: string;
      profilePicture?: string;
    };
  }

  export interface User {
    userType: 'student' | 'admin';
    uni_id: number;
    profilePicture?: string;
    username: string;
  }

  export interface Student {
    id: number;
    username: string;
    email: string;
  }

  export interface StudentFile {
    fileName: string;
    Student: Student;
  }

  export interface File {
    id: number;
    fileName: string;
    mimeType: string;
    studentId: number;
    fileData: Uint8Array|null;
  }

  export interface FileContent {
    student: Student;
    file: File;
    uniName: string;
    departmentName: string;
  }

  export interface StudentProfile {
    id: number;
    username: string;
    email: string;
    profilePicture?: string;
    University: University;
    Department: string;
  }