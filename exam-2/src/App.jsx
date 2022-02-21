import React, { useState } from 'react';
import { Modal } from 'antd';

import { ListProduct } from './Components/ListUser'
import { AddUserForm } from './Components/AddUserForm'

import 'antd/dist/antd.css'
import './App.css';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="App">
      <h1> Product List</h1>
      <div className="btn-add">
        <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
          Add New User
        </button>
      </div>
      <ListProduct />
      <Modal title="Add New Product" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <AddUserForm />
      </Modal>
    </div>
  );
}

export default App;
