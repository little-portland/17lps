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
        <title>Bookings</title>
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
              <span>THU</span>25 JUN
            </h2>
          </div>

          <div className="info artists">
            <h3>
              <span>
                TENT <b>//</b>{" "}
              </span>
              DAVIDE DEL VECCHIO, GABRIEL RAI
            </h3>

            <h3>
              <span>
                STUDIO <b>//</b>{" "}
              </span>
              MATHEW JONSON
            </h3>
          </div>
        </div>

        <div className="button-wrapper new-button-wrapper nocturn-ticket-wrapper mobile-only">
          <Button
            classes="events-button ticketNew nocturnCabaretTicket"
            btnType="hollow"
          >
            <a
              href="https://sevn.ly/x7vHV9je"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nocturn-main-text">NOCTURN CABARET</span>
              <p className="nocturn-main-text nocturn-time">[7:30PM]</p>
              <p className="time">(INCLUDES CLUB ENTRY)</p>
            </a>
          </Button>

          <Button classes="events-button ticketNew" btnType="hollow">
            <a
              href="https://sevn.ly/xDWKEH0e"
              target="_blank"
              rel="noopener noreferrer"
            >
              CLUB ENTRY ONLY [11PM]
            </a>
          </Button>
        </div>

        <div className="or mobile-only">
          <h2>Or</h2>
        </div>

        <div className="book-wrapper">
          <div className="override-heading">
            <h2>START WITH DINNER</h2>
            <p className="time mobile-only">Includes Club Entry</p>
          </div>

          <div className="tags mobile-only">
            <h3>
              <span>
                DINING CONCEPT: <span className="strongword">FUTURIST</span>
              </span>
            </h3>
          </div>

          <div className="concept">
            <h4>“Override” is our restaurant concept</h4>
          </div>

          <div className="button-wrapper new-button-wrapper button-wrapper-new dining-con">
            <a
              className="menu-btn"
              href="https://www.little-portland.com/food"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[More about our dining concept]</span>
            </a>
          </div>

          <div className="button-wrapper new-button-wrapper">
            <Button
              classes="events-button new-events-button view-menu"
              btnType="hollow"
            >
              <a
                href="https://www.little-portland.com/menu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Menu</span>
              </a>
            </Button>
          </div>

          <div className="button-wrapper new-button-wrapper desktop-only">
            <Button classes="events-button new-events-button" btnType="hollow">
              <a
                href="https://www.sevenrooms.com/reservations/littleportland?default_date=2026-06-25&default_time=21:00&default_party_size=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="space">IN THE TENT</span>
                <p className="time">Includes Club Entry</p>
                <p className="details">
                  <span>8:30PM</span>
                </p>
                <p className="btn-tagline">The Cosmic Experience</p>
              </a>
            </Button>

            <Button classes="events-button ticket" btnType="hollow">
              <a
                className="book-link"
                href="mailto:eat@little-portland.com?subject=Chef’s Studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="space">CHEF’S STUDIO</span>
                <p className="time">Includes Club Entry</p>
                <p className="details chef-studio-details">
                  <span>6-12 PAX</span>
                  <span>8PM</span>
                </p>
                <p className="btn-tagline">Where the heads dine</p>
              </a>
            </Button>
          </div>

          <div className="button-wrapper new-button-wrapper button-wrapper-new desktop-only">
            <a
              className="menu-btn"
              href="https://www.little-portland.com/thetent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[More about The Tent]</span>
            </a>

            <a
              className="menu-btn"
              href="https://www.little-portland.com/chefstudio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[More about Chef's Studio]</span>
            </a>
          </div>

          <div className="button-wrapper new-button-wrapper mobile-only">
            <Button classes="events-button new-events-button" btnType="hollow">
              <a
                href="https://www.sevenrooms.com/reservations/littleportland?default_date=2026-06-25&default_time=21:00&default_party_size=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="space">IN THE TENT</span>
                <p className="details">
                  <span>8:30PM</span>
                </p>
                <p className="btn-tagline">The Cosmic Experience</p>
              </a>
            </Button>

            <a
              className="menu-btn"
              href="https://www.little-portland.com/thetent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[More about The Tent]</span>
            </a>

            <Button classes="events-button ticket" btnType="hollow">
              <a
                className="book-link"
                href="mailto:eat@little-portland.com?subject=Chef’s Studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="space">CHEF’S STUDIO</span>
                <p className="details chef-studio-details">
                  <span>6-12 PAX</span>
                  <span>8PM</span>
                </p>
                <p className="btn-tagline">Where the heads dine</p>
              </a>
            </Button>

            <a
              className="menu-btn"
              href="https://www.little-portland.com/chefstudio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>[More about Chef's Studio]</span>
            </a>
          </div>
        </div>

        <div className="or desktop-only or-desktop">
          <h2>Or</h2>
        </div>

        <div className="button-wrapper new-button-wrapper nocturn-ticket-wrapper desktop-only">
          <Button
            classes="events-button ticketNew nocturnCabaretTicket"
            btnType="hollow"
          >
            <a
              href="https://sevn.ly/x7vHV9je"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="nocturn-main-text">NOCTURN CABARET</span>
              <p className="nocturn-main-text nocturn-time">[7:30PM]</p>
              <p className="time">(INCLUDES CLUB ENTRY)</p>
            </a>
          </Button>

          <Button classes="events-button ticketNew" btnType="hollow">
            <a
              href="https://sevn.ly/xDWKEH0e"
              target="_blank"
              rel="noopener noreferrer"
            >
              CLUB ENTRY ONLY [11PM]
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
        }
      `}</style>
    </>
  );
};

export default BookingOptions;
