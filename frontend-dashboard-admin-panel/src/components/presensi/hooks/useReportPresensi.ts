"use client";
import { useState, useEffect, useMemo } from 'react';
import { fetchPresensiSummary, fetchPresensiDetail } from '../services/presensi.service';
import * as XLSX from 'xlsx';

export const useReportPresensi = () => {
    const [summaryData, setSummaryData] = useState<any[]>([]);
    const [detailedData, setDetailedData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);

    // Filter state
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const [summary, detail] = await Promise.all([
                    fetchPresensiSummary(),
                    fetchPresensiDetail(),
                ]);
                setSummaryData(summary);
                setDetailedData(detail);
            } catch (error) {
                console.error('Error fetching presensi data:', error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const totals = summaryData.reduce(
        (acc, row) => ({
            hadir: acc.hadir + row.hadir,
            cuti: acc.cuti + row.cuti,
            off: acc.off + row.off,
            isbsd: acc.isbsd + row.isbsd,
            terlambat: acc.terlambat + row.terlambat,
            belumScan: acc.belumScan + row.belumScan,
            total: acc.total + row.total,
        }),
        { hadir: 0, cuti: 0, off: 0, isbsd: 0, terlambat: 0, belumScan: 0, total: 0 }
    );

    // Client-side filtered data
    const filteredData = useMemo(() => {
        let result = detailedData;

        // Filter by date range (based on createdAt field)
        if (dateFrom) {
            const from = new Date(dateFrom);
            from.setHours(0, 0, 0, 0);
            result = result.filter((row) => {
                const rowDate = new Date(row.createdAt);
                return rowDate >= from;
            });
        }
        if (dateTo) {
            const to = new Date(dateTo);
            to.setHours(23, 59, 59, 999);
            result = result.filter((row) => {
                const rowDate = new Date(row.createdAt);
                return rowDate <= to;
            });
        }

        // Filter by search query (nama or nik)
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (row) =>
                    row.nama?.toLowerCase().includes(q) ||
                    row.nik?.toLowerCase().includes(q)
            );
        }

        return result;
    }, [detailedData, dateFrom, dateTo, searchQuery]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [dateFrom, dateTo, searchQuery]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); };
    const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(p => p - 1); };
    const handlePageClick = (page: number) => setCurrentPage(page);

    const handleExportExcel = () => {
        if (filteredData.length === 0) return;
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData.map(d => ({
            Nama: d.nama, NIK: d.nik, Divisi: d.divisi,
            'Jam Absen Masuk': d.jamAbsenMasuk, 'Jam Absen Pulang': d.jamAbsenPulang,
            'Jam Istirahat Keluar': d.jamIstirahatKeluar, 'Jam Beres Istirahat': d.jamBeresIstirahat,
        })));
        XLSX.utils.book_append_sheet(wb, ws, 'Detail Presensi');
        XLSX.writeFile(wb, `Report_Presensi_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return {
        summaryData, detailedData, filteredData, loading,
        totals, currentPage, itemsPerPage, setItemsPerPage,
        totalPages, startIndex, currentData,
        handleNextPage, handlePrevPage, handlePageClick, handleExportExcel,
        dateFrom, setDateFrom,
        dateTo, setDateTo,
        searchQuery, setSearchQuery,
    };
};
