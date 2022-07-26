import { Request, Response } from 'express';
import { ListCategoriesService } from '../../services/category/ListCategoriesService';

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategory = new ListCategoriesService();
    const categories = await listCategory.execute();
    return res.json(categories);
  }
}

export { ListCategoriesController };