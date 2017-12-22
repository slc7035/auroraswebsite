import React from 'react';
import '../../stylesheets/services.scss';
import ServiceCategory from './ServiceCategory.jsx';

export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: JSON.parse(document.getElementById('servicesJSON').value),
      filterText: ''
    };
  }
  render() {
    let servicesCategories = [];

    for (let category in this.state.services) {
      if (this.state.services.hasOwnProperty(category))
        servicesCategories.push(<ServiceCategory services={this.state.services[category]} filter={this.state.filterText} category={category} key={category}></ServiceCategory>);
    }

    return (
      <div className='page-content services-content'>
        <div className='search-container'>
          <label className='search-label' htmlFor='servicesFilter'>
            <i className='fa fa-search'/>
          </label>
          <input 
            id='servicesFilter'
            onChange={this.filterTimeout}
            placeholder='Search...'
            type='search'
            value={this.state.filterText}
          />
        </div>
        <div className='categories-container'>
          {servicesCategories}
        </div>
      </div>
    );
  }
  filterTimeout = (event) => {
    this.setState({
      services: this.state.services,
      filterText: event.target.value
    });
  }
}
