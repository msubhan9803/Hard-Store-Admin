export type product = {
  title: string,
  categoryId: string,
  description: string,
  brand: string,
  collections: [],
  tags: [],
  sale: boolean,
  new: boolean,
  price: number,
  discount: number,
  quantity: number,
  images: [
    {
      URL: String,
      ImageName: String,
      IsThmubnail: boolean
    }
  ]
};
