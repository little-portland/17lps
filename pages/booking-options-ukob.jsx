import React, { useEffect } from "react";
import Head from "next/head";

// components
import Button from "@components/UX/Button";

const BookingOptions = () => {
  useEffect(() => {
    document.body.classList.add("thursday");

    return () => {
      document.body.classList.remove("thursday");
    };
  }, []);

  return (
    <>
    <Head>
      <title>Event Bookings | Little Portland</title>
      <meta name="robots" content="noindex,follow" />
      <meta name="googlebot" content="noindex,follow" />
    </Head>

      <div id="bookingOptions">
        <h1 className="event-name desktop-only day-category">
          <span className="day">Thursday</span> Underground
        </h1>

        <h1 className="event-name mobile-only cat">
          <span className="cat-day">Thursday</span> Underground
        </h1>

        <div className="event-info">
          <div className="info date">
            <h2>
              <span>THU</span>15 OCT
            </h2>
          </div>

          <div className="info artists">
            <h3>
              <span>
                TENT <b>//</b>{" "}
              </span>
              Deep Listening Sessions with Cristi Cons [20:00]  <br />
              E. Alexander, Marcelina Wick [22:00] 
            </h3>

            <h3>
              <span>
                STUDIO <b>//</b>{" "}
              </span>
              Cristi Cons, Vincent Lemieux
            </h3>
          </div>
        </div>

        <div className="button-wrapper new-button-wrapper nocturn-ticket-wrapper mobile-only">
          <Button
            classes="events-button ticketNew nocturnCabaretTicket"
            btnType="hollow"
          >
            <a href="https://sevn.ly/x3WhN9qj" target="_blank" rel="noopener noreferrer"
            >
              <span className="nocturn-main-text">DEEP LISTENING SESSIONS - CRISTI CONS [8PM]</span>
              <p className="time">(INCLUDES CLUB ENTRY)</p>
            </a>
          </Button>

          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xXJmXgpz" target="_blank" rel="noopener noreferrer"
            >
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>

        <div className="button-wrapper new-button-wrapper nocturn-ticket-wrapper desktop-only">
          <Button
            classes="events-button ticketNew nocturnCabaretTicket"
            btnType="hollow"
          >
            <a
              href="https://sevn.ly/x3WhN9qj" target="_blank" rel="noopener noreferrer"
            >
              <span className="nocturn-main-text">DEEP LISTENING SESSIONS - CRISTI CONS [8PM]</span>
              <p className="time">(INCLUDES CLUB ENTRY)</p>
            </a>
          </Button>

          <Button classes="events-button ticketNew" btnType="hollow">
            <a href="https://sevn.ly/xXJmXgpz" target="_blank" rel="noopener noreferrer"
            >
              CLUB ENTRY [10PM]
            </a>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        #bookingOptions .nocturn-ticket-wrapper {
          width: 100%;
          gap: 8px;
        }

        #bookingOptions .nocturn-ticket-wrapper.desktop-only,
        #bookingOptions .nocturn-ticket-wrapper.mobile-only {
          flex-direction: column;
        }

        #bookingOptions .nocturn-ticket-wrapper .ticketNew {
          width: 100%;
        }

        #bookingOptions .nocturn-ticket-wrapper .ticketNew a {
          width: 100%;
          text-align: center;
        }

        #bookingOptions .nocturn-ticket-wrapper .ticketNew:not(.nocturnCabaretTicket) a {
          white-space: nowrap;
        }

        #bookingOptions .nocturnCabaretTicket {
          margin-bottom: 0px !important;
          padding-bottom: 0 !important;
        }

        #bookingOptions .nocturnCabaretTicket a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          white-space: normal;
        }

        #bookingOptions .nocturnCabaretTicket .nocturn-main-text {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-style: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
          text-align: center;
          text-transform: inherit;
        }

        #bookingOptions .nocturnCabaretTicket .nocturn-time {
          margin-top: 2px;
        }

        #bookingOptions .nocturnCabaretTicket .time {
          margin: 6px 0 0;
        }

        @media (min-width: 768px) {
        #bookingOptions .nocturnCabaretTicket .nocturn-main-text {
            line-height: 20px !important;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        
          #bookingOptions .nocturn-ticket-wrapper.desktop-only {
            display: flex;
          }

          #bookingOptions .nocturn-ticket-wrapper.mobile-only {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          #bookingOptions .nocturn-ticket-wrapper.mobile-only {
            display: flex;
          }

          #bookingOptions .nocturn-ticket-wrapper.desktop-only {
            display: none !important;
          }

          #bookingOptions .nocturnCabaretTicket {
              margin-bottom: 10px !important;
              padding-bottom: 10px !important;
          }
          
          #bookingOptions .nocturnCabaretTicket .time {
              margin: -10px 0 0 !important;
          }
          
        }
      `}</style>
    </>
  );
};

export default BookingOptions;
