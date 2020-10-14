export default function formatCurrency(num) {
    // return `$ ${Number(num.toFixed(1)).toLocaleString()} `;
    return `$ ${Number(num).toFixed(1).toLocaleString()} `;
}