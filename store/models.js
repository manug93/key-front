// Define the cookie name and expiration (in days)
const COOKIE_NAME = 'myCart';
const COOKIE_EXPIRATION = 30;

// Function to serialize cart data to a cookie string
const serializeCart = function (cart) {
  return JSON.stringify(cart);
}

// Function to deserialize cookie string to cart data
const deserializeCart = function (cookie) {
  let dt = JSON.parse(cookie);
  return dt;
}

// Function to set cart cookie
const setCartCookie = function (cart) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + COOKIE_EXPIRATION * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_NAME}=${serializeCart(cart)}; expires=${expirationDate.toUTCString()}; path=/`;
}

// Function to get cart from cookie
const getCartFromCookie = function () {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${COOKIE_NAME}=`)) {
      return deserializeCart(cookie.substring(`${COOKIE_NAME}=`.length));
    }
  }
  return {};
}


export class Plan {
  constructor(data = {}) {
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.price = data?.price;
    this.subscriptions = data?.subscriptions || [];
    this.createdAt = data?.createdAt;
    this.duration = data?.duration;
  }


}

class ItemBase {
  constructor(data) {
    this.title = data?.title;
    this.description = data?.description || null;
  }
}

class ItemCreate extends ItemBase {
  constructor(data) {
    super(data);
  }
}

class Item extends ItemBase {
  constructor(data) {
    super(data);
    this.id = data?.id;
    this.owner_id = data?.owner_id;
  }
}

class UserBase {
  constructor(data) {
    this.email = data?.email;
  }
}

class UserCreate extends UserBase {
  constructor(data) {
    super(data);
    this.username = data?.username;
    this.password = data?.password;
  }
}
export class RegistrationForm {
  constructor(data) {
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.enterpriseName = data?.enterpriseName;
    this.country = data?.country;
    this.street = data?.street;
    this.building = data?.building;
    this.city = data?.city;
    this.region = data?.region;
    this.postalCode = data?.postalCode;
    this.phone = data?.phone;
    this.email = data?.email;
    this.password = data?.password;
    this.notes = data?.notes;
  }

}

export class Address {
  constructor(addressData = {}) {
    this.street = addressData?.street || null;
    this.unit = addressData?.unit || null;
    this.city = addressData?.city || null;
    this.stateProv = addressData?.stateProv || null;
    this.country = addressData?.country || null;
    this.postalCode = addressData?.postalCode || null;
  }
}

export class Key {
  constructor(keyData = {}) {
    this.name = keyData?.name || null;
    this.description = keyData?.description || null;
    this.serialNumber = keyData?.serialNumber || null;
    this.notes = keyData?.notes || null;
    this.address = new Address(keyData?.address);
    this.id = keyData?.id ?? null;
    this.code = keyData?.code ?? null;
    this.defaultAccessStartTime = keyData?.defaultAccessStartTime ?? 0;
    this.organization = keyData?.organization ?? {};
    this.owner = keyData?.owner ?? {};
    this.currentLocation = keyData?.currentLocation ?? {};
    this.defaultAccessEndTime = keyData?.defaultAccessEndTime ?? 0;
    this.homeLocation = new HomeLocation(keyData?.homeLocation);
    this.virtual = keyData?.virtual ?? false;
    this.serialNumber = keyData?.serialNumber ?? '';
  }
}
class HomeLocation {
  constructor(id){
    this.id=id
  }
}


export class User extends UserBase {
  constructor(data) {
    super(data);
    this.id = data?.id;
    this.username = data?.username;
    this.firstname = data?.firstname;
    this.lastname = data?.lastname;
    this.email = data?.email;
    this.phone = data?.phone;
    this.country = data?.country;
    this.organization = data?.organization;
    this.is_active = data?.is_active;
    this.roles = data?.roles;
    this.items = data?.items || [];
  }
  get is_admin() {
    return this.roles.contains("ROLE_ADMIN")
  }
  get is_colab() {
    return this.roles.contains("ROLE_COLAB")
  }
}

class FileItemBase {
  constructor(data) {
    this.name = data?.name;
    this.relative_path = data?.relative_path || null;
    this.dir = data?.dir;
  }
}

export class FileItem extends FileItemBase {
  constructor(data) {
    super(data);
    this.full_path = data?.full_path;
    this.workspace_id = data?.workspace_id || null;
  }
}

export class Token {
  constructor(data) {
    this.access_token = data?.access_token;
    this.token_type = data?.token_type;
  }
}

export class Coupon {
  constructor(data) {
    this.code = data?.code;
    this.expire = data?.expire;
    this.type = data?.type;
    this.reduction = data?.reduction;
    this.issuer = data?.issuer;
    this.applied = data?.applied;
  }
}
export class CartItem {
  constructor(data) {
    this.id = data?.id;
    this.name = data?.name;
    this.prix = data?.prix;
    this.additionalUserCost = data?.additionalUserCost;
    this.additionalUser = data?.additionalUser;
    this.deploiement = data?.deploiement;
    this.integration = data?.integration;
    this.image = data?.image;
    this.quantity = data?.quantity;
    this.annual = data?.annual;
  }
  get fullname() {
    return this.name + ((this.annual) ? " annuelle" : " mensuelle")
  }
  calculateIntFee() {
    if (this.additionalUser > 0 && this.additionalUser < 6) {
      return 300000;
    } else if (this.additionalUser > 5 && this.additionalUser < 11) {
      return 600000;
    } else if (this.additionalUser > 10 && this.additionalUser < 16) {
      return 1500000;
    }
    else {
      return 0
    }
  }
  getPrix() {
    return (this.annual) ? (12 * this.prix) - (12 * this.prix) / 10 : this.prix;
  }
  totalPrice() {
    return this.getPrix() * this.quantity + this.calculateIntFee() + this.additionalUser * this.additionalUserCost
  }
}

// Define the cart management library
export class Cart {
  constructor() {
    // Initialize cart data from cookie or an empty object
    this.data = getCartFromCookie() || {};
    Object.values(this.data).forEach((e) => {
      this.data[e.id] = new CartItem(e);
    })

  }
  //Get all items
  getAllItems() {
    return Object.values(this.data);
  }

  // Add an item to the cart
  addItem(item) {
    this.data[item.id] = { ...item };
    setCartCookie(this.data);
  }

  // Update the quantity of an item in the cart
  updateItemQuantity(itemId, quantity) {
    if (!this.data[itemId]) {
      throw new Error(`Item with ID ${itemId} not found in cart.`);
    }
    this.data[itemId].quantity = quantity;
    setCartCookie(this.data);
  }

  // Remove an item from the cart
  removeItem(itemId) {
    delete this.data[itemId];
    setCartCookie(this.data);
  }

  // Get the total number of items in the cart
  getTotalItems() {
    let total = 0;
    for (const item of Object.values(this.data)) {
      total += item.quantity;
    }
    return total;
  }

  // Get the total price of items in the cart
  getTotalPrice() {
    let total = 0;
    for (const item of Object.values(this.data)) {
      total += item.totalPrice();
    }
    return total;
  }
}

 // Export the Cart class and utility functions

