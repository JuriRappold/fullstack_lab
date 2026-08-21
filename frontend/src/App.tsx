import './App.css'
import AuthProvider from "./util/context/AuthContext.tsx";
import {
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import {
    CreateProject,
    CreateUpdate,
    Placeholder
} from './pages';


import {
  ErrorHandler,
  ErrorBoundary,
  ErrorPage
} from "./util/errors";
import {
    User,
    PageWrapper,
    DisplayProject,
    DisplayUpdate,
    LogIn,
    Register,
    Home
} from "./pages";

function AppRoutes(){
  return(
      <>
          <Routes>
            {/*unprotected Routes: login & register*/}
            <Route path="/" element={
                <LogIn />
            } />
            <Route path="/register" element={
                <Register />
            }/>

            {/*protected Routes*/}
            <Route path="/home" element={
                <PageWrapper children={<Home/>}/>
            }/>
            <Route path="/projects/:projectId" element={
                <PageWrapper children={<DisplayProject />} />
            }/>
            <Route path="/projects/create" element={
              <PageWrapper children={<CreateProject/>} />
            }/>
            <Route path="/projects/update/:projectId" element={
              <Placeholder title={"Editing Project Info"}/>
            }/>
            <Route path="/update/create" element={
              <PageWrapper children={<CreateUpdate/>}/>
            }/>
            <Route path="/update/:updateId" element={
              <PageWrapper children={<DisplayUpdate/>}/>
            }/>
            <Route path={"/user/:userId"} element={
              <PageWrapper children={ <User />} />
            }/>
          </Routes>
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
