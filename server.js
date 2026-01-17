require("dotenv").config()
const express=require("express")
const Stripe=require("stripe")
const mp=require("mercadopago")

const app=express()
app.use(express.json())
app.use(express.static("public"))

const stripe=Stripe(process.env.STRIPE_SECRET)

mp.configure({
 access_token:process.env.MP_TOKEN
})

app.post("/checkout",async(req,res)=>{
 const s=await stripe.checkout.sessions.create({
  payment_method_types:["card"],
  mode:"payment",
  line_items:[{
   price_data:{
    currency:"brl",
    product_data:{name:req.body.produto},
    unit_amount:req.body.valor*100
   },
   quantity:1
  }],
  success_url:"https://seusite/sucesso",
  cancel_url:"https://seusite"
 })
 res.json({url:s.url})
})

app.post("/pix",async(req,res)=>{
 const p=await mp.payment.create({
  transaction_amount:req.body.valor,
  description:req.body.produto,
  payment_method_id:"pix",
  payer:{email:"cliente@email.com"}
 })

 res.json({
  qr:p.body.point_of_interaction.transaction_data.qr_code_base64,
  copia:p.body.point_of_interaction.transaction_data.qr_code
 })
})

app.listen(3000)