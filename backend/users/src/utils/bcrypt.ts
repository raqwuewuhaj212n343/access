import bcrypt from 'bcryptjs';


export const hashPassword = async (password: string) => {
  if (password && process.env.SALT) {
    const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
    return hash
  }
  return ''
};

export const comparePassword = async function (textPassword:string, encryptedPassword:string) {
  return bcrypt.compare(textPassword, encryptedPassword).then((match:boolean) => {
    return match;
  }).catch((err:Error) => {
    return false;
  });
};
