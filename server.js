require("dotenv").config()
const express = require("express")
const Stripe = require("stripe")

const app = express()
app.use(express.json())

// SERVIR A PASTA PUBLIC
app.use(express.static("public"))

const stripe = Stripe(process.env.STRIPE_SECRET)

// ROTA PRINCIPAL
app.get("/", (req,res)=>{
 res.sendFile(__dirname + "/public/index.html")
})

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
  success_url:"https://google.com",
  cancel_url:"https://google.com"
 })
 res.json({url:session.url})
})

// PORTA DO RENDER
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>console.log("Rodando na porta "+PORT))