"use client";
import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

// PENTING: Menggunakan <svg> bukan <canvas> untuk rendering barcode cetak.
// Canvas adalah format raster (bitmap) yang hanya render di resolusi layar (~96 DPI).
// Printer membutuhkan 300+ DPI agar barcode terbaca scanner.
// SVG adalah format vector — tidak ada batas resolusi, tajam di DPI berapapun,
// dan barcode pasti dapat di-scan setelah dicetak.
export function SuratTugasFreshBarcode({ value }: { value: string }) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current && value) {
            try {
                JsBarcode(svgRef.current, value, {
                    format: 'CODE128',
                    displayValue: false,
                    xmlDocument: document,
                    width: 1.0,
                    height: 20,
                    margin: 1,
                });
            } catch {
                // Jika value tidak valid untuk barcode, biarkan svg kosong
            }
        }
    }, [value]);

    return value ? (
        <svg ref={svgRef} style={{ display: 'block', maxWidth: '100%' }} />
    ) : null;
}
