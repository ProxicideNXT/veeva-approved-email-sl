import './App.css'
import { VeevaToken } from './components/VeevaToken/VeevaToken'
import { DropdownList } from './components/DropdownList/DropdownList'
import { AddOptionBtn } from './components/AddOptionBtn/AddOptionBtn'
import { CopyTokenBtn } from './components/CopyTokenBtn/CopyTokenBtn'
import { ShareTokenBtn } from './components/ShareTokenBtn/ShareTokenBtn'
import { useSelector } from 'react-redux'
import { isValidDropdownToken } from './util/dropdown'

function App() {
  const { veevaToken } = useSelector((state) => state.dropdown)
  const isValid = isValidDropdownToken(veevaToken)

  return (
    <>
      <header className="bg-[#111] w-full p-[15px] md:px-0 mb-[20px] mb-[40px]">
        <div className="sm:w-full lg:w-5/6 lg:mx-auto">
          <h1 className="text-[#fa9739] text-lg">Dropdown</h1>
        </div>
      </header>

      <main className="sm:w-full lg:w-5/6 lg:mx-auto px-[15px] md:px-0">
        <div className="md:grid md:grid-cols-2">
          <section className="md:col-span-1 mb-[20px] md:mb-[0] md:pr-[10px] md:pr-[10px]">
            <div
              className={`bg-[#0C0C0C] text-[#e54141] h-full p-[15px] ${!isValid ? 'block' : 'hidden'}`}
            >
              <p className="mb-[10px]">
                Syntax Error: <br />
                Invalid dropdown token, expecting the following syntax{' '}
                {'{{customText[]}}'}
              </p>
              <p>
                Refer to the{' '}
                <a
                  className="underline"
                  href="https://crmhelp.veeva.com/doc/Content/CRM_topics/Multichannel/ApprovedEmail/ManageCreateContent/CreatingContent/ConfigTokens.htm#Picklist"
                  target="blank"
                >
                  Veeva website
                </a>{' '}
                for more information about dropdown tokens.
              </p>
            </div>
            <div className={`${isValid ? 'block' : 'hidden'}`}>
              <DropdownList />
            </div>

            <div className="sm:block mt-[20px]">
              <AddOptionBtn />
            </div>
          </section>

          <section className="md:col-span-1 pl-[0px] pr-[0px] md:pl-[10px]">
            <VeevaToken />
          </section>
        </div>

        <div className="md:grid md:grid-cols-2 mt-[20px] md:mt-[45px] md:mb-[20px]">
          <section className="hidden md:block md:col-span-1 mb-[20px] md:mb-[0] pl-[0px] pr-[20px] md:pr-[10px]"></section>

          <section className="md:col-span-1 md:pl-[10px] md:text-right">
            <CopyTokenBtn />
            <ShareTokenBtn />
          </section>
        </div>
      </main>

      <footer className="text-[#888888] row-end-2">
        <div className="sm:w-full lg:w-5/6 lg:mx-auto">
          <a
            className="text-[#008fd2] underline"
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
