import React,{ useState } from "react";
import { Button, Input } from 'antd';
import {postProduct} from '../../Api/Api'
import './Adduser.css'

export const AddUserForm = () => {
    const [code,setCode] = useState('')
    const [name,setName] = useState('')
    
    //Add
    const onAdd =  () => {
        postProduct({product_code: code, product_name:name})
    }

    

    return <div>
        <div>
            <div className="input-text">
                <Input onChange={(e)=> setCode(e.target.value)} placeholder="Product Code" type="text" className="ant-input" />
            </div>
            <div className="input-text">
                <Input onChange={(e)=> setName(e.target.value)} placeholder="Product Name" type="text" className="ant-input" />
            </div>
            <div className="div-button">
                <Button onClick={onAdd} className="ant-btn ant-btn-primary">
                    Add New Product
                </Button>
            </div>
        </div>
        
    </div>
}
