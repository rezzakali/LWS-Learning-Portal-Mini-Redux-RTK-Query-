import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentNav from './components/_student/StudentNav';
import Login from './pages/Login';
import CoursePlayer from './pages/student/CoursePlayer';
import LeaderBoard from './pages/student/LeaderBoard';
import Quizzes from './pages/student/Quizzes';
import Register from './pages/student/Register';

// for admin
import { useSelector } from 'react-redux';
import AdminNav from './components/_admin/AdminNav';
import useAuthCheck from './hooks/useAuthCheck';
import AddAssignment from './pages/admin/AddAssignment';
import AddQuiz from './pages/admin/AddQuiz';
import AddVideo from './pages/admin/AddVideo';
import AdminLogin from './pages/admin/AdminLogin';
import Assignment from './pages/admin/Assignment';
import AssignmentMark from './pages/admin/AssignmentMark';
import Dashboard from './pages/admin/Dashboard';
import QuizzesAdmin from './pages/admin/Quizzes';
import Videos from './pages/admin/Videos';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const authCheck = useAuthCheck();
  const auth = useSelector((state) => state?.auth?.user);

  return (
    <>
      {auth?.role === 'student' ? <StudentNav /> : ''}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/courseplayer"
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path={`courseplayer/video/:id`}
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />
      </Routes>

      <>
        {auth?.role === 'admin' ? <AdminNav /> : ''}

        {auth?.role === 'admin' ? (
          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/assignment" element={<Assignment />} />
            <Route path="/admin/assignmentmark" element={<AssignmentMark />} />
            <Route path="/admin/quizzes" element={<QuizzesAdmin />} />
            <Route path="/admin/videos" element={<Videos />} />
            <Route path="/admin/addvideo" element={<AddVideo />} />
            <Route path={`/admin/editvideo/:id`} element={<AddVideo />} />
            <Route path="/admin/add_assignment" element={<AddAssignment />} />
            <Route
              path={`/admin/edit_assignment/:id`}
              element={<AddAssignment />}
            />
            <Route path="/admin/addquiz" element={<AddQuiz />} />
            <Route path={`/admin/addquiz/:id`} element={<AddQuiz />} />
          </Routes>
        ) : (
          ''
        )}
      </>
    </>
  );
}

export default App;
