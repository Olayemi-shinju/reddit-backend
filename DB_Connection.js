const mongoose = require('mongoose')

const Db_Connection = async()=>{
    try {
        await mongoose.connect('mongodb+srv://awoyemiolayemi27:fwy410Quh8LNcHrn@cluster0.v4wwg.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
        console.log('database connection successful')
    } catch (error) {
        console.log('Failed to Connect to Server ' + error)
    }
}

module.exports = Db_Connection


// const mongoose = require('mongoose')

// const Db_Connection = async()=>{
//     try {
//         await mongoose.connect('mongodb://localhost:27017/blog')
//         console.log('database connection successful')
//     } catch (error) {
//         console.log('Failed to Connect to Server ' + error)
//     }
// }

module.exports = Db_Connection