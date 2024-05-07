import './App.css'
import { SubjectLineForm } from './components/SubjectLineForm'
import { SubjectLineList } from './components/SubjectLineList'

function App() {
  return (
    <div className="App relative bg-[#1e1e1e]">
      <header className="App-header"></header>

      <div className="grid md:grid-cols-2 h-screen">
        <section className="col-span-1 bg-[#1e1e1e] p-[20px]">
          <SubjectLineList></SubjectLineList>
        </section>

        <section className="col-span-1 md:fixed md:right-0 md:top-0 md:w-3/6 md:h-screen">
          <SubjectLineForm></SubjectLineForm>
        </section>
      </div>
    </div>
  )
}

export default App
