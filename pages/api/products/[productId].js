import connectMongo from '../../../database/dbconnection';
import {
  deleteProduct,
  getProductById,
  putProduct,
} from '../../../controller/product';

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the Connection' })
  );

  // type of request
  const {
    method,
    query: { ProductId },
  } = req;

  switch (method) {
    case 'GET':
      getProductById(req, res);
      break;
    case 'PUT':
      putProduct(req, res);
      break;
    case 'DELETE':
      deleteProduct(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
      break;
  }
}
