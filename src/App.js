import { Route, Routes } from 'react-router-dom'

import { PageHome } from './pages/home'
import { PageFAQ } from './pages/faq'

function App() {
  return (
    <>
      <header className="bg-[#111] w-full p-[15px] md:px-0 mb-[20px] mb-[px] text-white">
        <div className="sm:w-full lg:w-5/6 lg:mx-auto">
          <h1 className="text-[#fa9739] text-[1.55rem] font-[Barlow]">
            Dropdown
          </h1>
          A{' '}
          <span className="text-[#fa9739]">
            Veeva Rep-Triggered Email (RTE)
          </span>{' '}
          Dropdown Validator
        </div>
      </header>

      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/faq" element={<PageFAQ />} />
      </Routes>

      <footer className="bg-[#111] fixed bottom-0 left-0 w-full text-[#888888] px-[15px] sm:px-0 py-[15px]">
        <div className="sm:w-full lg:w-5/6 lg:mx-auto">
          <a
            className="text-[#39B2FA] underline"
            href="https://github.com/Pr0xicide/veeva-approved-email-dropdown-validater"
          >
            View source code on GitHub
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
