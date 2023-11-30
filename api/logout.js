import { response } from 'express';

function logout(req, res) {
  // Assuming your logout logic here
  localStorage.removeItem('authToken');
  res.json({ message: 'User successfully logged out' });
}


export default router;
