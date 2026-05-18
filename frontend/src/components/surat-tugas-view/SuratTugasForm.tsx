"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Send, RotateCcw, Plus, X } from 'lucide-react';
import { checkerNames } from './data/checker.data';
import './surattugas-form.css';

interface CheckerItem {
    id: string;
    iniasialToko: string;
    namaChecker: string;
}

interface FormData {
    noArmada: string;
    kodeGembok: string;
    numberSeal: string;
    checkers: CheckerItem[];
}

export default function SuratTugasForm() {
    const [formData, setFormData] = useState<FormData>({
        noArmada: '',
        kodeGembok: '',
        numberSeal: '',
        checkers: [],
    });
    const [tempInisialToko, setTempInisialToko] = useState('');
    const [tempNamaChecker, setTempNamaChecker] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddChecker = () => {
        if (!tempInisialToko.trim()) {
            alert('Inisial Toko tidak boleh kosong');
            return;
        }
        if (!tempNamaChecker.trim()) {
            alert('Nama Checker harus dipilih');
            return;
        }

        const newChecker: CheckerItem = {
            id: Date.now().toString(),
            iniasialToko: tempInisialToko,
            namaChecker: tempNamaChecker,
        };

        setFormData(prev => ({
            ...prev,
            checkers: [...prev.checkers, newChecker],
        }));

        setTempInisialToko('');
        setTempNamaChecker('');
    };

    const handleRemoveChecker = (id: string) => {
        setFormData(prev => ({
            ...prev,
            checkers: prev.checkers.filter(checker => checker.id !== id),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.noArmada.trim()) {
            alert('No Armada tidak boleh kosong');
            return;
        }
        if (!formData.kodeGembok.trim()) {
            alert('Kode Gembok tidak boleh kosong');
            return;
        }
        if (!formData.numberSeal.trim()) {
            alert('Number Seal tidak boleh kosong');
            return;
        }
        if (formData.checkers.length === 0) {
            alert('Tambahkan minimal 1 Toko & Checker');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Submit to API
            console.log('Form Data:', formData);
            alert('Data berhasil dikirim!');
            handleReset();
        } catch (error) {
            console.error('Error:', error);
            alert('Gagal mengirim data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            noArmada: '',
            kodeGembok: '',
            numberSeal: '',
            checkers: [],
        });
        setTempInisialToko('');
        setTempNamaChecker('');
    };

    return (
        <div className="st-form-container">
            {/* Header */}
            <div className="st-header">
                <div className="st-header-icon">
                    <FileText size={32} />
                </div>
                <div className="st-header-content">
                    <h1 className="st-title">Surat Tugas Checker</h1>
                    <p className="st-subtitle">Verifikasi informasi armada dan seal</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="st-form">
                {/* No Armada */}
                <div className="st-form-group">
                    <label htmlFor="noArmada" className="st-label">No Armada</label>
                    <input
                        type="text"
                        id="noArmada"
                        name="noArmada"
                        value={formData.noArmada}
                        onChange={handleChange}
                        placeholder="Masukkan No Armada"
                        className="st-input"
                    />
                </div>

                {/* Kode Gembok */}
                <div className="st-form-group">
                    <label htmlFor="kodeGembok" className="st-label">Kode Gembok</label>
                    <input
                        type="text"
                        id="kodeGembok"
                        name="kodeGembok"
                        value={formData.kodeGembok}
                        onChange={handleChange}
                        placeholder="Masukkan Kode Gembok"
                        className="st-input"
                    />
                </div>

                {/* Number Seal */}
                <div className="st-form-group">
                    <label htmlFor="numberSeal" className="st-label">Number Seal</label>
                    <input
                        type="text"
                        id="numberSeal"
                        name="numberSeal"
                        value={formData.numberSeal}
                        onChange={handleChange}
                        placeholder="Masukkan Number Seal"
                        className="st-input"
                    />
                </div>

                {/* Checkers Section */}
                <div className="st-form-group">
                    <label className="st-label">Toko & Nama Checker</label>
                    
                    {/* Add Checker Row */}
                    <div className="st-checker-input-row">
                        <input
                            type="text"
                            value={tempInisialToko}
                            onChange={(e) => setTempInisialToko(e.target.value)}
                            placeholder="Inisial Toko"
                            className="st-input st-input-small"
                        />
                        <select
                            value={tempNamaChecker}
                            onChange={(e) => setTempNamaChecker(e.target.value)}
                            className="st-select"
                        >
                            <option value="">Pilih Nama Checker</option>
                            {checkerNames.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={handleAddChecker}
                            className="st-btn-add"
                            title="Tambah Checker"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Checkers List */}
                    {formData.checkers.length > 0 && (
                        <div className="st-checkers-list">
                            {formData.checkers.map((checker) => (
                                <div key={checker.id} className="st-checker-item">
                                    <div className="st-checker-content">
                                        <span className="st-checker-toko">{checker.iniasialToko}</span>
                                        <span className="st-checker-name">{checker.namaChecker}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveChecker(checker.id)}
                                        className="st-btn-remove"
                                        title="Hapus Checker"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="st-form-buttons">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="st-btn-reset"
                        disabled={isLoading}
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="st-btn-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="st-spinner"></span>
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Kirim
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
