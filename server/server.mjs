import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './db/conn.mjs'

const PORT = process.env.PORT || 5050
const app = express()

app.use(cors())
app.use(express.json())

// Minimal endpoint to handle password change during development
app.post('/api/profile/change-password', async (req, res) => {
  const { newPassword } = req.body;
  console.log('Received password change request (length):', newPassword ? newPassword.length : 'none');
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  // In a real app: hash & update DB here. For now, return 200 for valid input.
  return res.status(200).json({ message: 'Password changed' });
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
