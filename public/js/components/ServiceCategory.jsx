import React from 'react';
import '../../stylesheets/service_category.scss';

export default class ServiceCategory extends React.Component {
  static propTypes = {
    services: React.PropTypes.array,
    category: React.PropTypes.string,
  };
  render() {
    let services = [];

    for (let service of this.props.services) {
      if (service.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0) {
        services.push(
          <div className='service' key={service.name}>
            <div className='service-name' key={`service-${service.name}`}>{service.name}</div>
            <div className='service-price' key={`service-price-${service.name}`}>{service.price}</div>
            <div className='service-extra'>{service.extra ? '+': ''}</div>
          </div>
        );
      }
    }

    return (
      services.length === 0 ?
        null
        :
        <div className='category'>
          <div className='category-title'>{this.props.category}</div>
          <div className='services-container'>
            {services}
          </div>
        </div>
    );
  }
}
