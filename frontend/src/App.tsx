import './App.css'
import AuthProvider from "./util/context/AuthContext.tsx";
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import {
  Placeholder
} from './pages';

import {
  ProtectedRoute
} from './util/services';

import {
  ErrorHandler,
  ErrorBoundary,
  ErrorPage
} from "./util/errors";

function AppRoutes(){
  return(
      <>
        <main>
          <Routes>
            {/*unprotected Routes: login & register*/}
            <Route path="/" element={
              <Placeholder title={"Landing Page"} />
            } />
            <Route path="/login" element={
              <Placeholder title={"Login"}/>
            }/>
            <Route path="/register" element={
              <Placeholder title={"Register"}/>
            }/>

            {/*protected Routes*/}
            <Route path="/home" element={
              <Placeholder title={"HOME"}/>
            }/>
            <Route path="/projects/:projectId" element={
              <Placeholder title={"Project Display"}/>
            }/>
            <Route path="/projects/create" element={
              <Placeholder title={"Project Create"}/>
            }/>
            <Route path="/projects/update/:projectId" element={
              <Placeholder title={"Editing Project Info"}/>
            }/>
            <Route path="/update/create" element={
              <Placeholder title={"Create an Update"}/>
            }/>
            <Route path="/update/:updateId" element={
              <Placeholder title={"Update Display"}/>
            }/>
          </Routes>
        </main>
      </>
  )
}


function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorPage}>
          <ErrorHandler>
              <AuthProvider>
                <AppRoutes/>
              </AuthProvider>
          </ErrorHandler>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
