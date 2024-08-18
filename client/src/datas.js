// export const api_url = 'https://7mstkkhh-3002.inc1.devtunnels.ms/api/'
// export const api_url = 'http://localhost:3002/api/'

export const available_currencies = {
  "INDIA":"INR",
  "USA":"USD",
  "EUROPE":"EUR",
  "UAE":"AED",
}

export const exchange_rates = {
  "INR": 1,
  "USD": 0.012,
  "EUR": 0.011,
  "AED": 0.044
}

export const currency_symbols = {
  "INR":"₹",
  "USD":"$",
  "EUR":"€",
  "AED":"AED"
}

export const users = [
    {
        "number_of_users": 2,
        "day": "2024-06-04"
    },
    {
        "number_of_users": 1,
        "day": "2024-06-06"
    }
]

export const orders = [
    { number_of_orders: 2, day: '2024-06-04' },
    { number_of_orders: 1, day: '2024-06-06' },
    { number_of_orders: 1, day: '2024-06-07' }
]

export const products = [
    {
        "number_of_products": 1,
        "category": "general"
      },
      {
        "number_of_products": 2,
        "category": "gym-equipments"
      },
      {
        "number_of_products": 2,
        "category": "mens"
      }
]

export const caption = "THE WORLDS BEST PURE PRODUCTS"

export const solution_eg = [
  {
    id:1,
    name:"Digestion",
    slug:"digestion"
  },{
    id:2,
    name:"Immunity",
    slug:"immunity"
  },{
    id:3,
    name:"Skin",
    slug:"skin"
  },
]

const products_eg = [
  {
    id: 1,
    image: 'path/to/image1.jpg',
    weight: '500g',
    packaging: 'Pouch',
    name: 'Jaggery Powder',
    rating: 4.5,
    reviews: 15,
    price: 99,
    originalPrice: 105,
  },
  {
    id: 2,
    image: 'path/to/image2.jpg',
    weight: '2g',
    packaging: 'Box',
    name: 'Kashmiri Mongra Saffron',
    rating: 4.5,
    reviews: 61,
    price: 549,
    originalPrice: 800,
  },
  {
    id: 3,
    image: 'path/to/image3.jpg',
    weight: '350g',
    packaging: 'Box',
    name: 'Dry Fruit Paak Sweet',
    rating: 4.5,
    reviews: 36,
    price: 499,
    originalPrice: 530,
  },
  {
    id: 4,
    image: 'path/to/image4.jpg',
    weight: '500g',
    packaging: 'Jar',
    name: 'Wild Forest Honey',
    rating: 4.5,
    reviews: 66,
    price: 449,
    originalPrice: 529,
  },
];
