export const initialProducts = Array.from({ length: 10000 }, (_, i) => ({
  id: String(i + 1),
  title: `Product ${i + 1}`,
  price: Math.round(5 + Math.random() * 995),
   category: ['Phones', 'Laptops', 'Audio', 'Accessories','Monitor','Smart Watch','Bluetooth Speakers','Camera'][i % 8],
}));