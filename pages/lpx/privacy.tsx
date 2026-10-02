import Head from 'next/head'

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export default function LpxPrivacyPolicy() {
  return (
    <>
      <Head>
        <title>LPX Privacy Policy | 17 Little Portland Street</title>

        <meta
          name="description"
          content="Privacy policy for the LPX and LPX Staff mobile apps."
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <link
          rel="canonical"
          href="https://www.little-portland.com/lpx/privacy"
        />
      </Head>

      <main className="page">
        <header className="appHeader">
          <div className="headerInner">
            <a
              href="https://little-portland.com"
              className="brandLink"
              aria-label="17 Little Portland Street home"
            >
              <img
                src="/images/lpx-club-header.png"
                alt="LPX"
                className="logo"
              />

              <div className="headerMeta">
                17 LITTLE PORTLAND STREET
              </div>
            </a>
          </div>
        </header>

        <article className="policyCard">
          <div className="intro">
            <p className="eyebrow">LPX / LEGAL</p>

            <h1>PRIVACY POLICY</h1>

            <p className="updated">
              Last updated: 23 September 2026
            </p>
          </div>

          <PolicySection
            number="01"
            title="WHO WE ARE AND WHAT THIS COVERS"
          >
            <p>
              This policy explains how Tassen Limited handles personal data in
              our mobile apps. It sits alongside our{' '}
              <a
                href="https://tassen.xyz/privacy"
                target="_blank"
                rel="noreferrer"
              >
                website privacy policy
              </a>
              , which continues to cover tassen.xyz.
            </p>

            <p>It covers two apps:</p>

            <ul>
              <li>
                LPX, the Friends of the Club (FOC) app, used by guests to manage
                their FOC status, invitations and entry
              </li>

              <li>
                LPX Staff, used by venue staff to manage admission at the door
              </li>
            </ul>

            <p>
              Tassen Limited is the data controller. We are registered in
              England and Wales, company number 11223106, at 16–17 Little
              Portland Street, London.
            </p>

            <p>
              If you have questions about this policy or how we handle your
              data, contact us at{' '}
              <a href="mailto:dataprotection@tassen.xyz">
                dataprotection@tassen.xyz
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection
            number="02"
            title="WHAT WE COLLECT, AND WHY"
          >
            <div className="tableWrap threeColTable">
              <table>
                <thead>
                  <tr>
                    <th>WHAT</th>
                    <th>WHY WE NEED IT</th>
                    <th>LAWFUL BASIS</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Name, email, phone number</td>
                    <td>
                      To create and manage your FOC account and contact you
                    </td>
                    <td>Contract</td>
                  </tr>

                  <tr>
                    <td>Date of birth</td>
                    <td>
                      To confirm you are over 21, as our venues are 21+
                    </td>
                    <td>Legal obligation</td>
                  </tr>

                  <tr>
                    <td>Home and contact address</td>
                    <td>Part of the FOC application</td>
                    <td>Contract</td>
                  </tr>

                  <tr>
                    <td>Profile photo</td>
                    <td>To identify you at the door</td>
                    <td>Contract</td>
                  </tr>

                  <tr>
                    <td>Identity document</td>
                    <td>To verify you are who you say you are</td>
                    <td>Contract</td>
                  </tr>

                  <tr>
                    <td>Instagram handle</td>
                    <td>Optional, part of your application</td>
                    <td>Consent</td>
                  </tr>

                  <tr>
                    <td>Contacts you choose to invite</td>
                    <td>To send an invitation on your behalf</td>
                    <td>Consent</td>
                  </tr>

                  <tr>
                    <td>Entry and visit records</td>
                    <td>
                      To manage admission, FOC status and our own reporting
                    </td>
                    <td>Legitimate interests</td>
                  </tr>

                  <tr>
                    <td>Annual Contribution and payment status</td>
                    <td>To manage your Annual Contribution</td>
                    <td>Contract</td>
                  </tr>

                  <tr>
                    <td>Device and diagnostic data</td>
                    <td>To keep the app working and fix faults</td>
                    <td>Legitimate interests</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              We do not use your data for advertising, we do not track you
              across other companies’ apps or websites, and we do not sell your
              personal data.
            </p>
          </PolicySection>

          <PolicySection
            number="03"
            title="IDENTITY DOCUMENTS, PHOTOS AND CONTACTS"
          >
            <p>Three things deserve saying plainly.</p>

            <h3>Your identity document.</h3>

            <p>
              During your application we ask you to provide an identity
              document so we can confirm your identity and your age. Only
              authorised staff can view it, we use it for no other purpose, and
              we delete it once your application has been rejected or when you
              stop being an FOC. We do not share it with anyone outside Tassen
              Limited except where the law requires it.
            </p>

            <h3>Your profile photo.</h3>

            <p>
              Your photo is shown to door staff so they can confirm the person
              arriving is the FOC who was admitted. It is not used for facial
              recognition, it is not matched automatically against anything,
              and it is not shared outside the venue.
            </p>

            <h3>Your contacts.</h3>

            <p>
              If you choose to invite someone, the app can show your phone’s
              contacts so you can pick a person rather than typing their
              details. This happens on your device. We do not upload your
              address book, we do not store it, and we do not keep a record of
              anyone you did not actually invite. You can decline access to
              your contacts and still send invitations by entering a name and
              number yourself.
            </p>

            <p>
              When you invite someone, we do hold their name and contact details
              so we can send the invitation and admit them — and we tell them,
              when we contact them, who invited them and how to ask us to remove
              their details.
            </p>
          </PolicySection>

          <PolicySection
            number="04"
            title="ENTRY RECORDS, AND WHO WE SHARE DATA WITH"
          >
            <p>
              When you are admitted to a venue we record that you attended,
              when you arrived and left, which event it was, who invited you if
              anyone, and what you paid. We use this to run admission, to work
              out your FOC standing, and for our own business reporting.
            </p>

            <p>
              These records are not shared with other FOCs. Other FOCs can see
              only that you attended an event where that is part of a guest
              list they are on.
            </p>

            <p>We share personal data with:</p>

            <ul>
              <li>
                Our hosting and IT providers, who store the data on our behalf
              </li>

              <li>
                Our messaging provider, who sends invitation and verification
                texts and emails
              </li>

              <li>
                Our payment provider, who processes Annual Contribution
                payments — we never see your full card details
              </li>

              <li>
                Professional advisers, and authorities where the law requires
                it
              </li>
            </ul>

            <p>
              We do not sell your personal data, and we do not share it with
              advertisers.
            </p>

            <p>
              Our providers may process data outside the UK. Where they do, we
              rely on the safeguards described in the{' '}
              <a
                href="https://tassen.xyz/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Tassen website privacy policy
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection
            number="05"
            title="HOW LONG WE KEEP IT, AND DELETING YOUR ACCOUNT"
          >
            <div className="tableWrap twoColTable">
              <table>
                <thead>
                  <tr>
                    <th>DATA</th>
                    <th>KEPT FOR</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Identity documents</td>
                    <td>
                      Until your application is rejected, or until you stop
                      being an FOC
                    </td>
                  </tr>

                  <tr>
                    <td>Your FOC record and profile</td>
                    <td>
                      While you are an FOC, and 2 years afterwards
                    </td>
                  </tr>

                  <tr>
                    <td>Entry and visit records</td>
                    <td>
                      Kept indefinitely. Your personal details are removed when
                      you delete your account, and the remaining records cannot
                      identify you
                    </td>
                  </tr>

                  <tr>
                    <td>Annual Contribution and payment records</td>
                    <td>
                      6 years, as required for tax and accounting
                    </td>
                  </tr>

                  <tr>
                    <td>Messages you send us</td>
                    <td>
                      As long as needed to deal with your enquiry
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              You can delete your account at any time from the app, under your
              profile settings. You do not need to ask us, and you do not need
              a reason.
            </p>

            <p>
              When you delete your account we remove your personal details —
              your name, email address, phone number, date of birth, profile
              photo, addresses and any identity document we still hold. Your
              account can no longer be used and you will not appear anywhere in
              the app or to our staff.
            </p>

            <p>
              We keep a record that a visit happened, with your personal
              details removed, because we need accurate attendance and revenue
              figures for our own accounting. These anonymised records cannot be
              used to identify you and cannot be linked back to you.
            </p>

            <p>
              If you would prefer your records removed entirely rather than
              anonymised, contact us at{' '}
              <a href="mailto:dataprotection@tassen.xyz">
                dataprotection@tassen.xyz
              </a>{' '}
              and we will consider your request under your right to erasure.
            </p>
          </PolicySection>

          <PolicySection
            number="06"
            title="YOUR RIGHTS, AGE, SECURITY AND CHANGES"
          >
            <p>
              You have the right to ask us for a copy of your data, to correct
              it, to delete it, to restrict or object to how we use it, to
              receive it in a portable form, and to withdraw consent where we
              rely on it. Withdrawing consent does not affect anything we did
              before you withdrew it.
            </p>

            <p>
              To exercise any of these, contact us at{' '}
              <a href="mailto:dataprotection@tassen.xyz">
                dataprotection@tassen.xyz
              </a>
              . We will respond within one month. If you are unhappy with how
              we have handled your data you can complain to the Information
              Commissioner’s Office at{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noreferrer"
              >
                ico.org.uk
              </a>
              .
            </p>

            <h3>Age.</h3>

            <p>
              Our venues are for adults, and the app is not for anyone under
              21. We ask for your date of birth during your application and do
              not knowingly hold data about children. If you believe we hold a
              child’s data, tell us and we will delete it.
            </p>

            <h3>Security.</h3>

            <p>
              We protect your data with encryption in transit, access controls
              limiting who can see identity documents and photographs, and the
              other measures described in the{' '}
              <a
                href="https://tassen.xyz/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Tassen website privacy policy
              </a>
              .
            </p>

            <h3>Automated decisions.</h3>

            <p>
              We do not make decisions about your FOC status by automated means
              alone. Applications are decided by people.
            </p>

            <h3>Changes.</h3>

            <p>
              If we change this policy we will update this page and, where the
              change is significant, tell you in the app.
            </p>
          </PolicySection>
        </article>
      </main>

      <style jsx>{`
        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          background: #020efb;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        :global(body) {
          font-family: ${FONT_STACK};
        }

        /*
         * Override the site's global green vertical scrollbar
         * with a neutral scrollbar for this page.
         */
        :global(html) {
          scrollbar-width: auto !important;
          scrollbar-color: #b8bdc5 #eef0f2 !important;
        }

        :global(html::-webkit-scrollbar) {
          width: 10px !important;
        }

        :global(html::-webkit-scrollbar-track) {
          background: #eef0f2 !important;
        }

        :global(html::-webkit-scrollbar-thumb) {
          background: #b8bdc5 !important;
          border: 2px solid #eef0f2 !important;
          border-radius: 999px !important;
        }

        :global(body) {
          scrollbar-width: auto !important;
          scrollbar-color: #b8bdc5 #eef0f2 !important;
        }

        :global(body::-webkit-scrollbar) {
          width: 10px !important;
        }

        :global(body::-webkit-scrollbar-track) {
          background: #eef0f2 !important;
        }

        :global(body::-webkit-scrollbar-thumb) {
          background: #b8bdc5 !important;
          border: 2px solid #eef0f2 !important;
          border-radius: 999px !important;
        }

        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          padding-bottom: 48px;
          background: #020efb;
        }

        .appHeader {
          background: #020efb;
        }

        .headerInner {
          width: min(calc(100% - 48px), 960px);
          margin: 0 auto;
          padding: 48px 48px 28px;
        }

        .brandLink {
          display: inline-block;
          color: inherit;
          text-decoration: none;
        }

        .brandLink:hover {
          opacity: 0.9;
        }

        .brandLink:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 6px;
          border-radius: 2px;
        }

        .logo {
          display: block;
          width: 190px;
          max-width: 100%;
          height: auto;
          margin-bottom: 18px;
        }

        .headerMeta {
          color: #ffffff;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.22em;
          line-height: 1.4;
          white-space: nowrap;
        }

        .policyCard {
          width: min(calc(100% - 48px), 960px);
          margin: 0 auto;
          padding: 48px;
          background: #ffffff;
          border-radius: 24px;
          color: #111827;
        }

        .intro {
          padding-bottom: 42px;
        }

        .eyebrow {
          margin: 0 0 17px;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        h1 {
          margin: 0 0 24px;
          color: #020efb;
          font-size: clamp(48px, 7vw, 82px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.055em;
        }

        .updated {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
          line-height: 1.5;
        }

        /*
         * Horizontal scrolling behaviour only.
         */
        .tableWrap {
          width: 100%;
          margin: 24px 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 700px) {
          .page {
            padding-bottom: 24px;
          }

          .headerInner,
          .policyCard {
            width: calc(100% - 32px);
          }

          .headerInner {
            padding: 32px 24px 20px;
          }

          .logo {
            width: 153px;
            margin-bottom: 14px;
          }

          .headerMeta {
            font-size: 9px;
            letter-spacing: 0.15em;
          }

          .policyCard {
            padding: 24px;
            border-radius: 18px;
          }

          .intro {
            padding-bottom: 32px;
          }

          h1 {
            font-size: clamp(38px, 12vw, 48px);
            line-height: 0.95;
          }
        }

        @media (max-width: 430px) {
          .headerMeta {
            font-size: 8px;
            letter-spacing: 0.11em;
          }
        }
      `}</style>

      <style jsx global>{`
        .policy-section {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr);
          gap: 24px;
          padding: 42px 0;
          border-top: 1px solid #e5e7eb;
        }

        .policy-number {
          color: #020efb;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .policy-content {
          min-width: 0;
        }

        .policy-content h2 {
          margin: 0 0 24px;
          color: #111827;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.035em;
        }

        .policy-content h3 {
          margin: 30px 0 10px;
          color: #111827;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.4;
        }

        .policy-content p {
          margin: 0 0 17px;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.65;
        }

        .policy-content p:last-child {
          margin-bottom: 0;
        }

        .policy-content ul {
          display: block;
          margin: 0 0 20px;
          padding: 0 0 0 26px;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.65;
          list-style-type: disc !important;
          list-style-position: outside !important;
        }

        .policy-content ul li {
          display: list-item !important;
          margin: 0 0 8px;
          padding-left: 4px;
          list-style-type: disc !important;
        }

        .policy-content ul li::marker {
          color: #020efb;
          font-size: 1em;
        }

        .policy-content a {
          color: #020efb;
          font-weight: 700;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        .policy-content table,
        .policy-content thead,
        .policy-content tbody,
        .policy-content tr,
        .policy-content th,
        .policy-content td {
          -webkit-text-size-adjust: 100% !important;
          text-size-adjust: 100% !important;
        }

        .policy-content table {
          width: 100%;
          min-width: 680px;
          border-collapse: collapse;
          table-layout: fixed;
          color: #374151;
          font-family: ${FONT_STACK};
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
        }

        .policy-content th {
          padding: 12px 14px;
          border: 1px solid #d1d5db;
          background: #020efb;
          color: #ffffff;
          font-family: ${FONT_STACK};
          font-size: 11px;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: 0.08em;
          text-align: left;
          vertical-align: top;
        }

        .policy-content td {
          padding: 14px;
          border: 1px solid #d1d5db;
          color: #374151;
          font-family: ${FONT_STACK};
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
          vertical-align: top;
          overflow-wrap: normal;
          word-break: normal;
        }

        .policy-content tbody tr:nth-child(even) td {
          background: #f6f7f8;
        }

        /* Section 02: 38 / 42 / 20 */
        .threeColTable th:nth-child(1),
        .threeColTable td:nth-child(1) {
          width: 38%;
        }

        .threeColTable th:nth-child(2),
        .threeColTable td:nth-child(2) {
          width: 42%;
        }

        .threeColTable th:nth-child(3),
        .threeColTable td:nth-child(3) {
          width: 20%;
        }

        /* Section 05: 38 / 62 */
        .twoColTable th:nth-child(1),
        .twoColTable td:nth-child(1) {
          width: 38%;
        }

        .twoColTable th:nth-child(2),
        .twoColTable td:nth-child(2) {
          width: 62%;
        }

        @media (max-width: 700px) {
          .policy-section {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 32px 0;
          }

          .policy-number {
            font-size: 24px;
          }

          .policy-content h2 {
            font-size: 21px;
          }

          .policy-content p,
          .policy-content ul {
            font-size: 14px;
            line-height: 1.6;
          }

          .policy-content ul {
            padding-left: 22px;
          }

          .threeColTable,
          .twoColTable {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .threeColTable table,
          .twoColTable table {
            width: 680px !important;
            min-width: 680px !important;
            max-width: none !important;
            table-layout: fixed !important;
            font-size: 12px !important;
            line-height: 1.45 !important;
          }

          .threeColTable th,
          .threeColTable td,
          .twoColTable th,
          .twoColTable td {
            font-family: ${FONT_STACK} !important;
            font-size: 12px !important;
            line-height: 1.45 !important;
            -webkit-text-size-adjust: 100% !important;
            text-size-adjust: 100% !important;
          }

          .threeColTable th,
          .twoColTable th {
            font-weight: 800 !important;
          }

          .threeColTable td,
          .twoColTable td {
            font-weight: 500 !important;
          }
        }
      `}</style>
    </>
  )
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="policy-section">
      <div className="policy-number">{number}</div>

      <div className="policy-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}
