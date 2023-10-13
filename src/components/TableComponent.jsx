import React from 'react'

import styles from './Components.module.scss'

const TableComponent = ({ productsData }) => {
    const products = productsData

    return (
        <table className={styles.TableComponent} >

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>

            <tbody>
                {products?.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.category}</td>
                        <td>{product.title}</td>
                        <td>{product.brand}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>

                    </tr>
                ))}

            </tbody>
        </table >
    )
}

export default TableComponent
