import '../App.css'
import { useSelector } from 'react-redux'

import { isValidDropdownToken } from '../util/dropdown'
import { VeevaToken } from '../components/VeevaToken/VeevaToken'
import { DropdownList } from '../components/DropdownList/DropdownList'
import { AddOptionBtn } from '../components/AddOptionBtn/AddOptionBtn'
import { CopyTokenBtn } from '../components/CopyTokenBtn/CopyTokenBtn'
import { ShareTokenBtn } from '../components/ShareTokenBtn/ShareTokenBtn'

export const PageHome = () => {
  const { veevaToken } = useSelector((state) => state.dropdown)
  const isValid = isValidDropdownToken(veevaToken)

  return (
    <main className="sm:w-full lg:w-5/6 lg:mx-auto px-[15px] md:px-0 pb-[70px]">
      <div className="md:grid md:grid-cols-2 md:grid-rows-1">
        <section className="md:col-span-1 mb-[20px] md:mb-[0] md:pr-[10px] md:pr-[10px]">
          <div
            className={`text-[#CCC] h-full ${!isValid ? 'block' : 'hidden'}`}
          >
            <h2 className="text-[#E63946] text-[1.25rem] font-[Barlow] mb-[10px]">
              Veeva Token Syntax Error
            </h2>
            <p className="mb-[10px]">
              Invalid Veeva dropdown token syntax defined, expecting the
              following syntax:
              <code className="block bg-[#0C0C0C] p-[15px] mt-[5px]">
                {'{{customText[option 1|option 2]}}'}
              </code>
            </p>
            <p>
              Refer to the{' '}
              <a
                className="underline text-[#39B2FA]"
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
          <div className="text-right">
            <CopyTokenBtn />
            <ShareTokenBtn />
          </div>
        </section>
      </div>
    </main>
  )
}
