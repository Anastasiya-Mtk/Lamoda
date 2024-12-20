import PropTypes from 'prop-types'; 

const Filters = ({ filters, handleColorChange, handlePriceFromChange, handlePriceToChange, uniqueColors }) => {
  return (
    <div className="filters-container">
      <h3>По цвету</h3>
      {uniqueColors.map((color) => (
        <label key={color}>
          <input
            type="checkbox"
            checked={filters.colors.includes(color)}
            onChange={() => handleColorChange(color)}
          />
          {color}
        </label>
      ))}
      <h3>По цене</h3>
      <div className="price-filter">
        <input
          type="number"
          placeholder="От"
          value={filters.priceFrom}
          onChange={handlePriceFromChange}
        />
        <input
          type="number"
          placeholder="До"
          value={filters.priceTo}
          onChange={handlePriceToChange}
        />
      </div>
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceFrom: PropTypes.string.isRequired,
    priceTo: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }).isRequired,
  handleColorChange: PropTypes.func.isRequired,
  handlePriceFromChange: PropTypes.func.isRequired,
  handlePriceToChange: PropTypes.func.isRequired,
  uniqueColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filters;