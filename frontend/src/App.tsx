import './App.css'
import AuthProvider, {useAuth} from "./util/context/AuthContext.tsx";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
  BrowserRouter
} from 'react-router-dom';

function ProtectedRoute( {children}) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  // const navigate = useNavigate();
  if(loading){
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{
            width: '32px', height: '32px',
            border: '3px solid #d8d8d8',
            borderTopColor: '#5a9e1f',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
        </div>
    )
  }

  if(!isAuthenticated){
    return (
      <Navigate
        to="/login"
        replace
        state={{from: location}}
      />
    )
    // navigate("/login", { replace: true, state: {from: location}})
  }
  return children;
}
function Placeholder({ title }) {
  const { isAuthenticated, user, logout } = useAuth()
  return (
      <div style={{ padding: '48px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', marginBottom: '12px', color: '#1a1a1a' }}>
          {title}
        </h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>This page is coming soon.</p>
        {isAuthenticated && (
            <div style={{ background: '#eaf3de', border: '1px solid #c0dea0', borderRadius: '8px', padding: '14px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#3d6e13', fontSize: '0.9rem', marginBottom: '8px' }}>
                Logged in as <strong>{user ? user.username : "NULL"}</strong>
              </p>
              <button
                  onClick={logout}
                  style={{ background: 'none', border: '1px solid #3d6e13', borderRadius: '4px', color: '#3d6e13', padding: '4px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Log out
              </button>
            </div>
        )}
        <a href="/" style={{ color: '#3d6e13', fontWeight: 600 }}>← Back to home</a>
        <ol>
          <li><NavLink to="/">Landing Page</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
          <li><NavLink to="/home">Home</NavLink></li>
          <li><NavLink to="/projects/1">Project Display</NavLink></li>
          <li><NavLink to="/projects/create">Create Project</NavLink></li>
          <li><NavLink to="/projects/update/1">Edit Project</NavLink></li>
          <li><NavLink to="/update/create">Create Update</NavLink></li>
          <li><NavLink to="/update/1">Update Display</NavLink></li>
        </ol>

        <div style={{color: "red"}}>
          {/*<Button children={"Testing"}/>*/}
        </div>
      </div>
  )
}
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
  // const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
