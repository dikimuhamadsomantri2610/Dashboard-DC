import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchSuratTugasFresh, deleteSuratTugasFresh } from '../services/surat-tugas-fresh.service';
import { toast } from 'sonner';
import { exportSuratTugasToExcel } from '../utils/surat-tugas-fresh.utils';
import type { SuratTugasFreshApiItem, GroupedSuratTugasFresh } from '../types/surat-tugas-fresh.types';

export const useSuratTugasFresh = () => {
    const [data, setData] = useState<SuratTugasFreshApiItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGroupForPrint, setSelectedGroupForPrint] = useState<GroupedSuratTugasFresh & { printIndex?: number } | null>(null);
    const [groupToConfirmPrint, setGroupToConfirmPrint] = useState<{ group: GroupedSuratTugasFresh, index: number } | null>(null);

    // Filter Date State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dcFilter, setDcFilter] = useState('All');

    const [groupToDelete, setGroupToDelete] = useState<GroupedSuratTugasFresh | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const resData = await fetchSuratTugasFresh();
            setData(resData);
        } catch (error) {
            console.error("Gagal mengambil data surat tugas:", error);
            toast.error('Gagal', { description: 'Gagal mengambil surat tugas.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reset page ke 1 kalau filter atau perPage berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [startDate, endDate, dcFilter, perPage]);

    const executeDeleteGroup = async () => {
        if (!groupToDelete) return;
        try {
            // Delete secara berurutan atau Promise.all
            await Promise.all(groupToDelete.items.map(item => deleteSuratTugasFresh(item.id)));

            // Hapus dari state local
            const idsToRemove = groupToDelete.items.map(i => i.id);
            setData(prev => prev.filter(item => !idsToRemove.includes(item.id)));
            setGroupToDelete(null);
            toast.success('Berhasil', { description: 'Data surat tugas berhasil dihapus.' });
        } catch (error) {
            console.error("Gagal menghapus data surat tugas:", error);
            toast.error('Gagal', { description: 'Gagal menghapus surat tugas.' });
        }
    };

    const handleExportExcel = () => {
        exportSuratTugasToExcel(data);
    };

    // Fungsi untuk mengelompokkan data berdasarkan armada, driver, dan waktu (sekitar menit yang sama)
    const groupedDataFiltered = useMemo(() => {
        const groups: Record<string, GroupedSuratTugasFresh> = {};

        data.forEach(item => {
            const timeKey = new Date(item.createdAt).toISOString().slice(0, 16);
            const groupId = `${item.no_armada}-${item.nama_driver}-${timeKey}`;

            if (!groups[groupId]) {
                groups[groupId] = {
                    groupId,
                    no_armada: item.no_armada,
                    dc: item.dc || '-',
                    nama_driver: item.nama_driver,
                    admin: item.admin,
                    createdAt: item.createdAt,
                    vendor: item.vendor || item.no_armada,
                    items: []
                };
            }
            groups[groupId].items.push(item);
        });

        // Convert object values ke array, disort descending by createdAt
        let result = Object.values(groups).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // Filter berdasarkan Date jika diisi (Membandingkan "YYYY-MM-DD")
        if (startDate) {
            result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) >= startDate);
        }
        if (endDate) {
            result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) <= endDate);
        }

        // Filter berdasarkan DC
        if (dcFilter !== 'All') {
            result = result.filter(g => g.dc === dcFilter);
        }

        return result;
    }, [data, startDate, endDate, dcFilter]);

    // Pagination logic
    const totalPages = Math.ceil(groupedDataFiltered.length / perPage);
    const currentData = groupedDataFiltered.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Fungsi reset filter
    const resetDateFilter = () => {
        setStartDate('');
        setEndDate('');
        setDcFilter('All');
    };

    return {
        data,
        isLoading,
        selectedGroupForPrint,
        setSelectedGroupForPrint,
        groupToConfirmPrint,
        setGroupToConfirmPrint,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        dcFilter,
        setDcFilter,
        groupToDelete,
        setGroupToDelete,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        executeDeleteGroup,
        handleExportExcel,
        groupedDataFiltered,
        currentData,
        totalPages,
        resetDateFilter,
    };
};
