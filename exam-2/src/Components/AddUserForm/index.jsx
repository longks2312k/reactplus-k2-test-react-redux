import React, { useState } from "react";
import { Button, Input, Modal } from 'antd';
import { postProduct } from '../../Api/Api'
import './Adduser.css'
import { useDispatch, useSelector } from "react-redux";


export const AddUserForm = (props) => {
    const [code, setCode] = useState('')
    const [name, setName] = useState('')

    const dispatch = useDispatch();
    const token = useSelector((store) => store.authReducer.token);
    const onRemoveAll = () => {
        // Xóa hết sp trong store
        dispatch({ type: 'REMOVE_ALL'})
    }

    //Add
    const onAdd = () => {
        postProduct({ product_code: code, product_name: name })
        setIsModalVisible(false)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);



    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return <div>
        <div>
            <div className="btn-add">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New User
                </button>
                <button onClick={() => onRemoveAll()} className="ant-btn ant-btn-primary margin-left">
                    Remove Store
                </button>
                
            </div>
            <Modal title="Add New Product" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <div className="input-text">
                    <Input onChange={(e) => setCode(e.target.value)} placeholder="Product Code" type="text" className="ant-input" />
                </div>
                <div className="input-text">
                    <Input onChange={(e) => setName(e.target.value)} placeholder="Product Name" type="text" className="ant-input" />
                </div>
                <div className="div-button">
                    <Button onClick={onAdd} className="ant-btn ant-btn-primary">
                        Add New Product
                    </Button>
                </div>
            </Modal>
        </div>
    </div >
}
