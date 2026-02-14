import React from 'react';
import './EventCard.css';


const EventCard = ({ name, tagline, prize, image, onClick }) => {
  return (
    <div className="card-wrapper" onClick={onClick}>

      {/* Notch Images (Hover Effects) */}
      <img
        className="notch-img top-left"
        src="/assets/events/images/notch-top-left.png"
        alt=""
      />
      <img
        className="notch-img bottom-right"
        src="/assets/events/images/notch-bottom-right.png"
        alt=""
      />

      {/* Main Card */}
      <div className="card">
        {/* SVG Border Overlay */}
        <svg className="card-border-svg" viewBox="0 0 313 462">
          <path d="M1 443.824V92.4971C1 87.9401 2.79117 83.5658 5.98718 80.3176L78.9268 6.18619C82.1912 2.86844 86.6508 1 91.3052 1H290.247C299.838 1 307.612 8.77488 307.612 18.3657V415.334C307.612 424.925 299.838 432.699 290.247 432.699H165.34C161.033 432.699 156.879 434.3 153.686 437.191L132.134 456.699C128.941 459.589 124.787 461.19 120.48 461.19H18.3657C8.77487 461.19 1 453.415 1 443.824Z" />
        </svg>

        <img className="main-img" src={image} alt={name} />

        <div className="card-overlay"></div>

        <div className="card-content">
          <h3 className="event-title">{name}</h3>

          <p className="event-tagline">{tagline}</p>

          <div className="prize">
            PRIZES WORTH<br />
            <span>{prize}</span>
          </div>

          {/* Dual State Action Buttons */}
          <div className="action-buttons-container">
            {/* Initial State: Plus Button */}
            <div className="addbtn">
              <svg width="80" height="37" viewBox="0 0 80 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.1306 1.00293H56.9117V5.02042" stroke="#CDF7FF"></path>
                <path d="M25.8539 36.1758L22.0727 36.1758L22.0727 32.1583" stroke="#CDF7FF"></path>
                <path d="M25.8512 0.999023H22.07V5.01651" stroke="#CDF7FF"></path>
                <path d="M53.1266 36.1719L56.9078 36.1719L56.9078 32.1544" stroke="#CDF7FF"></path>
                <rect width="32" height="32" transform="translate(23.0954 2.38281)" fill="#EEEBEE" fillOpacity="0.05"></rect>
                <path d="M34.2402 19.3372V17.4282H38.1287V13.042H40.0621V17.4282H43.9506V19.3372H40.0621V23.7234H38.1287V19.3372H34.2402Z" fill="#CDF7FF"></path>
              </svg>
            </div>

            {/* Hover State: View Details Button */}
            <div className="addbtnhover" onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}>
              <svg width="80" height="37" viewBox="0 0 80 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75.1973 1.07324H78.9784V5.09073" stroke="#CDF7FF"></path>
                <path d="M4.7832 36.2451L1.00204 36.2451L1.00204 32.2276" stroke="#CDF7FF"></path>
                <path d="M4.78125 1.06934H1.00008V5.08682" stroke="#CDF7FF"></path>
                <path d="M75.1953 36.2412L78.9765 36.2412L78.9765 32.2237" stroke="#CDF7FF"></path>
                <rect width="76" height="32" transform="translate(2.02539 2.45215)" fill="#EEEBEE" fillOpacity="0.05"></rect>
                <path d="M10.291 20.9521L8.17773 14.5537H9.23242L10.8496 19.4404H10.9199L12.666 14.5537H13.7285L11.498 20.9521H10.291ZM14.4199 20.9521V14.5537H15.4863V20.9521H14.4199ZM16.4824 20.9521L16.4746 14.5537H21.5371V15.6084H17.5371V17.2334H21.3066V18.2881H17.5371V19.8975H21.5371V20.9521H16.4824ZM29.1777 14.5537H30.2676L28.4004 20.9521H27.3848L26.2012 16.5537L24.9785 20.9521H23.9629L22.1543 14.5537H23.2402L24.4824 18.9443L25.666 14.5693H26.7559L27.8809 18.96L29.1777 14.5537ZM33.4121 20.9521V14.5537H37.8691L38.7715 15.3428V20.167L37.8691 20.9521H33.4121ZM34.4785 19.8975H37.4277L37.709 19.6631V15.8467L37.4277 15.6162H34.4785V19.8975ZM39.7012 20.9521L39.6934 14.5537H44.7559V15.6084H40.7559V17.2334H44.5254V18.2881H40.7559V19.8975H44.7559V20.9521H39.7012ZM47.6699 20.9521V15.6084H45.6699V14.5537H50.709V15.6084H48.7324V20.9521H47.6699ZM55.8535 20.9521L55.2012 19.2178H52.6309L52.0059 20.9521H50.9121L53.2246 14.5537H54.4863L56.9512 20.9521H55.8535ZM53.0137 18.1592H54.7988L53.959 15.9443H53.8145L53.0137 18.1592ZM57.623 20.9521V14.5537H58.6895V20.9521H57.623ZM60.8145 19.9287H64.4355V20.9521H59.7559V14.5537H60.8145V19.9287ZM66.2598 20.9521L65.3809 20.1826V19.1045H66.4355V19.6787L66.709 19.8975H69.4121L69.6699 19.6787V18.5186L69.3496 18.2725H66.2988L65.3809 17.4639L65.373 15.2959L66.2207 14.5537H69.8535L70.7246 15.3193V16.3662H69.6699V15.8232L69.4121 15.6084H66.709L66.4355 15.8232V16.9678L66.7402 17.21H69.7793L70.7324 18.0146V20.2178L69.916 20.9521H66.2598Z" fill="#CDF7FF"></path>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventCard;
