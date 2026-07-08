import express from 'express'
import pdfRoutes from './routes/pdfRoutes.js'



const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static("public"))

//for any endpoint starting with / go and look inside  the pdfRoutes
app.use('/' , pdfRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
