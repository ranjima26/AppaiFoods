export interface Product {
  slug: string;
  image: string;
  backImage?: string;
  bowlImage?: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
}

// Existing sample prices; replace with confirmed catalog pricing.
export const products: Product[] = [
  {
    "slug": "banana-chips",
    "image": "banana chips.png",
    "backImage": "banana chip back.png",
    "bowlImage": "/banana-chips-bowl.png",
    "name": "Banana Chips",
    "subtitle": "Golden & crispy",
    "description": "Golden banana chips with a satisfying crunch. A familiar favourite for snack breaks and sharing.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "achappam",
    "image": "achappam.png",
    "backImage": "achappam back.png",
    "bowlImage": "/achappam-bowl.png",
    "name": "Achappam",
    "subtitle": "Traditional rose cookies",
    "description": "Delicate rose-shaped cookies with a crisp bite. Enjoy this Kerala teatime favourite with your favourite hot drink.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "tapioca-chips",
    "image": "tapioca chips.png",
    "backImage": "tapioca back.png",
    "bowlImage": "/tapioca-chips-bowl.png",
    "name": "Tapioca Chips",
    "subtitle": "A classic Kerala crunch",
    "description": "Crisp tapioca chips for a satisfying snack break. Serve a bowl to share with friends and family.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "kuzhalappam",
    "image": "kuzhalappam.png",
    "backImage": "kuzhalappam back.png",
    "bowlImage": "/kuzhalappam-bowl.png",
    "name": "Kuzhalappam",
    "subtitle": "Crispy rice flutes",
    "description": "Traditional rice flutes with a distinctive rolled shape and crisp texture. A lovely companion to afternoon tea.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "avalose-unda",
    "image": "avalose unda.png",
    "backImage": "avalose unda back.png",
    "bowlImage": "/avalose-unda-bowl.png",
    "name": "Avalose Unda",
    "subtitle": "Traditional sweet balls",
    "description": "Traditional Kerala sweet balls with a firm bite. Enjoy a little sweetness with your afternoon break.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "chammanthi-podi",
    "image": "chammanthi podi.png",
    "backImage": "chammanthi podi back.png",
    "bowlImage": "/chammanthi-podi-bowl.png",
    "name": "Chammanthi Podi",
    "subtitle": "Roasted coconut chutney powder",
    "description": "Roasted coconut chutney powder to accompany your meals. Serve alongside rice, idli or dosa.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "masala-peanuts",
    "image": "spicy masala roasted peanut.png",
    "backImage": "spicy masala roasted peanut back.png",
    "bowlImage": "/masala-peanuts-bowl.png",
    "name": "Masala Peanuts",
    "subtitle": "Spicy & crunchy",
    "description": "A crunchy peanut snack with a spicy masala flavour. Set out a bowl for teatime or sharing.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "tapioca-sticks",
    "image": "tapioca chips sticks.png",
    "backImage": "tapioca chips sticksback.png",
    "bowlImage": "/tapioca-sticks-bowl.png",
    "name": "Tapioca Sticks",
    "subtitle": "Crispy teatime sticks",
    "description": "Crunchy tapioca sticks that are easy to share. A simple addition to your teatime snack selection.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "sweet-kolly",
    "image": "sweet kolly.png",
    "backImage": "sweet kolly back.png",
    "bowlImage": "/sweet-kolly-bowl.png",
    "name": "Sweet Kolly",
    "subtitle": "A little something sweet",
    "description": "A sweet addition to your Kerala snack selection. Enjoy a little treat whenever you take a break.",
    "price": 99,
    "originalPrice": 100
  },
  {
    "slug": "poopola",
    "image": "poopola.png",
    "backImage": "poopola back.png",
    "name": "Poopola",
    "subtitle": "A Kerala favourite",
    "description": "A Kerala favourite for your snack collection. Serve with tea and enjoy with family or friends.",
    "price": 99,
    "originalPrice": 100
  }
];
