import Router from './templates/Router'
import './assets/reset.css'
import './assets/style.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const App = () => {
  return(
    <>
      <Header />
      <main className='c-main' >
        <Router />
      </main>
      <Footer />
    </>
  )
}
export default App