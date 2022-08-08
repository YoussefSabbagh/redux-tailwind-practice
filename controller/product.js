/** Controller */
import Products from '../models/product';

/**  GET ALL PRODUCTS
 * get : http://localhost:3000/api/products
 */
export async function getProducts(req, res) {
  try {
    const products = await Products.find({});

    if (!products)
      return res.status(404).json({
        error: 'Data not Found',
        status: '404',
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Data' });
  }
}

/**  GET PRODUCT BY PRODUCTID
 *   get : http://localhost:3000/api/products/1
 */
export async function getProductById(req, res) {
  try {
    const { productId } = req.query;

    const product = await Products.findById(productId);

    if (product) res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: 'Error While fetching the Data...!' });
  }
}

/**  CREATE PRODUCT
 * post : http://localhost:3000/api/products
 */
export async function postProduct(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provided...!' });

    Products.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

/**  UPDATE PRODUCT BY PRODUCTID
 * put : http://localhost:3000/api/products/1
 */
export async function putProduct(req, res) {
  try {
    const { productId } = req.query;
    const formData = req.body;

    if (productId && formData) {
      const product = await Products.findByIdAndUpdate(productId, formData);
      res.status(200).json(product);
    }

    res.status(404).json({ error: 'Product Not Selected...!' });
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Data...!' });
  }
}

/**  DELETE PRODUCT BY PRODUCTID
 * delete : http://localhost:3000/api/products/1
 */
export async function deleteProduct(req, res) {
  try {
    const { productId } = req.query;

    if (productId) {
      const product = await Products.findByIdAndDelete(productId);
      return res.status(200).json(product);
    }

    res.status(404).json({ error: 'Product Not Selected...!' });
  } catch (error) {
    res.status(404).json({ error: 'Error While Deleting the product...!' });
  }
}
