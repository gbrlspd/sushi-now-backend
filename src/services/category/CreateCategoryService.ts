import prismaClient from '../../prisma';

interface ICategoryRequest {
  name: string
}

class CreateCategoryService {
  async execute({name}: ICategoryRequest) {

    if(!name) {
    	throw new Error('Invalid category name');
    }

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name: name }
    });

    if(categoryAlreadyExists) {
      throw new Error('Category already registered');
    }

    const category = prismaClient.category.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true
      }
    });

    return category;
  }
}

export { CreateCategoryService };