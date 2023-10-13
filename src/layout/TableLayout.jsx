import React, { useEffect, useState } from 'react'
import data from '../data.json'
import TableComponent from '../components/TableComponent'

import styles from './Layout.module.scss'

const TableLayout = () => {

    // data ===================
    const [productData, setProductData] = useState(data.products)
    const [filteredData, setFilteredData] = useState([])
    const [pagedData, setPagedData] = useState([]);
    // search ==================
    const [searchQuery, setSearchQuery] = useState('');
    // filter ==================
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    // pagination ===============
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 12
    const totalPages = Math.ceil(filteredData.length / itemPerPage);


    // search the data whet search query changes - also at the first load
    useEffect(() => {
        const searchedData = productData.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filtered = productData.filter((product) => {
            const matchesCategory = categoryFilter === 'All' || product.category.toLowerCase() === categoryFilter;
            const matchesBrand = brandFilter === 'All' || product.brand.toLowerCase() === brandFilter;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesBrand && matchesSearch;
        });

        setFilteredData(filtered);
    }, [searchQuery, productData, categoryFilter, brandFilter]);



    // calculate the number of data in each page
    useEffect(() => {
        const startData = (currentPage - 1) * itemPerPage;
        const endData = startData + itemPerPage;
        const pageData = filteredData.slice(startData, endData);
        setPagedData(pageData);
    }, [currentPage, filteredData]);

    // pagination calculation 
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // search handles 
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // filter handler 
    const uniqueCategories = [...new Set(productData.map((product) => product.category.toLowerCase()))].sort();
    const uniqueBrands = [...new Set(productData.map((product) => product.brand.toLowerCase()))].sort();




    return (
        <div className={styles.TableLayout}>

            {/* search box section */}
            <div className={styles.TableLayout__searchSection}>
                <input type="text" placeholder='search...' value={searchQuery} onChange={handleSearch} />
            </div>

            {/* filter dropdowns section */}
            <div className={styles.TableLayout__filterSection}>
                <span>Caterories: </span>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {uniqueCategories.map((category) =>
                        <option value={category}>{category}</option>
                    )}
                </select>

                <span>Brands: </span>
                <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                >
                    <option value="All">All Brands</option>
                    {uniqueBrands.map((barnd) =>
                        <option value={barnd}>{barnd}</option>
                    )}
                </select>
            </div>

            {/* table */}
            <TableComponent productsData={pagedData} />

            {/* pagination */}
            <div className={styles.TableLayout__pagination}>
                <button onClick={() => handlePageChange(currentPage - 1)}> {`< prev`} </button>

                {pageNumbers.map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)}> {`next >`} </button>
            </div>
        </div>
    )
}

export default TableLayout
