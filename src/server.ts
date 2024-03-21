import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import productRoute from './handlers/productRouter'
import userRoute from './handlers/userRouter'
import { OrderModel } from './models/orderModel'
import orderRoute from './handlers/orderRouter'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoute(app);
userRoute(app);
orderRoute(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
