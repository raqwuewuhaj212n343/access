export const validateEmail = function validateEmail(email:string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

export function maxArrayLength(length = 0) {
    return (val: any) => val?.length <= length; // Set maximum length
}

export function validateAddress(web3Wallets: {address: string}[]) {
    const counts = web3Wallets?.reduce((counts: Record<string, number>, obj) => {
        counts[obj.address] = (counts[obj.address] || 0) + 1;
        return counts;
    }, {});
    return Object.values(counts).some((c) => c > 1);
}