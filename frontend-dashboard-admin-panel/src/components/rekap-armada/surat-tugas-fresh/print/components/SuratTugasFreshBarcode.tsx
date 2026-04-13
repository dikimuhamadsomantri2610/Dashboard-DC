"use client";
import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export function SuratTugasFreshBarcode({ value }: { value: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && value) {
            try {
                JsBarcode(canvasRef.current, value, {
                    format: 'CODE128',
                    displayValue: false,
                    text: ' ',
                    fontSize: 0,
                    textMargin: 0,
                    width: 1.2,
                    height: 25,
                    margin: 2,
                });
            } catch {
                // Jika value tidak valid untuk barcode, biarkan canvas kosong
            }
        }
    }, [value]);

    return value ? (
        <canvas ref={canvasRef} className="max-w-full max-h-[32px]" />
    ) : null;
}
