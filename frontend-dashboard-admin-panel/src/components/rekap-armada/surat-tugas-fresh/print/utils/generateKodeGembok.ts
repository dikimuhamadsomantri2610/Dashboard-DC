// Fungsi convert Kode Gembok
export function generateKodeGembok(input: string, siteStr: string = ""): string {
    if (!input) return '';
    const valA2 = input.replace(/\D/g, '').padEnd(4, '0');
    const siteVal = siteStr.length >= 3 ? siteStr.slice(-3) : siteStr;
    const valB2 = siteVal.padStart(4, '0');
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const idx1 = Math.max(0, 18 - parseInt(valB2[0] || '0') - parseInt(valA2[0]));
    const idx2 = Math.max(0, 18 - parseInt(valB2[1] || '0') - parseInt(valA2[1]));
    const idx3 = Math.max(0, 18 - parseInt(valB2[2] || '0') - parseInt(valA2[2]));
    const idx4 = Math.max(0, 18 - parseInt(valB2[3] || '0') - parseInt(valA2[3]));

    return `${chars[idx1] || ''}${chars[idx2] || ''}${chars[idx3] || ''}${chars[idx4] || ''}`;
}
