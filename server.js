require("dotenv").config()
const express = require("express")
const Stripe = require("stripe")

const app = express()
app.use(express.json())
app.use(express.static("public"))

const stripe = Stripe(process.env.STRIPE_SECRET)

app.post("/checkout", async (req,res)=>{
 const session = await stripe.checkout.sessions.create({
  payment_method_types:["card"],
  mode:"payment",
  line_items:[{
   price_data:{
    currency:"brl",
    product_data:{name:req.body.produto},
    unit_amount:req.body.valor * 100
   },
   quantity:1
  }],
  success_url:"https://seusite/sucesso",
  cancel_url:"https://seusite"
 })
 res.json({url:session.url})
})

app.listen(3000)