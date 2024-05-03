import './App.css'
import { SubjectLineForm } from './components/SubjectLineForm'
import { SubjectLineList } from './components/SubjectLineList'

function App() {
  return (
    <div className="App relative">
      <header className="App-header"></header>

      <div className="grid grid-cols-2 h-dvh">
        <section className="col-span-1 bg-[#1e1e1e] p-[20px]">
          <SubjectLineList></SubjectLineList>
        </section>

        <section className="col-span-1 fixed right-0 top-0 w-3/6 h-screen">
          <SubjectLineForm></SubjectLineForm>
        </section>
      </div>
    </div>
  )
}

export default App
