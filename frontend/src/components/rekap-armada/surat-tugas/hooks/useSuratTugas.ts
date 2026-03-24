import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchSuratTugas, deleteSuratTugas } from '../services/surat-tugas.service';
import { toast } from 'sonner';
import { exportSuratTugasToExcel } from '../utils/surat-tugas.utils';
import type { SuratTugasApiItem, GroupedSuratTugas } from '../types/surat-tugas.types';

export const useSuratTugas = () => {
    const [data, setData] = useState<SuratTugasApiItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGroupForPrint, setSelectedGroupForPrint] = useState<GroupedSuratTugas & { printIndex?: number } | null>(null);
    const [groupToConfirmPrint, setGroupToConfirmPrint] = useState<{ group: GroupedSuratTugas, index: number } | null>(null);

    // Filter Date State
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dcFilter, setDcFilter] = useState('All');

    const [groupToDelete, setGroupToDelete] = useState<GroupedSuratTugas | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const resData = await fetchSuratTugas();
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

    useEffect(() => {
        setCurrentPage(1);
    }, [startDate, endDate, dcFilter, perPage]);

    const executeDeleteGroup = async () => {
        if (!groupToDelete) return;
        try {
            await Promise.all(groupToDelete.items.map(item => deleteSuratTugas(item.id)));
            const idsToRemove = groupToDelete.items.map(i => i.id);
            setData(prev => prev.filter(item => !idsToRemove.includes(item.id)));
            setGroupToDelete(null);
            toast.success('Berhasil', { description: 'Data surat tugas berhasil dihapus.' });
        } catch (error) {
            console.error("Gagal menghapus:", error);
            toast.error('Gagal', { description: 'Gagal menghapus surat tugas.' });
        }
    };

    const handleExportExcel = () => {
        exportSuratTugasToExcel(data);
    };

    const groupedDataFiltered = useMemo(() => {
        const groups: Record<string, GroupedSuratTugas> = {};
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

        let result = Object.values(groups).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (startDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) >= startDate);
        if (endDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) <= endDate);
        if (dcFilter !== 'All') result = result.filter(g => g.dc === dcFilter);

        return result;
    }, [data, startDate, endDate, dcFilter]);

    const totalPages = Math.max(1, Math.ceil(groupedDataFiltered.length / perPage));
    const currentData = groupedDataFiltered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const resetDateFilter = () => {
        setStartDate('');
        setEndDate('');
        setDcFilter('All');
    };

    return {
        data, isLoading,
        selectedGroupForPrint, setSelectedGroupForPrint,
        groupToConfirmPrint, setGroupToConfirmPrint,
        startDate, setStartDate,
        endDate, setEndDate,
        dcFilter, setDcFilter,
        groupToDelete, setGroupToDelete,
        currentPage, setCurrentPage,
        perPage, setPerPage,
        executeDeleteGroup,
        handleExportExcel,
        groupedDataFiltered,
        currentData,
        totalPages,
        resetDateFilter,
    };
};
