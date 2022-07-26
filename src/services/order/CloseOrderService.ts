import prismaClient from '../../prisma';

interface IOrderRequest {
  order_id: string
}

class CloseOrderService {
  async execute({order_id}: IOrderRequest) {
    const order = await prismaClient.order.update({
      where: { id: order_id },
      data: { status: true }
    })
    return order;
  }
}

export { CloseOrderService }