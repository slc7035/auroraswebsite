import React from 'react';
import '../../stylesheets/footer.scss';

export default class Footer extends React.Component {
  render() {

    return (
      <div className='footer'>
        <div className='footer__hours_container'>
          <div className='footer__hours_title'>Business Hours</div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Mon</div>
            <div className='footer__hours_times'>9am - 7pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Tue</div>
            <div className='footer__hours_times'>9am - 7pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Wed</div>
            <div className='footer__hours_times'>9am - 7pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Thur</div>
            <div className='footer__hours_times'>9am - 7pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Fri</div>
            <div className='footer__hours_times'>9am - 7pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Sat</div>
            <div className='footer__hours_times'>9am - 3pm</div>
          </div>
          <div className='footer__hours'>
            <div className='footer__hours_day'>Sun</div>
            <div className='footer__hours_times'>Closed</div>
          </div>
        </div>
        <div className='footer__about'></div>
      </div>
    );
  }
}