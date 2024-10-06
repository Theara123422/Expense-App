import bcrypt from 'bcrypt';

const isPasswordVerified = (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}
export default isPasswordVerified;