import prismaClient from '../../prisma';

interface IProductRequest {
  name: string,
  price: string,
  description: string,
  banner: string,
  category_id: string
}

class CreateProductService {
  async execute({ name, price, description, banner, category_id }: IProductRequest) {
    
    if(!name || !price || !category_id) {
      throw new Error('Invalid product');
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: { name: name }
    });

    if(productAlreadyExists) {
      throw new Error('Product already registered');
    }
    
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id
      }
    });

    return product;
  }
}

export { CreateProductService };