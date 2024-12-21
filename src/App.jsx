import { useState, useEffect, useMemo, useCallback } from "react";
import Chance from "chance";
import { v4 as uuidv4 } from "uuid";
import Filters from "./Filters"; 
import ClothingItem from "./ClothingItem"; 
import "./app.css";

const chance = new Chance();

const App = () => {
  const [filters, setFilters] = useState({
    colors: [],
    priceFrom: "",
    priceTo: "",
    searchQuery: "",
  });
  const [sortOrder, setSortOrder] = useState("cheap");
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    const items = generateClothingItems(10);
    setClothingItems(items);
  }, []);

  function generateClothingItems(num) {
    const colors = ["Красный", "Синий", "Зеленый", "Желтый", "Черный"];
    const categories = [
      "Одежда",
      "Обувь",
      "Аксессуары",
      "Электроника",
      "Дом и сад",
      "Спорт",
      "Игрушки",
      "Книги",
      "Красота",
      "Автотовары",
    ];

    const imageNames = [
      "product1.jpg",
      "product2.jpg",
      "product3.webp",
      "product4.webp",
      "product5.webp",
      "product6.jpg",
      "product7.avif",
      "product8.jpg",
      "product9.jpg",
      "product10.jpeg",
    ];

    const items = [];
    for (let i = 0; i < num; i++) {
      items.push({
        id: uuidv4(),
        name: chance.word({ syllables: 2 }).replace(/^\w/, (c) => c.toUpperCase()),
        description: chance.sentence({ words: 10 }),
        color: chance.pickone(colors),
        category: chance.pickone(categories),
        price: chance.integer({ min: 10, max: 9999 }),
        rating: parseFloat(chance.floating({ min: 0, max: 5, fixed: 1 })),
        imageUrl: `/Lamoda/images/${chance.pickone(imageNames)}`,
      });
    }
    return items;
  }

  const handleColorChange = (color) => {
    setFilters((prevFilters) => {
      const newColors = prevFilters.colors.includes(color)
        ? prevFilters.colors.filter((c) => c !== color)
        : [...prevFilters.colors, color];
      return { ...prevFilters, colors: newColors };
    });
  };

  const handlePriceFromChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, priceFrom: value }));
  };

  const handlePriceToChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, priceTo: value }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, searchQuery: value }));
  };

  const filterItems = useCallback(() => {
    return clothingItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesColor = filters.colors.length === 0 || filters.colors.includes(item.color);
      const price = item.price;
      const matchesPrice =
        (filters.priceFrom === "" || price >= Number(filters.priceFrom)) &&
        (filters.priceTo === "" || price <= Number(filters.priceTo));

      return matchesSearch && matchesColor && matchesPrice;
    });
  }, [filters, clothingItems]);

  const sortedItems = useMemo(() => {
    const items = filterItems();
    switch (sortOrder) {
      case "cheap":
        return [...items].sort((a, b) => a.price - b.price);
      case "expensive":
        return [...items].sort((a, b) => b.price - a.price);
      case "popular":
        return [...items].sort((a, b) => b.rating - a.rating);
      default:
        return items;
    }
  }, [filterItems, sortOrder]);

  const uniqueColors = useMemo(() => {
    const uniqueColors = new Set(clothingItems.map((item) => item.color));
    return Array.from(uniqueColors);
  }, [clothingItems]);

  return (
    <div className="app-container">
      <h1 className="app-title">Lamoda</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Введите название или описание элемента"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="buttons-container">
        <button 
          onClick={() => setSortOrder("cheap")} 
          className={sortOrder === "cheap" ? "active" : ""}
        >
          Сначала дешевые
        </button>
        <button 
          onClick={() => setSortOrder("expensive")} 
          className={sortOrder === "expensive" ? "active" : ""}
        >
          Сначала дорогие
        </button>
        <button 
          onClick={() => setSortOrder("popular")} 
          className={sortOrder === "popular" ? "active" : ""}
        >
          Сначала популярные
        </button>
      </div>
      <div className="main-content">
        <Filters
          filters={filters}
          handleColorChange={handleColorChange}
          handlePriceFromChange={handlePriceFromChange}
          handlePriceToChange={handlePriceToChange}
          uniqueColors={uniqueColors}
        />
        <ClothingItem sortedItems={sortedItems} />
      </div>
    </div>
  );
};

export default App;
