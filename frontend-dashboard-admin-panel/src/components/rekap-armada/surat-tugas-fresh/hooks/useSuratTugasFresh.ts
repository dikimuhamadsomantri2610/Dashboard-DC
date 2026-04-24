"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchSuratTugasFresh, deleteSuratTugasFresh, fetchDistributionCenters } from '../services/surat-tugas-fresh.service';
import { toast } from 'sonner';
import { exportSuratTugasToExcel } from '../utils/surat-tugas-fresh.utils';
import type { SuratTugasFreshApiItem, GroupedSuratTugasFresh } from '../types/surat-tugas-fresh.types';
import type { DistributionCenterData } from '../print/SuratTugasFreshPaperA4';

export const useSuratTugasFresh = () => {
    const [data, setData] = useState<SuratTugasFreshApiItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [distributionCenters, setDistributionCenters] = useState<DistributionCenterData[]>([]);
    const [selectedGroupForPrint, setSelectedGroupForPrint] = useState<GroupedSuratTugasFresh & { printIndex?: number } | null>(null);
    const [groupToConfirmPrint, setGroupToConfirmPrint] = useState<{ group: GroupedSuratTugasFresh, index: number } | null>(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dcFilter, setDcFilter] = useState('All');
    const [groupToDelete, setGroupToDelete] = useState<GroupedSuratTugasFresh | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [resData, dcs] = await Promise.all([
                fetchSuratTugasFresh(),
                fetchDistributionCenters()
            ]);
            setData(resData);
            setDistributionCenters(dcs);
        } catch (error) {
            console.error("Gagal mengambil data surat tugas:", error);
            toast.error('Gagal', { description: 'Gagal mengambil surat tugas.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);
    useEffect(() => { setCurrentPage(1); }, [startDate, endDate, dcFilter, perPage]);

    const executeDeleteGroup = async () => {
        if (!groupToDelete) return;
        try {
            await Promise.all(groupToDelete.items.map(item => deleteSuratTugasFresh(item.id)));
            const idsToRemove = groupToDelete.items.map(i => i.id);
            setData(prev => prev.filter(item => !idsToRemove.includes(item.id)));
            setGroupToDelete(null);
            toast.success('Berhasil', { description: 'Data surat tugas berhasil dihapus.' });
        } catch (error) {
            console.error("Gagal menghapus data surat tugas:", error);
            toast.error('Gagal', { description: 'Gagal menghapus surat tugas.' });
        }
    };

    const handleExportExcel = () => exportSuratTugasToExcel(data);

    const groupedDataFiltered = useMemo(() => {
        const groups: Record<string, GroupedSuratTugasFresh> = {};
        data.forEach(item => {
            const timeKey = new Date(item.createdAt).toISOString().slice(0, 16);
            const groupId = `${item.noArmada}-${item.namaDriver}-${timeKey}`;

            if (!groups[groupId]) {
                groups[groupId] = {
                    groupId,
                    noArmada: item.noArmada,
                    dc: item.dc || '-',
                    namaDriver: item.namaDriver,
                    admin: item.admin,
                    createdAt: item.createdAt,
                    vendor: item.vendor || item.noArmada,
                    items: []
                };
            }
            groups[groupId].items.push(item);
        });

        // Sort items dalam setiap grup secara ascending berdasarkan id,
        // agar urutan cetak sesuai urutan input (AAC → BBN → CCA, bukan terbalik).
        Object.values(groups).forEach(group => {
            group.items.sort((a, b) => a.id - b.id);
        });

        let result = Object.values(groups).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (startDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) >= startDate);
        if (endDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) <= endDate);
        if (dcFilter !== 'All') result = result.filter(g => g.dc === dcFilter);

        return result;
    }, [data, startDate, endDate, dcFilter]);

    const totalPages = Math.ceil(groupedDataFiltered.length / perPage);
    const currentData = groupedDataFiltered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const resetDateFilter = () => { setStartDate(''); setEndDate(''); setDcFilter('All'); };

    return {
        data, isLoading, distributionCenters,
        selectedGroupForPrint, setSelectedGroupForPrint,
        groupToConfirmPrint, setGroupToConfirmPrint,
        startDate, setStartDate, endDate, setEndDate, dcFilter, setDcFilter,
        groupToDelete, setGroupToDelete,
        currentPage, setCurrentPage, perPage, setPerPage,
        executeDeleteGroup, handleExportExcel,
        groupedDataFiltered, currentData, totalPages, resetDateFilter,
    };
};
