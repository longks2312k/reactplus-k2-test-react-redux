import { Modal, Input, Button } from 'antd';
import './ListUser.css'
import React, { useState, useEffect } from "react";
import { getProduct, deleteProduct, putProduct } from '../../Api/Api'
import { useSelector, useDispatch } from "react-redux";

import { AddUserForm } from '../AddUserForm'

export const ListProduct = (props) => {

    const [product, setProduct] = useState([])
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [reload, setReload] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector((store) => store.authReducer.token);
    const onAddToStore = (item) => {
        // Thêm sp lên store
        dispatch({ type: 'ADD_CART', data: { item } })
        console.log('token',token)
    }


    // Modal
    const handleOpenModal = (item) => {
        setIsModalVisible(true)
        setId(item.id)
    }

    const handleCancel = async () => {
        await setReload(prev => prev + 1)
        setIsModalVisible(false)
    }

    // Get
    const callGetProduct = async () => {
        const response = await getProduct();
        console.log("data", response.data)
        setProduct(response.data)
    }

    // Delete
    const onDelete = async (item) => {
        await deleteProduct(item.id)
        // reload
        setReload(prev => prev + 1)
        // Xóa sản phẩm => thông tin sp trên store cũng bị xóa
        dispatch({ type: 'REMOVE_CART'})
    }

    // Edit
    const onChange = async (item) => {
        await putProduct(id, { product_code: code, product_name: name })
        // Sửa sản phẩm trên store
        // dispatch({ type: 'REMOVE_CART'})
        // dispatch({ type: 'ADD_CART', data: { item } })
        setIsModalVisible(false)
    }

    useEffect(() => {
        callGetProduct()
    }, [reload, isModalVisible])

    return <div className="ant-list-items">
        <h1> Product List </h1>
        <AddUserForm />
        <div>
            <div className="item-title">
                <div className="ids">
                    <h3>ID</h3>
                </div>
                <div className="contents">
                    <h3>Product Name</h3>
                </div>
                <div className="buttons"></div>
            </div>
            {product.map((item, index) => (
                index % 2 !== 0 ? (
                    <div key={item.id} className="ant-list-item-meta">
                        <div className="ant-list-item-meta-avatar">
                            <h3>{item.id}</h3>
                        </div>
                        <div className="ant-list-item-meta-content">
                            <h2 className="ant-list-item-meta-title">
                                {item.product_name}
                            </h2>
                            <div className="ant-list-item-meta-description">
                                code: {item.product_code}
                            </div>
                        </div>
                        <ul className="ant-list-item-action">
                            <Button onClick={() => handleOpenModal(item)} className="ant-list-item-btn">
                                Edit
                            </Button>
                            <Button onClick={() => onDelete(item)} className="ant-list-item-btn">
                                Remove
                            </Button>
                            <Button onClick={() => onAddToStore(item)} className="ant-list-item-btn">
                                Add to Store
                            </Button>
                        </ul>
                    </div>
                )
                    :
                    (
                        <div key={item.id} className="ant-list-item-meta  b-color">
                            <div className="ant-list-item-meta-avatar">
                                <h3>{item.id}</h3>
                            </div>
                            <div className="ant-list-item-meta-content">
                                <h2 className="ant-list-item-meta-title">
                                    {item.product_name}
                                </h2>
                                <div className="ant-list-item-meta-description">
                                    code: {item.product_code}
                                </div>
                            </div>
                            <ul className="ant-list-item-action">
                                <Button onClick={() => handleOpenModal(item)} className="ant-list-item-btn">
                                    Edit
                                </Button>
                                <Button onClick={() => onDelete(item)} className="ant-list-item-btn">
                                    Remove
                                </Button>
                                <Button onClick={() => onAddToStore(item)} className="ant-list-item-btn">
                                    Add to Store
                                </Button>
                            </ul>
                        </div>
                    )
            ))}
        </div>
        <Modal title="Edit Product" visible={isModalVisible} footer={null} onCancel={handleCancel}>
            <div>
                <div className="input-text">
                    <Input onChange={(e) => setCode(e.target.value)} placeholder="Product Code" type="text" className="ant-input" />
                </div>
                <div className="input-text">
                    <Input onChange={(e) => setName(e.target.value)} placeholder="Product Name" type="text" className="ant-input" />
                </div>
                <div className="div-button">
                    <Button onClick={() => onChange()} className="ant-btn ant-btn-primary">
                        Edit Product
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
}