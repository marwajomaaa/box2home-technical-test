import * as bcrypt from 'bcrypt' // Importing the bcrypt library for hashing and comparing passwords

// Function to hash a password
export const hashPassword = (password: string) => {
  // Returns a hashed version of the password using a salt round of 10
  return bcrypt.hash(password, 10) 
}

// Function to compare a plain password with a hashed password
export const compareHashPassword = (password: string, hash: string) => {
  // Compares the plain password with the hashed password and returns a boolean
  return bcrypt.compare(password, hash) 
}
