
const express = require('express')
const mongoose = require('mongoose')

const caterRoutes=require('./routes/Cater')

const app = express()

app.use(express.json())
app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()

} )


app.use('/api/Cater',caterRoutes)

const PORT=4000;
MONG_URI='mongodb+srv://sashinidnw:sashini123@reganwedding.et5t6bn.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONG_URI) //connect to db
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is running on ${PORT}`)
    })
})

.catch((error)=>{
    console.log(error)
})



