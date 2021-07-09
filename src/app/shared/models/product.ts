export type product = {
  type: string, // Men || Women
  title: string,
  description: string,
  brand: {
    brand_id: string,
    brand_Name: string,
  },
  collections: [], //  new products, tranding , on sale
  category: {
    category_id: string,
    category_Name: string,
  },
  sale: boolean,
  discount: number,
  stock: number,
  new: boolean,
  tags: [],
  Watch_Case_Shape: string,
  Glass: string,
  Watch_Feature: [],
  Model: string,
  Dial_Size: string,
  Watch_Case_Size: string,
  Movement: string,
  Watch_Movement_Country: string,
  Strap_Material: string,
  water_resistance: boolean,
  Color_Family: [],
  variants: [
    {
      id: string,
      Availability: boolean,
      Watch_Strap_Color: string,
      Price: number,
      Special_Price: number,
      Quantity: number,
      images: [
        {
          isThumbnail: {
            type: Boolean,
            default: false,
          },
          image_url: string,
        },
      ],
    },
  ],
  Warranty: {
    isWarranty: boolean,
    warrantyPeriod: number,
  }
};
