import React from 'react';
// import PropTypes from 'prop-types';
import './custom-grid.styles.css';


const CustomGrid = ({ header, loading, children }) => {

  const renderElements = () => {
    const gridElements = children.map( (element, i) => (
      <div key={i} className="grid-element">
        {element}
      </div>
    ))
    return gridElements;
  }

  return (
    <div className="grid container">
      {header  ? <h1 className = "grid-header">{header}</h1> : null}
      <div className="grid-content">
         {renderElements()}
      </div>
    </div>
  )
}

// FourColGrid.propTypes = {
//   header: PropTypes.string,
//   loading: PropTypes.bool
// }

export default CustomGrid;