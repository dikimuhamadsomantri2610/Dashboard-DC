"use client";
import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export function BarcodeBox({ value, inisial }: { value: string, inisial?: string }) {
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
                // Ignore valid barcode errors
            }
        }
    }, [value]);

    return (
        <div className="flex flex-col border-2 border-black w-[110px] h-[65px]">
            <div className="border-b-2 border-black py-0.5 text-center bg-gray-200/50">
                <span className="text-[9px] font-bold">KODE GEMBOK {inisial ? `#${inisial}` : ''}</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center overflow-hidden p-0.5 mt-1">
                {value ? (
                    <canvas ref={canvasRef} className="max-w-full max-h-[35px]" />
                ) : (
                    <span className="text-[9px] text-gray-400 italic">-</span>
                )}
            </div>
        </div>
    );
}
