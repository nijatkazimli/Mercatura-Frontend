import React, { useState } from "react";
import Images from "../../constants/Images";
import styles from "./SearchBar.style";
import "./SearchBar.css";

type Props = {
    placeholder?: string,
    height?: number,
    width?: number,
    onSearch: (searchTerm: string) => void,
};

const SearchBar = ({ placeholder = "Search", height = 30, width = 200, onSearch }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const capitalizedTerm = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setSearchTerm(capitalizedTerm);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form style={styles.form(height, width)} onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={`${placeholder}...`}
                className="search-bar"
                required
            />
            <button className="search-button">
                <img src={Images.search.src} alt={Images.search.alt} className="search-icon" />
            </button>
        </form>
    );
};

export default SearchBar;
