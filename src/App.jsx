import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import AddDailyTodo from './pages/AddDailyTodo'
import { useLocalStorage } from 'usehooks-ts' //put back import useLocalStorage from 'use-local-storage' 
import { DailyContext } from './contexts/DailyContext'
import EditDailyTodo from './pages/EditDailyTodo'
import Login from './pages/Login'
import { AuthContext } from './contexts/authContext'
import sadness from './assets/sadness.webp'
import Home from './pages/Home'
import './App.css'
// put back if issue:import { useState } from 'react'
import RequireAuth from './components/RequireAuth'



function Layout() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Image src={sadness} style={{ width: '50px', height: '50px' }} />
          <Navbar.Brand href='/'>Daily Todo Task List</Navbar.Brand>
          <Nav>
            <Nav.Link href='/add'>Add Daily Task</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {
  const [daily, setDaily] = useLocalStorage('daily-key', [])//put back  const [daily, setDaily] = useLocalStorage('daily', []) when it is fixed / 2. add this code back if latest fail: const [daily, setDaily] = useState([])//put back  const [daily, setDaily] = useLocalStorage('daily', []) when it is fixed / 2. add this code back if latest fail: const [daily, setDaily] = useState([])
  const [token, setToken] = useLocalStorage('token-key', 0) //put back if code fail: const [token, setToken] = useState(null) 
  return (
    <DailyContext.Provider value={{ daily, setDaily }}> {/* //put back <DailyContext.Provider value={{ daily, setDaily }}></DailyContext.Provider>*/}
      <AuthContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}> {/*/ edit this code in later if issue not resolve<Route path='/' element={<Layout />}>/*/}

              {/* //Have login over here outside of route. before that create RequireAuth.jsx and a Login.jsx*/}
              <Route path='/login' element={<Login />} />

              <Route index path='/' element={<Home />} />
              <Route path='/add' element={
                <RequireAuth>
                  <AddDailyTodo />
                </RequireAuth>} />
              <Route path='*' element={<ErrorPage />} />
              <Route path="daily/:id" element={<EditDailyTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </DailyContext.Provider>
  )
}



