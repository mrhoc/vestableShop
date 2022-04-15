import HomePage from './Home/Home';
import ContactPage from './Contact/Contact';
import NewsPage from './News/News';
import style from './scss/styles.scss'
import { Routes, Route, Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
function App() {
  return (
    <div className="App">
      {/* header */}
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-success">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/news'>News</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/contact'>Contact</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className='btn' style={{ width: '100px' }}>Login</button>
              <button className='btn ml-3' style={{ width: '100px' }}>Register</button>
            </form>
          </div>
        </nav>
      </header>

      {/* content */}
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/news' element={<NewsPage />}></Route>
      </Routes>
      {/* footer */}
      <footer className='pt-3 pb-3 bg-success text-center'>
        
        <ul className='list-sns d-flex justify-content-center'>
          <li><a href=''><FaFacebookF></FaFacebookF></a></li>
          <li><a href=''><FaInstagram></FaInstagram></a></li>
          <li><a href=''><FaTwitter></FaTwitter></a></li>
        </ul>
        <p>coppyRight by TVH @2022</p>

      </footer>
    </div>
  );
}

export default App;
