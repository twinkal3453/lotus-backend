import Stripe from "stripe";
const stripe = new Stripe(process.env.GETWAY_KEY);
import { v4 as uuidv4 } from "uuid";

export const makepayment = (req, res) => {
  const { products, token } = req.body;
  // console.log("PRODUCTS", products);

  let actualPrice = [];
  products.map((p) => {
    actualPrice.push(
      p.price * p.count - (p.price * p.count * p.discount) / 100
    );
  });
  let amount = actualPrice
    .reduce((partial_amt, a) => partial_amt + a, 0)
    .toFixed(2);
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",

            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
