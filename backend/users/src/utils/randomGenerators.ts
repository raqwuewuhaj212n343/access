export function genNonce() {
  return Math.floor(Math.random() * 1000000);
}

export function genOTP() {
  return Math.floor(Math.random() * 100000);
}
