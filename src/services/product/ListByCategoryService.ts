import prismaClient from '../../prisma';

interface IProductRequest {
  category_id: string
}

class ListByCategoryService {
  async execute({category_id}: IProductRequest) {
    const listByCategory = await prismaClient.product.findMany({
      where: { category_id: category_id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true
      }
    })
    return listByCategory;
  }
}

export { ListByCategoryService };