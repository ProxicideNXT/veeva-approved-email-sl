import './App.css'
import { SubjectLineForm } from './components/SubjectLineForm'
import { SubjectLineList } from './components/SubjectLineList'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="grid grid-cols-2 h-dvh">
        <section className="bg-slate-300 p-[20px]">
          <SubjectLineList></SubjectLineList>
        </section>

        <section className="">
          <SubjectLineForm></SubjectLineForm>
        </section>
      </div>
    </div>
  )
}

export default App
