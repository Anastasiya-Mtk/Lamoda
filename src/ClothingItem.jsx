import PropTypes from 'prop-types'; 

const ClothingItem = ({ sortedItems }) => {
  return (
    <div className="clothing-container">
      {sortedItems.length === 0 ? (
        <p className="no-results">По вашему запросу ничего не найдено</p>
      ) : (
        sortedItems.map((item) => (
          <div className="clothing-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="clothing-image" />
            <h4>{item.name}</h4>
            <p className="description">{item.description}</p>
            <div className="attributes">
              <span className="attribute">Цвет: <b>{item.color}</b></span>
              <span className="attribute">Категория: <b>{item.category}</b></span>
              <span className="attribute">Цена: <b>{item.price} BYN</b></span>
              <span className="attribute">Рейтинг: <b>{item.rating}</b></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


ClothingItem.propTypes = {
  sortedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ClothingItem;