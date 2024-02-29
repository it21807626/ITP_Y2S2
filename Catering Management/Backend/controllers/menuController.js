const Menu=require('../models/menus')
const mongoose = require('mongoose')

//get all menus
const getMenus=async(req,res)=>{

    const menu=await Menu.find({}).sort({createdAt:-1})
    res.status(200).json(menu)

    

}


//get single menu
const getMenu=async(req,res)=>{
    const{id}=req.params
if(!mongoose.Types.ObjectId.isValid(id)){

    return res.status(404).json({error:'No such menu'})
}

    const menu=await Menu.findById(id)
    if(!menu){
        return res.status(404).json({error:'No such menu'})
    }
    res.status(200).json(menu)
}


//create new menu
const createMenu=async(req,res)=>{
    const{Caterer_name,Menu_name,Menu_items,price}=req.body
    let emptyFields=[]
    if(!Caterer_name){
        emptyFields.push('Caterer_name')
    }
    if(!Menu_name){
        emptyFields.push('Menu_name')
    }
    if(!Menu_items){
        emptyFields.push('Menu_items')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Fill in all the fields', emptyFields})
    }

    
    try{

        const menu=await Menu.create(req.body)
        res.status(200).json(menu)
    }catch(error){
        res.status(400).json({error:error.message})
    }

}

//delete menu
const deleteMenu=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error:'No such menu'})
    }
    const menu=await Menu.findOneAndDelete({_id: id})
    
    if(!menu){
        return res.status(404).json({error:'No such menu'})
    }

    res.status(200).json(menu)

}


//update menu
const updateMenu=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error:'No such menu'})
    }

    const menu=await Menu.findOneAndUpdate({_id:id},{
        ...req.body

    })

    if(!menu){
        return res.status(404).json({error:'No such menu'})
    }
    res.status(200).json(menu)

}


module.exports={

    getMenu,
    getMenus,
    createMenu,
    deleteMenu,
    updateMenu
}