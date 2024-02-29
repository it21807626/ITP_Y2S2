const express=require('express')
const {
    createMenu,
    getMenu,
    getMenus,
    deleteMenu,
    updateMenu
}=require('../controllers/menuController')


const router = express.Router()

router.get('/menus', getMenus)

router.get('/:id',  getMenu)

router.post('/', createMenu)

router.delete('/:id', deleteMenu)

router.patch('/:id', updateMenu)



module.exports=router