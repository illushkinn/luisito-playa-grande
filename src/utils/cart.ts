export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category: string;
}

export interface OrderDetails {
  items: CartItem[];
  type: "delivery" | "takeaway";
  address: string;
  notes: string;
  phone: string;
}

const PHONE_NUMBER = "5492235440230";
const STORAGE_KEY = "luisito-cart";

export function getCart(): CartItem[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function updateQty(id: string, qty: number): CartItem[] {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    if (qty <= 0) return removeFromCart(id);
    item.qty = qty;
  }
  saveCart(cart);
  return cart;
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function clearCart(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function generateWhatsAppMessage(order: OrderDetails): string {
  let msg = "¡Hola Luisito! 🥟 Quiero hacer un pedido:\n\n";

  order.items.forEach((item) => {
    msg += `• ${item.qty} x ${item.name} = $${(item.price * item.qty).toLocaleString("es-AR")}\n`;
  });

  const total = getCartTotal(order.items);
  msg += `\n━━━━━━━━━━━━━━━━━\n*TOTAL: $${total.toLocaleString("es-AR")}*\n`;

  if (order.type === "delivery") {
    msg += `📍 *Delivery* a: ${order.address}\n`;
  } else {
    msg += "🏪 *Take away* — paso a buscar\n";
  }

  if (order.notes) {
    msg += `📝 Nota: ${order.notes}\n`;
  }

  return encodeURIComponent(msg);
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
  window.open(url, "_blank");
}

export const MENU_ITEMS = [
  // Platos
  { id: "milanesa-napolitana", name: "Milanesa Napolitana", price: 4500, category: "platos" },
  { id: "milanesa-fugazzeta", name: "Milanesa Fugazzeta", price: 4200, category: "platos" },
  { id: "milanesa-clasica", name: "Milanesa Clásica", price: 3800, category: "platos" },
  { id: "lomo-completo", name: "Lomo Completo", price: 5500, category: "platos" },
  { id: "hamburguesa-completa", name: "Hamburguesa Completa", price: 3500, category: "platos" },
  { id: "papas-fritas", name: "Papas Fritas", price: 1800, category: "platos" },
  // Pizzas
  { id: "pizza-muzzarella", name: "Pizza Muzzarella", price: 3500, category: "pizzas" },
  { id: "pizza-napolitana", name: "Pizza Napolitana", price: 4000, category: "pizzas" },
  { id: "pizza-fugazzeta", name: "Pizza Fugazzeta", price: 4200, category: "pizzas" },
  { id: "pizza-especial", name: "Pizza Especial (jamón y morrones)", price: 4800, category: "pizzas" },
  { id: "pizza-calabresa", name: "Pizza Calabresa", price: 4500, category: "pizzas" },
  // Empanadas
  { id: "empanada-carne", name: "Empanada de Carne", price: 600, category: "empanadas" },
  { id: "empanada-pollo", name: "Empanada de Pollo", price: 600, category: "empanadas" },
  { id: "empanada-jyq", name: "Empanada de Jamón y Queso", price: 600, category: "empanadas" },
  { id: "empanada-verdura", name: "Empanada de Verdura", price: 550, category: "empanadas" },
  { id: "empanada-caprese", name: "Empanada Caprese", price: 650, category: "empanadas" },
  // Bebidas
  { id: "coca-cola", name: "Coca-Cola 500ml", price: 800, category: "bebidas" },
  { id: "coca-cola-light", name: "Coca-Cola Light 500ml", price: 800, category: "bebidas" },
  { id: "agua-mineral", name: "Agua Mineral 500ml", price: 600, category: "bebidas" },
  { id: "cerveza-quilmes", name: "Cerveza Quilmes 473ml", price: 1200, category: "bebidas" },
  { id: "cerveza-stella", name: "Cerveza Stella Artois 473ml", price: 1400, category: "bebidas" },
  // Postres
  { id: "flan-con-dulce", name: "Flan con Dulce de Leche", price: 1500, category: "postres" },
  { id: "budin-de-pan", name: "Budín de Pan", price: 1200, category: "postres" },
  { id: "ensalada-frutas", name: "Ensalada de Frutas", price: 1300, category: "postres" },
  { id: "helado-dos-sabores", name: "Helado 2 Sabores 1/4", price: 1800, category: "postres" },
];
