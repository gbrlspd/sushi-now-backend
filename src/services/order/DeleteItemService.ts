import prismaClient from '../../prisma';

interface IItemRequest {
  item_id: string
}

class DeleteItemService {
  async execute({item_id}: IItemRequest) {
    const order = await prismaClient.item.delete({
      where: { id: item_id }
    })
    return order;
  }
}

export { DeleteItemService };