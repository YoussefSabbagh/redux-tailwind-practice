/** Controller */
import Users from '../models/user';

/**  GET ALL USERS
 * get : http://localhost:3000/api/users
 */
export async function getUsers(req, res) {
  try {
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // const users = await response.json();

    const users = await Users.find({});

    if (!users)
      return res.status(404).json({
        error: 'Data not Found',
        status: '404',
      });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Data' });
  }
}

/**  GET USER BY USERID
 *   get : http://localhost:3000/api/users/1
 */
export async function getUserById(req, res) {
  try {
    const { userId } = req.query;

    const user = await Users.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: 'Error While fetching the Data...!' });
  }
}

/**  CREATE USER
 * post : http://localhost:3000/api/users
 */
export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provided...!' });

    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

/**  UPDATE USER BY USERID
 * put : http://localhost:3000/api/users/1
 */
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }

    res.status(404).json({ error: 'User Not Selected...!' });
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Data...!' });
  }
}

/**  DELETE USER BY USERID
 * delete : http://localhost:3000/api/users/1
 */
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json(user);
    }

    res.status(404).json({ error: 'User Not Selected...!' });
  } catch (error) {
    res.status(404).json({ error: 'Error While Deleting the User...!' });
  }
}
