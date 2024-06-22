import './App.css'
import { Header } from './components/Header'
import { DropdownForm } from './components/DropdownForm'
import { DropdownList } from './components/DropdownList'

function App() {
  return (
    <div className="relative bg-[#1e1e1e]">
      <Header />

      <div className="grid mt-[50px] md:grid-cols-2 h-screen">
        <section className="col-span-1 bg-[#1e1e1e] p-[20px]">
          <DropdownList></DropdownList>
        </section>

        <section className="col-span-1">
          <DropdownForm></DropdownForm>
        </section>
      </div>
    </div>
  )
}

export default App
