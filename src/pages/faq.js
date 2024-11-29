import '../App.css'

export const PageFAQ = () => {
  return (
    <main className="sm:w-full lg:w-5/6 lg:mx-auto px-[15px] md:px-0 pb-[70px]">
      <h2 className="text-[#fa9739] text-[1.35rem] font-[Barlow] mb-[10px]">
        Frequently Asked Questions
      </h2>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        What is the purpose of this site?
      </h3>
      <section className="text-[#CCC]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quia aut
        quidem distinctio sit, adipisci voluptas repellendus inventore veritatis
        cupiditate. Adipisci quidem incidunt recusandae, inventore iste
        voluptate aut quaerat impedit?
      </section>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        Is there a limit on how many dropdown options I can have?
      </h3>
      <section className="text-[#CCC]">
        <p className="mb-[10px]">
          <strong className="text-[#E63946]">
            No limit. Except for subject lines
          </strong>
          . Veeva has a 1500 character limit for subject lines.
        </p>
      </section>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        Is there a limit on how big a dropdown option can be?
      </h3>
      <section className="text-[#CCC]">
        <p className="mb-[10px]">
          <strong className="text-[#E63946]">No</strong>. But ideally you should
          try to keep it try short to make it easy on the sales reps.
        </p>
      </section>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        Can I have two paragraphs in one dropdown option?
      </h3>
      <section className="text-[#CCC]">
        <p className="mb-[10px]">
          <strong className="text-[#E63946]">No</strong>. Veeva does not allow
          such capablity. Instead you may need to include two seperate dropdowns
          as an alternative.
        </p>
      </section>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        How do I enter dynamic text? Like the HCP's name?
      </h3>
      <section className="text-[#CCC]">
        <p className="mb-[10px]">
          Using Veeva's tokens, replace the double {"'{}'"} brackets with double{' '}
          {"'##'"}. Refer to the example below:
        </p>
        <code className="block border-solid border-2 border-[#AAA] my-[15px] p-[15px]">
          Hi ##accTitle## ##accFname###
        </code>
        <p className="mb-[10px]">
          <strong className="text-[#E63946]">Important Note</strong>: Reminder
          that all tokens are <strong>case sensitive</strong>!
        </p>
        <p className="mb-[10px]">
          For a full list of tokens, refer to the{' '}
          <a
            href="https://crmhelp.veeva.com/doc/Content/CRM_topics/Multichannel/ApprovedEmail/ManageCreateContent/CreatingContent/ConfigTokens.htm"
            className="text-[#39B2FA] underline"
          >
            Veeva Approved Email Configuration Tokens webpage
          </a>
          .
        </p>
      </section>

      <h3 className="text-white text-[1.15rem] font-[Barlow] mt-[25px] mb-[5px]">
        Why can't I use HTML tags in dropdowns?
      </h3>
      <section className="text-[#CCC]">
        <p className="mb-[10px]">
          <strong className="text-[#E63946]">
            Because Veeva doesn't allow it
          </strong>
          . Therefore you avoid putting any HTML tags in any dropdown option.
        </p>
        <p className="mb-[10px]">
          Source:{' '}
          <a
            href="https://crmhelp.veeva.com/doc/Content/CRM_topics/Multichannel/ApprovedEmail/ManageCreateContent/CreatingContent/ConfigTokens.htm#PicklistTokens"
            className="text-[#39B2FA] underline"
          >
            Approved Email Configuration Tokens - Picklist Tokens section
          </a>
          .
        </p>
      </section>
    </main>
  )
}
