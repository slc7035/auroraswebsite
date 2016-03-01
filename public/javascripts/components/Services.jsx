import React from 'react';
import '../../stylesheets/services.scss';
import ServiceCategory from './ServiceCategory.jsx';

export default class Services extends React.Component {
  state = {
    services: JSON.parse(document.getElementById('servicesJSON').value)
  };
  render() {
    let servicesCategories = [];

    for (let category in this.state.services) {
      if (this.state.services.hasOwnProperty(category))
        servicesCategories.push(<ServiceCategory services={this.state.services[category]} category={category} key={category}></ServiceCategory>);
    }

    return (
      <div className='page-content services-content'>
        {servicesCategories}
      </div>
    );
  }
}
