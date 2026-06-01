import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

//Produktdata
const products = [
  // ── WOMEN ──
  {
    name: "Coco Mademoiselle",
    brand: "Chanel",
    price: 159,
    volume: 100,
    description:
      "An intense, sensual fragrance with a zesty, fresh start. A modern, free-spirited character.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Vanilla"],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1708733145706-82da0d0596e9?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Miss Dior",
    brand: "Dior",
    price: 149,
    volume: 100,
    description:
      "A floral chypre fragrance that embodies femininity and grace with a modern twist.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Musky"],
    popular: true,
    image:
      "https://distcdn.nicehair.dk/products/123580/dior-miss-dior-edp-50-ml-1772024141.webp",
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    price: 129,
    volume: 75,
    description:
      "Life is beautiful. A radiant fragrance built around iris, praline and sandalwood.",
    categories: ["Women"],
    notes: ["Floral", "Vanilla", "Musky"],
    popular: false,
    image:
      "https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    price: 139,
    volume: 50,
    description:
      "An addictive feminine fragrance. The warmth of coffee and the sensuality of vanilla.",
    categories: ["Women"],
    notes: ["Vanilla", "Sweet", "Musky"],
    popular: true,
    image:
      "https://fandi-perfume.com/cdn/shop/files/yves-saint-laurent-black-opium-for-women-eau-de-parfum-intense-1217976200.png?v=1769482491&width=1946",
  },
  {
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    price: 169,
    volume: 50,
    description:
      "An explosion of flowers. A rich floral bouquet that is both powerful and deeply feminine.",
    categories: ["Women"],
    notes: ["Floral", "Rose", "Jasmine", "Amber"],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1673443143036-ef6eec48c595?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chance",
    brand: "Chanel",
    price: 145,
    volume: 100,
    description:
      "A round, vibrant and sensual fragrance. Fresh, soft and powdery all at once.",
    categories: ["Women"],
    notes: ["Floral", "Jasmine", "Vanilla"],
    popular: false,
    image:
      "https://images.unsplash.com/photo-1588177925144-2fd3e4e7ce57?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "J'adore",
    brand: "Dior",
    price: 155,
    volume: 100,
    description:
      "A luminous floral fragrance that captures the essence of femininity and elegance.",
    categories: ["Women"],
    notes: ["Floral", "Rose", "Jasmine"],
    popular: true,
    image: "https://csdam.net/digitalcontent/0/6480/64804944.jpg",
  },
  {
    name: "Idôle",
    brand: "Lancôme",
    price: 119,
    volume: 75,
    description:
      "A clean, white floral fragrance for the modern woman who leads by example.",
    categories: ["Women"],
    notes: ["Floral", "Rose", "Musky"],
    popular: false,
    image:
      "https://media.sephora.eu/content/dam/digital/pim/published/L/LANCO/P3809040/44849-media_4.jpg",
  },
  {
    name: "Mon Paris",
    brand: "Yves Saint Laurent",
    price: 129,
    volume: 90,
    description:
      "A floral chypre fragrance inspired by a passionate love story set in Paris.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Musky"],
    popular: false,
    image:
      "https://images.matas.dk/trs/w1780//encode/3614270561665_2_20231211154021.jpg",
  },
  {
    name: "Daisy",
    brand: "Marc Jacobs",
    price: 99,
    volume: 100,
    description:
      "Fresh and feminine with a sparkling blend of wild berries, violet and jasmine.",
    categories: ["Women"],
    notes: ["Floral", "Fresh", "Jasmine"],
    popular: true,
    image:
      "https://cdn.notinoimg.com/detail_main_uhq/marc-jacobs/031655513034_17/daisy___240314.jpg",
  },
  {
    name: "Si",
    brand: "Giorgio Armani",
    price: 139,
    volume: 100,
    description:
      "A modern chypre fragrance that celebrates the strength and femininity of today's woman.",
    categories: ["Women"],
    notes: ["Floral", "Musky", "Vanilla"],
    popular: false,
    image:
      "https://cdn.deloox.com/cdn/product/1025479/521433_500.jpg?format=webp",
  },
  {
    name: "Good Girl",
    brand: "Carolina Herrera",
    price: 135,
    volume: 80,
    description:
      "A duality of light and shadow, jasmine and roasted tonka bean.",
    categories: ["Women"],
    notes: ["Jasmine", "Sweet", "Vanilla"],
    popular: true,
    image: "https://pricespy-75b8.kxcdn.com/product/right/800/16176818.jpg",
  },
  {
    name: "Olympéa",
    brand: "Paco Rabanne",
    price: 109,
    volume: 80,
    description:
      "An aquatic floral fragrance for a modern goddess. Fresh, warm and sensual.",
    categories: ["Women"],
    notes: ["Fresh", "Vanilla", "Musky"],
    popular: false,
    image:
      "https://cdn.notinoimg.com/detail_main_uhq/paco-rabanne/3349668528677x_03/olympea___220407.jpg",
  },
  {
    name: "Flora Gorgeous Gardenia",
    brand: "Gucci",
    price: 125,
    volume: 100,
    description:
      "A vibrant and sensual floral fragrance centered around the addictive gardenia flower.",
    categories: ["Women"],
    notes: ["Floral", "Sweet", "Musky"],
    popular: false,
    image:
      "https://cdn.notinoimg.com/detail_main_uhq/gucci/3616305275745_05/flora-gorgeous-gardenia-eau-de-parfum-intense___250609.jpg",
  },
  {
    name: "Bloom",
    brand: "Gucci",
    price: 119,
    volume: 100,
    description: "A rich floral fragrance inspired by a garden in full bloom.",
    categories: ["Women"],
    notes: ["Floral", "Jasmine", "Musky"],
    popular: false,
    image:
      "https://static1.sabinacdn.com/8982-thickbox_default/bloom-eau-de-parfum.jpg",
  },
  {
    name: "Crystal Noir",
    brand: "Versace",
    price: 105,
    volume: 90,
    description:
      "A sensual oriental floral fragrance. Mysterious, seductive and deeply feminine.",
    categories: ["Women"],
    notes: ["Floral", "Amber", "Musky"],
    popular: false,
    image:
      "https://www.sephora.com/productimages/product/p307000-av-01-zoom.jpg?imwidth=315",
  },
  {
    name: "Bright Crystal",
    brand: "Versace",
    price: 99,
    volume: 90,
    description:
      "A fresh, vibrant fragrance inspired by a crystal clear mountain spring.",
    categories: ["Women"],
    notes: ["Fresh", "Floral", "Musky"],
    popular: false,
    image:
      "https://cdn.jarrolds.co.uk/brands/versace/versace_block_690x690_1%7Bw=1000,h=1000%7D.jpg",
  },
  {
    name: "Hypnôse",
    brand: "Lancôme",
    price: 115,
    volume: 75,
    description:
      "A mysterious and sensual oriental floral fragrance with a hypnotic sillage.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Vanilla"],
    popular: false,
    image:
      "https://img01.ztat.net/article/spp-media-p1/96ee4724ab1245ef8e6045bc5e90970c/2b6786a7cfef4b48abae79df3170de88.jpg?imwidth=500",
  },
  {
    name: "Romance",
    brand: "Ralph Lauren",
    price: 95,
    volume: 100,
    description:
      "A timeless floral fragrance capturing the emotion of a perfect romantic moment.",
    categories: ["Women"],
    notes: ["Rose", "Floral", "Musky"],
    popular: false,
    image:
      "https://e7cbb2c9-bb84-4880-8504-79f06f158221.svc.edge.scw.cloud/product/240563/detailsc.jpg",
  },
  {
    name: "Eternity",
    brand: "Calvin Klein",
    price: 85,
    volume: 100,
    description:
      "A classic floral fragrance celebrating the beauty of love and commitment.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Musky"],
    popular: false,
    image:
      "https://lyko.com/globalassets/product-images/calvin-klein-eternity-edp-30ml-1071-305-0030_4.jpeg?ref=C89ABA23D5",
  },
  {
    name: "Pleasures",
    brand: "Estée Lauder",
    price: 89,
    volume: 100,
    description:
      "A joyful, luminous floral fragrance inspired by the simple pleasures of life.",
    categories: ["Women"],
    notes: ["Floral", "Rose", "Fresh"],
    popular: false,
    image:
      "https://media.theperfumeshop.com/medias/sys_master/prd-images/h67/h0d/8871801880606/zoom-back-1011352_420x420/estee-lauder-pleasures-eau-de-parfum-spray-420x420",
  },
  {
    name: "Beautiful",
    brand: "Estée Lauder",
    price: 92,
    volume: 75,
    description:
      "A bouquet of over 300 flowers celebrating life's most beautiful moments.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Floral"],
    popular: false,
    image: "https://m.media-amazon.com/images/I/415ytHQFOIL.jpg",
  },
  {
    name: "Tresor",
    brand: "Lancôme",
    price: 99,
    volume: 100,
    description:
      "A romantic and timeless fragrance. A love story told through flowers and iris.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Amber"],
    popular: false,
    image:
      "https://cdn2.parfumdreams.de/image/product/12130-0-3-22.webp?box=528",
  },
  {
    name: "Alien",
    brand: "Thierry Mugler",
    price: 129,
    volume: 60,
    description:
      "A luminous solar woody fragrance. Mysterious and otherworldly.",
    categories: ["Women"],
    notes: ["Woody", "Jasmine", "Amber"],
    popular: false,
    image:
      "https://img01.ztat.net/article/spp-media-p1/cef823f362e64fea9c2d11be9f71a0bc/7b8086f584054a259e3c88a7adc3bbbb.jpg?imwidth=1800",
  },
  {
    name: "Angel",
    brand: "Thierry Mugler",
    price: 119,
    volume: 100,
    description:
      "A gourmand oriental fragrance combining sweet patchouli with praline and vanilla.",
    categories: ["Women"],
    notes: ["Sweet", "Vanilla", "Musky"],
    popular: true,
    image:
      "https://e7cbb2c9-bb84-4880-8504-79f06f158221.svc.edge.scw.cloud/product/240400/detailsc.jpg",
  },

  // ── MEN ──
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 149,
    volume: 100,
    description:
      "A woody aromatic fragrance for the man who defies convention. Fresh, clean and deeply sophisticated.",
    categories: ["Men"],
    notes: ["Woody", "Citrus", "Fresh"],
    popular: true,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR64K19q3rVVcxxchxVlvt1a_jJE6j8jJFvR2Jcz21-5rvTqJtBSBQxMigUlOcXByMoXUTxU9LW0-hgG0wzPoEdT1vteZ9g2S7P6mAmeAxg4cI5cUi-L02a&usqp=CAc",
  },
  {
    name: "Sauvage",
    brand: "Dior",
    price: 145,
    volume: 100,
    description:
      "A raw and noble fragrance inspired by wide open spaces and wild nature.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Spicy"],
    popular: true,
    image:
      "https://cdn.notinoimg.com/detail_main_lq/dior/3348901786997_05/sauvage-elixir___250902.jpg",
  },
  {
    name: "Acqua di Gio",
    brand: "Giorgio Armani",
    price: 119,
    volume: 100,
    description:
      "Inspired by the Mediterranean sea. A timeless aquatic fragrance that evokes freedom and nature.",
    categories: ["Men"],
    notes: ["Citrus", "Fresh", "Woody"],
    popular: false,
    image: "https://cdn.deloox.com/cdn/product/1243435/524514_500.jpg",
  },
  {
    name: "Polo Black",
    brand: "Ralph Lauren",
    price: 89,
    volume: 125,
    description:
      "A mysterious and seductive fragrance with a dark, woody character.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Musky"],
    popular: false,
    image: "https://i.makeup.se/o/o9/o9evyolcd8yi.jpg",
  },
  {
    name: "Drakkar Noir",
    brand: "Guy Laroche",
    price: 69,
    volume: 100,
    description:
      "A bold, aromatic fougere fragrance that defined masculinity in the 1980s.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Fresh"],
    popular: false,
    image: "https://i.ebayimg.com/images/g/2eoAAeSwrWhpn0dD/s-l1200.jpg",
  },
  {
    name: "Terre d'Hermès",
    brand: "Hermès",
    price: 159,
    volume: 100,
    description:
      "A meditation on the relationship between man and earth. Woody, mineral and vibrant.",
    categories: ["Men"],
    notes: ["Woody", "Citrus", "Spicy"],
    popular: true,
    image:
      "https://dynamic.zacdn.com/d-NGs5TD70TLiLj_ZFmdoOeBZzQ=/filters:quality(70):format(webp)/https://static-hk.zacdn.com/p/hermes-7825-5217206-3.jpg",
  },
  {
    name: "Fahrenheit",
    brand: "Dior",
    price: 109,
    volume: 100,
    description:
      "An original, daring and unconventional fragrance. The ultimate masculine statement.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Musky"],
    popular: false,
    image:
      "https://finalchoice.com.pk/cdn/shop/files/1_ad8b5e72-f879-47cf-81e6-e3ba484351b7.webp?v=1743006851",
  },
  {
    name: "Invictus",
    brand: "Paco Rabanne",
    price: 109,
    volume: 100,
    description: "A victorious marine fragrance for the unstoppable champion.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Musky"],
    popular: true,
    image:
      "https://cdn.cocopanda.se/Media/Product/Image/750/e269da48-55d2-4a7e-a000-aeb3b92b1ea2_47.jpeg",
  },
  {
    name: "1 Million",
    brand: "Paco Rabanne",
    price: 115,
    volume: 100,
    description:
      "An irresistible, seductive fragrance inspired by precious metals and spices.",
    categories: ["Men"],
    notes: ["Spicy", "Amber", "Woody"],
    popular: true,
    image:
      "https://media.sephora.eu/content/dam/digital/pim/published/R/RABANNE_FRAGRANCES/P70703/7808-media_3-2.jpg?scaleWidth=750&scaleHeight=750&scaleMode=fit",
  },
  {
    name: "Eros",
    brand: "Versace",
    price: 105,
    volume: 100,
    description:
      "An intense, passionate fragrance inspired by the Greek god of love.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Spicy"],
    popular: false,
    image:
      "https://www.nordicfeel.com/storage/5F214B6C29CCD10E987DC8684D103E766E2074AA81A56E718EF7D0CC2384381D/ad637bdae4de429385af09d83e46af85/jpg/media/5b55028ab77c44368afa0201cdd68a06/Y-11292.jpg",
  },
  {
    name: "Dylan Blue",
    brand: "Versace",
    price: 99,
    volume: 100,
    description:
      "A modern aquatic fragrance embodying the Mediterranean spirit and masculine energy.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Musky"],
    popular: false,
    image:
      "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Library-Sites-ver-library/default/dw9e578a43/images/world-of-versace/fragrances/DYLAN-BLUE-HUMME-02-01-img-150920-mob.jpg",
  },
  {
    name: "Allure Homme Sport",
    brand: "Chanel",
    price: 129,
    volume: 100,
    description: "An energetic, fresh fragrance for the modern, active man.",
    categories: ["Men"],
    notes: ["Citrus", "Fresh", "Woody"],
    popular: false,
    image:
      "https://www.chanel.com/puls-img/1734008572839-onepdpeditopushdesktopmobile01974x1298px1jpg_1298x974.jpg",
  },
  {
    name: "Le Male",
    brand: "Jean Paul Gaultier",
    price: 99,
    volume: 125,
    description:
      "A classic masculine fragrance combining lavender and vanilla in perfect harmony.",
    categories: ["Men"],
    notes: ["Lavender", "Vanilla", "Musky"],
    popular: true,
    image:
      "https://res.cloudinary.com/dxxvmvvyj/image/upload/t_ahlens-transformations/c_fit,w_3840/f_auto/q_auto/v1/products/84/35/41/8435415114363_6.jpg?_a=BAVMn6ID0",
  },
  {
    name: "Boss Bottled",
    brand: "Hugo Boss",
    price: 89,
    volume: 100,
    description:
      "A sophisticated and confident fragrance for the modern gentleman.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Vanilla"],
    popular: false,
    image:
      "https://distcdn.nicehair.dk/products/88773/hugo-boss-bottled-for-men-edp-200-ml-1734072565.webp",
  },
  {
    name: "Hugo",
    brand: "Hugo Boss",
    price: 79,
    volume: 125,
    description:
      "A fresh, green fragrance that captures the spirit of the free-thinking individual.",
    categories: ["Men"],
    notes: ["Fresh", "Citrus", "Woody"],
    popular: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5NOunJcew038-9GuNmkhPJV-nTV8My5jNsQ&s",
  },
  {
    name: "Polo Blue",
    brand: "Ralph Lauren",
    price: 89,
    volume: 125,
    description:
      "A fresh aquatic fragrance inspired by wide open skies and the freedom of nature.",
    categories: ["Men"],
    notes: ["Fresh", "Citrus", "Woody"],
    popular: false,
    image: "https://www.harmoniq.se/image/190840/3360377022928_5.jpg",
  },
  {
    name: "Obsession",
    brand: "Calvin Klein",
    price: 79,
    volume: 125,
    description:
      "An intense oriental fragrance that captures passion and obsession.",
    categories: ["Men"],
    notes: ["Spicy", "Vanilla", "Musky"],
    popular: false,
    image:
      "https://nuochoamc.com/upload/images/bai-viet/427/review-nuoc-hoa-calvin-klein-obsession-for-men.webp",
  },
  {
    name: "Platinum Égoïste",
    brand: "Chanel",
    price: 119,
    volume: 100,
    description:
      "A sophisticated and refined woody aromatic fragrance for the discerning man.",
    categories: ["Men"],
    notes: ["Woody", "Lavender", "Musky"],
    popular: false,
    image:
      "https://parfumstaaltjes.be/cdn/shop/files/Parfumsamples_Noten_Chanel_Platinum_Egoiste_Eau_de_Toilette_4.webp?v=1767944977&width=1946",
  },
  {
    name: "Kouros",
    brand: "Yves Saint Laurent",
    price: 79,
    volume: 100,
    description:
      "A bold and powerful fougere fragrance. A timeless classic of masculine perfumery.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Musky"],
    popular: false,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJf-NBTesBPTvzT8cXGL-74elT0jvHLfjlg&s",
  },
  {
    name: "Acqua di Gio Profumo",
    brand: "Giorgio Armani",
    price: 149,
    volume: 75,
    description:
      "A darker, deeper interpretation of the iconic Acqua di Gio. Incense meets the sea.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Spicy"],
    popular: false,
    image:
      "https://i.etsystatic.com/66150090/r/il/ad91d6/8125858247/il_1588xN.8125858247_py1f.jpg",
  },
  {
    name: "Stronger With You",
    brand: "Emporio Armani",
    price: 99,
    volume: 100,
    description:
      "A warm, spicy fragrance celebrating the strength of modern love.",
    categories: ["Men"],
    notes: ["Spicy", "Vanilla", "Woody"],
    popular: false,
    image:
      "https://res.cloudinary.com/dxxvmvvyj/image/upload/t_ahlens-transformations/c_fit,w_3840/f_auto/q_auto/v1/products/36/14/27/86APD7M9OB_3614272225695_side.jpg?_a=BAVMn6ID0",
  },
  {
    name: "Explorer",
    brand: "Montblanc",
    price: 89,
    volume: 100,
    description:
      "A fresh, woody fragrance inspired by the spirit of exploration and adventure.",
    categories: ["Men"],
    notes: ["Fresh", "Woody", "Musky"],
    popular: false,
    image: "https://cdn.deloox.com/cdn/product/1185936/497139_768.jpg",
  },
  {
    name: "Gentleman",
    brand: "Givenchy",
    price: 99,
    volume: 100,
    description:
      "A refined and modern fragrance balancing iris and leather for the contemporary gentleman.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Musky"],
    popular: false,
    image:
      "https://cdn2.parfumdreams.de/image/product/110379-172761-0-8.webp?box=528",
  },
  {
    name: "Wanted",
    brand: "Azzaro",
    price: 85,
    volume: 100,
    description:
      "A warm, spicy western-inspired fragrance for the bold and daring man.",
    categories: ["Men"],
    notes: ["Spicy", "Woody", "Citrus"],
    popular: false,
    image:
      "https://you.se/image/cache/data/azzaro/azzaro-the-most-wanted-parfum-100ml-1200x1200.jpg",
  },
  {
    name: "Chrome",
    brand: "Azzaro",
    price: 75,
    volume: 100,
    description:
      "A fresh, clean aquatic fragrance that is effortlessly elegant and timeless.",
    categories: ["Men"],
    notes: ["Fresh", "Citrus", "Musky"],
    popular: false,
    image:
      "https://images.matas.dk/trs/w890//encode/3351500020386_20250306180207.jpg",
  },

  // ── UNISEX ──
  {
    name: "CK One",
    brand: "Calvin Klein",
    price: 79,
    volume: 100,
    description:
      "A shared fragrance for a man and a woman. Fresh, clean and modern.",
    categories: ["Unisex"],
    notes: ["Citrus", "Fresh", "Musky"],
    popular: false,
    image: "https://i.makeup.se/f/f1/f1lizsjxyrw8.jpg",
  },
  {
    name: "Molecule 01",
    brand: "Escentric Molecules",
    price: 189,
    volume: 100,
    description:
      "A single molecule fragrance. Reacts uniquely with each individual's skin chemistry.",
    categories: ["Unisex"],
    notes: ["Woody", "Musky"],
    popular: true,
    image:
      "https://shop.campomarzio70.it/cdn/shop/files/EM-Molecule-01-100ml-1-CM70.jpg?v=1740563655",
  },
  {
    name: "Acqua di Parma Colonia",
    brand: "Acqua di Parma",
    price: 179,
    volume: 100,
    description:
      "The original Italian cologne. A timeless symbol of elegance, style and culture.",
    categories: ["Unisex"],
    notes: ["Citrus", "Lavender", "Woody"],
    popular: false,
    image:
      "https://www.nk.se/globalassets/8028713000096_1_c.jpg?ref=0A888CD28E&w=640&format=jpg&quality=85",
  },
  {
    name: "Santal 33",
    brand: "Le Labo",
    price: 229,
    volume: 50,
    description:
      "An iconic woody fragrance evoking the wide open spaces of the American West.",
    categories: ["Unisex"],
    notes: ["Woody", "Sandalwood", "Musky"],
    popular: true,
    image:
      "https://www.nk.se/globalassets/811901022769.jpg?ref=4C738AF662&w=640&format=jpg&quality=85",
  },
  {
    name: "Neroli Portofino",
    brand: "Tom Ford",
    price: 259,
    volume: 50,
    description:
      "A vibrant citrus fragrance inspired by the sparkling Italian Riviera.",
    categories: ["Unisex"],
    notes: ["Citrus", "Fresh", "Floral"],
    popular: false,
    image:
      "https://www.spacenk.com/on/demandware.static/-/Sites-spacenkmastercatalog/default/dw69671ebc/products/TOM_FORD/UK200048475_TOM_FORD_2.jpg",
  },
  {
    name: "Black Orchid",
    brand: "Tom Ford",
    price: 249,
    volume: 50,
    description:
      "A luxurious and sensual fragrance combining black truffle, orchid and dark florals.",
    categories: ["Unisex"],
    notes: ["Floral", "Woody", "Spicy"],
    popular: true,
    image:
      "https://you.se/image/cache/data/parfym/tom-ford-black-orchid-edt-100ml-1200x1200.jpg",
  },
  {
    name: "Oud Wood",
    brand: "Tom Ford",
    price: 269,
    volume: 50,
    description:
      "A rare oud wood fragrance blending exotic spices, sandalwood and vetiver.",
    categories: ["Unisex"],
    notes: ["Woody", "Spicy", "Sandalwood"],
    popular: false,
    image: "https://www.nk.se/globalassets/888066050685.jpg?ref=CA0945C8D5",
  },
  {
    name: "Rose Prick",
    brand: "Tom Ford",
    price: 279,
    volume: 50,
    description:
      "A bold, thorny rose fragrance that captures the dramatic beauty of the rose.",
    categories: ["Unisex"],
    notes: ["Rose", "Spicy", "Woody"],
    popular: false,
    image:
      "https://e7cbb2c9-bb84-4880-8504-79f06f158221.svc.edge.scw.cloud/product/215410/detailsc.jpg",
  },
  {
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    price: 269,
    volume: 50,
    description:
      "A warm, rich oriental fragrance evoking the luxury of an English gentleman's club.",
    categories: ["Unisex"],
    notes: ["Vanilla", "Spicy", "Woody"],
    popular: false,
    image: "https://cdn2.parfumdreams.de/image/product/106419-166104-2-2.webp",
  },
  {
    name: "Aventus",
    brand: "Creed",
    price: 399,
    volume: 100,
    description:
      "A celebration of power, vision and success inspired by the life of Napoleon.",
    categories: ["Unisex"],
    notes: ["Citrus", "Woody", "Musky"],
    popular: true,
    image:
      "https://res.cloudinary.com/gentscloud/image/upload/f_auto/q_auto/upload/product_images/82/83882.png",
  },
  {
    name: "Silver Mountain Water",
    brand: "Creed",
    price: 359,
    volume: 100,
    description:
      "Inspired by the pure, clean mountain streams of the Swiss Alps.",
    categories: ["Unisex"],
    notes: ["Fresh", "Citrus", "Woody"],
    popular: false,
    image:
      "https://www.careofcarl.se/bilder/artiklar/600x600_grey_4_5/14364210.jpg",
  },
  {
    name: "Green Irish Tweed",
    brand: "Creed",
    price: 349,
    volume: 100,
    description:
      "A fresh, green aromatic fragrance inspired by the lush Irish countryside.",
    categories: ["Unisex"],
    notes: ["Fresh", "Woody", "Musky"],
    popular: false,
    image:
      "https://www.fridaycharm.com/cdn/shop/products/CreedGreenIrishTweed2_1800x1800.jpg?v=1679119313",
  },
  {
    name: "Babycrush",
    brand: "Escentric Molecules",
    price: 159,
    volume: 100,
    description:
      "A playful, transparent fragrance blending musks with soft floral notes.",
    categories: ["Unisex"],
    notes: ["Musky", "Floral", "Fresh"],
    popular: false,
    image:
      "https://www.escentric.com/cdn/shop/files/M01_200ml_Solo_St_On_Bottle_OnBaseLine.jpg?v=1752681903&width=533",
  },
  {
    name: "Replica Beach Walk",
    brand: "Maison Margiela",
    price: 179,
    volume: 100,
    description: "A sensory memory of a warm summer day by the beach.",
    categories: ["Unisex"],
    notes: ["Fresh", "Citrus", "Musky"],
    popular: true,
    image:
      "https://www.maisonmargiela-fragrances.us/on/demandware.static/-/Sites-maisonmargiela-us-Library/default/dw77210c2e/images/pdp/MM003/MM_THUMBNAIL_BW.jpg",
  },
  {
    name: "Replica By The Fireplace",
    brand: "Maison Margiela",
    price: 179,
    volume: 100,
    description:
      "The comforting warmth of a crackling fireplace on a cold winter evening.",
    categories: ["Unisex"],
    notes: ["Woody", "Vanilla", "Spicy"],
    popular: false,
    image:
      "https://cdn.notinoimg.com/social/maison-margiela/3614270562112_01-o/replica-by-the-fireplace___200306.jpg",
  },
  {
    name: "Replica Lazy Sunday Morning",
    brand: "Maison Margiela",
    price: 169,
    volume: 100,
    description:
      "The soft, clean scent of fresh linen on a lazy Sunday morning.",
    categories: ["Unisex"],
    notes: ["Fresh", "Floral", "Musky"],
    popular: false,
    image:
      "https://distcdn.nicehair.dk/products/102176/maison-margiela-replica-lazy-sunday-morning-edt-100-ml-1670484246.jpg",
  },
  {
    name: "Portrait of a Lady",
    brand: "Frédéric Malle",
    price: 289,
    volume: 50,
    description:
      "An iconic rose fragrance of extraordinary depth and sensuality.",
    categories: ["Unisex"],
    notes: ["Rose", "Woody", "Spicy"],
    popular: false,
    image:
      "https://cowparfymeri.se/cdn/shop/files/3218V10N_1.jpg?v=1770227259&width=2048",
  },
  {
    name: "Carnal Flower",
    brand: "Frédéric Malle",
    price: 299,
    volume: 50,
    description:
      "A stunning tuberose fragrance that is simultaneously lush and clean.",
    categories: ["Unisex"],
    notes: ["Floral", "Fresh", "Musky"],
    popular: false,
    image:
      "https://cowparfymeri.se/cdn/shop/files/3214V10N_1.jpg?v=1770226761&width=2048",
  },
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    price: 349,
    volume: 70,
    description:
      "A luminous floral-woody-amber fragrance of extraordinary radiance.",
    categories: ["Unisex"],
    notes: ["Floral", "Amber", "Woody"],
    popular: true,
    image:
      "https://senteursdailleurs.com/16798-large_default/baccarat-rouge-540--extrait-de-parfum.jpg",
  },
  {
    name: "Aqua Universalis",
    brand: "Maison Francis Kurkdjian",
    price: 229,
    volume: 70,
    description:
      "A sparkling clean fragrance inspired by the universal and timeless pleasure of cleanliness.",
    categories: ["Unisex"],
    notes: ["Fresh", "Floral", "Musky"],
    popular: false,
    image:
      "https://www.nk.se/globalassets/3700559612187_aqua_universalis_edt_70ml_ny1.png?ref=01E3E3B5D9&w=640&format=jpg&quality=85",
  },
  {
    name: "RoseOud",
    brand: "Maison Francis Kurkdjian",
    price: 279,
    volume: 70,
    description:
      "A modern interpretation of a traditional Eastern fragrance combining rose and oud.",
    categories: ["Unisex"],
    notes: ["Rose", "Woody", "Spicy"],
    popular: false,
    image:
      "https://www.lessenteurs.com/cdn/shop/products/maison-francis-kurkdjian-a-la-rose.jpg?v=1584024866",
  },
  {
    name: "Philosykos",
    brand: "Diptyque",
    price: 169,
    volume: 75,
    description:
      "An ode to the fig tree from roots to fruit, evoking a sun-drenched Greek orchard.",
    categories: ["Unisex"],
    notes: ["Fresh", "Woody", "Citrus"],
    popular: false,
    image:
      "https://www.myperfumeshop.qa/cdn/shop/products/diptyque-philosykos-edp-perfume-for-her-756901.jpg?v=1626238272&width=1200",
  },
  {
    name: "Tam Dao",
    brand: "Diptyque",
    price: 179,
    volume: 75,
    description:
      "A pure, smooth and creamy sandalwood fragrance inspired by the Vietnamese forests.",
    categories: ["Unisex"],
    notes: ["Woody", "Sandalwood", "Musky"],
    popular: false,
    image: "https://www.nk.se/globalassets/gl4wevtu.jpeg?ref=6F76DC9A6E",
  },
  {
    name: "Eau Capitale",
    brand: "Diptyque",
    price: 169,
    volume: 75,
    description:
      "A rich yet fresh rose fragrance capturing the spirit of Paris in springtime.",
    categories: ["Unisex"],
    notes: ["Rose", "Woody", "Musky"],
    popular: false,
    image:
      "https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/d/i/diptyque-unisex-eau-capitale-edp-spray-25-oz-fragrances-3700431442994_4.jpg?width=800&height=800",
  },
  {
    name: "Wonderoud",
    brand: "Diptyque",
    price: 199,
    volume: 75,
    description:
      "An oud fragrance that blends the raw intensity of oud with delicate floral notes.",
    categories: ["Unisex"],
    notes: ["Woody", "Floral", "Spicy"],
    popular: false,
    image:
      "https://emea.diptyqueparis.com/cdn/shop/files/LECTURE_VISUEL_ORPHEON-EDP-75ML_2024_RVB_HD_2025_x_1518_DIPTYQUE__1.avif?v=1776327357&width=1000",
  },
  {
    name: "Dans Tes Bras",
    brand: "Frédéric Malle",
    price: 259,
    volume: 50,
    description:
      "A fresh, intimate fragrance evoking the tender feeling of being held close.",
    categories: ["Unisex"],
    notes: ["Fresh", "Musky", "Floral"],
    popular: false,
    image:
      "https://cowparfymeri.se/cdn/shop/files/3216V10N_1.jpg?v=1770226835&width=2048",
  },
  {
    name: "Noir de Noir",
    brand: "Tom Ford",
    price: 279,
    volume: 50,
    description:
      "A rich and decadent rose and oud fragrance. Dark, sensual and mysterious.",
    categories: ["Unisex"],
    notes: ["Rose", "Woody", "Vanilla"],
    popular: false,
    image:
      "https://media.ahlens.se/image/upload/f_auto,t_ProductListLarge/products/bg_removed/08/88/06/74APJOJ2P8_0888066004480_front.jpg",
  },
  {
    name: "Jasmin Rouge",
    brand: "Tom Ford",
    price: 259,
    volume: 50,
    description:
      "A spicy floral fragrance built around the intoxicating scent of jasmine.",
    categories: ["Unisex"],
    notes: ["Jasmine", "Spicy", "Musky"],
    popular: false,
    image: "https://pricespy-75b8.kxcdn.com/product/standard/800/1206632.jpg",
  },
  {
    name: "Ambre Nuit",
    brand: "Dior",
    price: 229,
    volume: 125,
    description:
      "A romantic amber rose fragrance from the La Collection Privée.",
    categories: ["Unisex"],
    notes: ["Rose", "Amber", "Woody"],
    popular: false,
    image: "https://fimgs.net/mdimg/perfume/social.7092.jpg",
  },
  {
    name: "Eau Sauvage",
    brand: "Dior",
    price: 109,
    volume: 100,
    description:
      "The original fresh citrus fragrance. A timeless classic of modern perfumery.",
    categories: ["Unisex"],
    notes: ["Citrus", "Fresh", "Woody"],
    popular: false,
    image:
      "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw04a48a71/Y0896220/Y0896220_F089624009_E01_RHC.jpg?sw=800",
  },
  {
    name: "Diorissimo",
    brand: "Dior",
    price: 119,
    volume: 100,
    description:
      "A delicate lily of the valley fragrance capturing the essence of spring.",
    categories: ["Unisex"],
    notes: ["Floral", "Fresh", "Musky"],
    popular: false,
    image:
      "https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw451aacd9/Y0064201/Y0064201_F006424909_E01_RHC.jpg?sw=1024",
  },
  {
    name: "N°5",
    brand: "Chanel",
    price: 169,
    volume: 100,
    description:
      "The world's most iconic fragrance. A timeless floral aldehyde of extraordinary elegance.",
    categories: ["Unisex"],
    notes: ["Floral", "Jasmine", "Vanilla"],
    popular: true,
    image:
      "https://www.chanel.com/images/t_one/w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/n-5-eau-de-parfum-spray-3-4fl-oz--packshot-default-125530-9564912943134.jpg",
  },
  {
    name: "Chance Eau Tendre",
    brand: "Chanel",
    price: 145,
    volume: 100,
    description:
      "A delicate, airy floral fragrance with a watery freshness and a hint of sweetness.",
    categories: ["Unisex"],
    notes: ["Fresh", "Floral", "Musky"],
    popular: false,
    image:
      "https://images.unsplash.com/photo-1588177925144-2fd3e4e7ce57?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "L'Eau d'Issey",
    brand: "Issey Miyake",
    price: 89,
    volume: 100,
    description:
      "A clean aquatic fragrance inspired by the purity and freshness of water.",
    categories: ["Unisex"],
    notes: ["Fresh", "Floral", "Musky"],
    popular: false,
    image: "https://m.media-amazon.com/images/I/61yYc27VBBL.jpg",
  },
  {
    name: "A*Men",
    brand: "Thierry Mugler",
    price: 99,
    volume: 100,
    description:
      "A bold oriental fragrance combining coffee, patchouli and caramel.",
    categories: ["Unisex"],
    notes: ["Sweet", "Woody", "Spicy"],
    popular: false,
    image:
      "https://images.matas.dk/trs/w890//encode/3614274126884_20250826132200.jpg",
  },
  {
    name: "Eau des Merveilles",
    brand: "Hermès",
    price: 149,
    volume: 100,
    description:
      "A woody amber fragrance inspired by the mystery of the night sky.",
    categories: ["Unisex"],
    notes: ["Woody", "Amber", "Musky"],
    popular: false,
    image:
      "https://assets.hermes.com/is/image/hermesproduct/eau-des-merveilles-eau-de-toilette--107290V0-worn-2-0-0-800-800_g.jpg",
  },
  {
    name: "Un Jardin sur le Nil",
    brand: "Hermès",
    price: 139,
    volume: 100,
    description:
      "A green floral fragrance inspired by a garden on the banks of the Nile.",
    categories: ["Unisex"],
    notes: ["Fresh", "Floral", "Citrus"],
    popular: false,
    image:
      "https://assets.hermes.com/is/image/hermesproduct/un-jardin-sur-le-nil-eau-de-toilette--26993-worn-2-0-0-1000-1000_g.jpg",
  },
  {
    name: "Vetiver",
    brand: "Hermès",
    price: 129,
    volume: 100,
    description:
      "A woody earthy fragrance celebrating the noble vetiver plant.",
    categories: ["Unisex"],
    notes: ["Woody", "Fresh", "Musky"],
    popular: false,
    image:
      "https://assets.hermes.com/is/image/hermesproduct/terre-d-hermes-eau-intense-vetiver-eau-de-parfum--40946-front-wm-1-0-0-800-800_g.jpg",
  },
  {
    name: "Versace Pour Homme",
    brand: "Versace",
    price: 95,
    volume: 100,
    description:
      "A fresh Mediterranean fragrance inspired by the harmony between man and nature.",
    categories: ["Men"],
    notes: ["Citrus", "Fresh", "Woody"],
    popular: false,
    image:
      "https://cdn.cocopanda.se/Media/Product/Image/900/b1be2b6b-0176-4327-afcc-6dbf655dac09_5.jpeg",
  },
  {
    name: "Guilty",
    brand: "Gucci",
    price: 109,
    volume: 90,
    description:
      "A modern floral oriental fragrance for the woman who breaks the rules.",
    categories: ["Women"],
    notes: ["Floral", "Spicy", "Musky"],
    popular: false,
    image:
      "https://images.matas.dk/trs/w730//encode/3616301794608_20251106123400.jpg",
  },
  {
    name: "The One",
    brand: "Dolce & Gabbana",
    price: 115,
    volume: 100,
    description:
      "A sensual oriental fragrance combining tobacco, amber and warm spices.",
    categories: ["Men"],
    notes: ["Spicy", "Amber", "Woody"],
    popular: false,
    image:
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/resize-w:1024/dolce-gabbana/8L128ZFMCJ2-2/0/uow8CNk0J_-1.jpg",
  },
  {
    name: "Light Blue",
    brand: "Dolce & Gabbana",
    price: 99,
    volume: 100,
    description:
      "A fresh citrus fragrance inspired by the beauty of the Sicilian summer.",
    categories: ["Women"],
    notes: ["Citrus", "Fresh", "Musky"],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1720414913669-87031493d7c9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Envy Me",
    brand: "Gucci",
    price: 89,
    volume: 100,
    description:
      "A playful and sensual floral fragrance built around the seductive rose.",
    categories: ["Women"],
    notes: ["Rose", "Floral", "Musky"],
    popular: false,
    image:
      "https://static2.sabinacdn.com/8122-thickbox_default/envy-me-gucci.jpg",
  },
  {
    name: "Burberry Her",
    brand: "Burberry",
    price: 109,
    volume: 100,
    description:
      "A fruity floral fragrance capturing the energy and spirit of London.",
    categories: ["Women"],
    notes: ["Floral", "Fresh", "Musky"],
    popular: false,
    image:
      "https://media.sephora.eu/content/dam/digital/pim/published/B/BURBERRY/449590/97370-media_swatch.jpeg",
  },
  {
    name: "Mr. Burberry",
    brand: "Burberry",
    price: 105,
    volume: 100,
    description:
      "A modern woody aromatic fragrance inspired by the spirit of London.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Fresh"],
    popular: false,
    image:
      "https://distcdn.nicehair.dk/products/70623/burberry-mr-burberry-for-him-edt-100-ml-1629808281.jpg",
  },
  {
    name: "Prada L'Homme",
    brand: "Prada",
    price: 119,
    volume: 100,
    description:
      "A refined and minimalist iris fragrance for the understated modern man.",
    categories: ["Men"],
    notes: ["Woody", "Fresh", "Musky"],
    popular: false,
    image:
      "https://distcdn.nicehair.dk/products/74052/prada-lhomme-edt-100-ml-1643617501.jpg",
  },
  {
    name: "Prada Candy",
    brand: "Prada",
    price: 115,
    volume: 80,
    description:
      "A sweet and irresistible fragrance combining caramel, musk and benzoin.",
    categories: ["Women"],
    notes: ["Sweet", "Vanilla", "Musky"],
    popular: false,
    image:
      "https://www.daisybeauty.com/wp-content/uploads/2021/11/1B5C3A88-F50E-4D36-9554-DC27353564D5-1024x768.jpeg.webp",
  },
  {
    name: "Valentino Uomo",
    brand: "Valentino",
    price: 109,
    volume: 100,
    description:
      "A sophisticated leather and iris fragrance for the refined Italian gentleman.",
    categories: ["Men"],
    notes: ["Woody", "Spicy", "Vanilla"],
    popular: false,
    image:
      "https://images.unsplash.com/photo-1705338670422-01133208eab9?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Valentino Donna",
    brand: "Valentino",
    price: 115,
    volume: 100,
    description:
      "A modern rose fragrance with a luxurious and sensual character.",
    categories: ["Women"],
    notes: ["Rose", "Vanilla", "Musky"],
    popular: false,
    image:
      "https://images.unsplash.com/photo-1724271859348-bad4e179d65d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Libre",
    brand: "Yves Saint Laurent",
    price: 135,
    volume: 90,
    description:
      "A floral fougere fragrance celebrating freedom and femininity.",
    categories: ["Women"],
    notes: ["Lavender", "Floral", "Vanilla"],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1723391962166-6d9bb8a3d3e7?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// testanvändare
// Ska kunna logga in med username: "user", password: "password"
const testUser = {
  firstName: "Test",
  lastName: "User",
  username: "user",
  email: "user@aura.com",
  password: "password", // hashas nedan innan sparning
};

// seed funktion
const seed = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected!");

    // Rensar befintlig data så vi inte får dubbletter vid omseed
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Old data cleared.");

    // Skapar produkter
    await Product.insertMany(products);
    console.log(`${products.length} products inserted.`);

    // Hashar lösenordet innan vi sparar användaren
    // bcrypt.hash(lösenord, saltRounds) – 10 är ett bra standardvärde
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({ ...testUser, password: hashedPassword });
    console.log("Test user created: username='user', password='password'");

    console.log("Seed complete!");
    process.exit(0); // Avslutar scriptet framgångsrikt
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
