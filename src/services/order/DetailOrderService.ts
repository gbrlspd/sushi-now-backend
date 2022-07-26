import prismaClient from '../../prisma';

interface IDetailRequest {
  order_id: string
}

class DetailOrderService {
  async execute({order_id}: IDetailRequest) {
    const order = await prismaClient.item.findMany({
      where: { order_id: order_id },
      include: { product: true, order: true }
    })
    return order;
  }
}

export { DetailOrderService };