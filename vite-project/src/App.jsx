import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentNav from './components/_student/StudentNav';
import Login from './pages/Login';
import CoursePlayer from './pages/student/CoursePlayer';
import LeaderBoard from './pages/student/LeaderBoard';
import Quizzes from './pages/student/Quizzes';
import Register from './pages/student/Register';

// for admin
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
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import AdminPublicRoute from './utils/AdminPublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App({ hideLoader }) {
  useEffect(() => {
    hideLoader();
  }, []);

  const authCheck = useAuthCheck();
  const auth = localStorage?.getItem('auth');
  const authData = JSON.parse(auth);

  return (
    <>
      {authData?.user?.role === 'student' && <StudentNav />}

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
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
        {authData?.user?.role === 'admin' && <AdminNav />}

        <Routes>
          <Route
            path="/admin"
            element={
              <AdminPublicRoute>
                <AdminLogin />
              </AdminPublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <Dashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/assignment"
            element={
              <AdminPrivateRoute>
                <Assignment />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/assignmentmark"
            element={
              <AdminPrivateRoute>
                <AssignmentMark />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/quizzes"
            element={
              <AdminPrivateRoute>
                <QuizzesAdmin />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/videos"
            element={
              <AdminPrivateRoute>
                <Videos />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/addvideo"
            element={
              <AdminPrivateRoute>
                <AddVideo />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={`/admin/editvideo/:id`}
            element={
              <AdminPrivateRoute>
                <AddVideo />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/add_assignment"
            element={
              <AdminPrivateRoute>
                <AddAssignment />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={`/admin/edit_assignment/:id`}
            element={
              <AdminPrivateRoute>
                <AddAssignment />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/addquiz"
            element={
              <AdminPrivateRoute>
                <AddQuiz />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={`/admin/addquiz/:id`}
            element={
              <AdminPrivateRoute>
                <AddQuiz />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </>
    </>
  );
}

export default App;
