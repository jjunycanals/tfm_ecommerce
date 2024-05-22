export class Product {
  id: number;
  product_number: number;
  name: string;
  description: string;
  features: string;
  size: string;
  price: number;
  images: string;
  product_size: string;
  short_message: string;

  constructor(
    id: number,
    product_number: number,
    name: string,
    description: string,
    features: string,
    size: string,
    price: number,
    images: string,
    product_size: string,
    short_message: string
  ) {
    this.id = id;
    this.product_number = product_number;
    this.name = name;
    this.description = description;
    this.features = features;
    this.size = size;
    this.price = price;
    this.images = images;
    this.product_size = product_size;
    this.short_message = short_message;
  }
}
