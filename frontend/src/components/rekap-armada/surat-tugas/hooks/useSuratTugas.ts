"use client";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchSuratTugas, deleteSuratTugas, updateStatusSuratTugasGroup, fetchPendingSuratTugasCheck, approveSuratTugasCheckGroup, rejectSuratTugasCheckGroup } from '../services/surat-tugas.service';
import { toast } from 'sonner';
import { exportSuratTugasToExcel } from '../utils/surat-tugas.utils';
import type { SuratTugasApiItem, GroupedSuratTugas } from '../types/surat-tugas.types';

export const useSuratTugas = () => {
    const [data, setData] = useState<SuratTugasApiItem[]>([]);
    const [pendingCheckData, setPendingCheckData] = useState<SuratTugasApiItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGroupForPrint, setSelectedGroupForPrint] = useState<GroupedSuratTugas & { printIndex?: number } | null>(null);
    const [groupToConfirmPrint, setGroupToConfirmPrint] = useState<{ group: GroupedSuratTugas, index: number } | null>(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dcFilter, setDcFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [groupToDelete, setGroupToDelete] = useState<GroupedSuratTugas | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [resData, resPending] = await Promise.all([
                fetchSuratTugas(),
                fetchPendingSuratTugasCheck()
            ]);
            setData(resData);
            setPendingCheckData(resPending);
        } catch (error) {
            console.error("Gagal mengambil data surat tugas:", error);
            toast.error('Gagal', { description: 'Gagal mengambil data.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);
    useEffect(() => { setCurrentPage(1); }, [startDate, endDate, dcFilter, searchQuery, perPage]);

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

    const handleApproveGroup = async (group: GroupedSuratTugas, details?: {id: number, materai: string, loadNumber: string, keterangan: string}[]) => {
        try {
            const ids = group.items.map(i => i.id);
            if (group.status === 'Pending' || group.status === 'pending') {
                if (!details) throw new Error("Details required for pending approval");
                await approveSuratTugasCheckGroup(details);
                await fetchData(); // Refresh data to move it to main table
            } else {
                await updateStatusSuratTugasGroup(ids, 'approved');
                setData(prev => prev.map(item =>
                    ids.includes(item.id) ? { ...item, status: 'approved' } : item
                ));
            }
            toast.success('Disetujui', { description: `Surat tugas armada ${group.noArmada} telah disetujui.` });
        } catch (error) {
            console.error("Gagal menyetujui:", error);
            toast.error('Gagal', { description: 'Gagal menyetujui surat tugas.' });
        }
    };

    const handleRejectGroup = async (group: GroupedSuratTugas) => {
        try {
            const ids = group.items.map(i => i.id);
            if (group.status === 'Pending' || group.status === 'pending') {
                await rejectSuratTugasCheckGroup(ids);
                await fetchData(); // Refresh data
            } else {
                await updateStatusSuratTugasGroup(ids, 'rejected');
                setData(prev => prev.map(item =>
                    ids.includes(item.id) ? { ...item, status: 'rejected' } : item
                ));
            }
            toast.error('Ditolak', { description: `Surat tugas armada ${group.noArmada} telah ditolak.` });
        } catch (error) {
            console.error("Gagal menolak:", error);
            toast.error('Gagal', { description: 'Gagal menolak surat tugas.' });
        }
    };

    const handleExportExcel = () => exportSuratTugasToExcel(data);

    // Build all groups for main table (from SuratTugas)
    const allGroups = useMemo(() => {
        const groups: Record<string, GroupedSuratTugas> = {};
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
                    namaChecker: item.namaChecker,
                    createdAt: item.createdAt,
                    vendor: item.vendor || item.noArmada,
                    status: item.status || 'approved',
                    items: []
                };
            }
            groups[groupId].items.push(item);
        });
        return Object.values(groups).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [data]);

    // Build pending groups (from SuratTugasCheck)
    const pendingGroups = useMemo(() => {
        const groups: Record<string, GroupedSuratTugas> = {};
        pendingCheckData.forEach(item => {
            const timeKey = new Date(item.createdAt).toISOString().slice(0, 16);
            const groupId = `${item.noArmada}-${item.namaDriver}-${timeKey}`;

            if (!groups[groupId]) {
                groups[groupId] = {
                    groupId,
                    noArmada: item.noArmada,
                    dc: item.dc || '-',
                    namaDriver: item.namaDriver,
                    admin: item.admin || 'System',
                    namaChecker: item.namaChecker,
                    createdAt: item.createdAt,
                    vendor: item.vendor || item.noArmada,
                    status: 'pending',
                    items: []
                };
            }
            groups[groupId].items.push(item);
        });
        return Object.values(groups).sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [pendingCheckData]);

    const groupedDataFiltered = useMemo(() => {
        // Only show from main table
        let result = [...allGroups];

        if (startDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) >= startDate);
        if (endDate) result = result.filter(g => new Date(g.createdAt).toISOString().slice(0, 10) <= endDate);
        if (dcFilter !== 'All') result = result.filter(g => g.dc === dcFilter);
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(g =>
                g.noArmada.toLowerCase().includes(q) ||
                g.namaDriver.toLowerCase().includes(q) ||
                g.namaChecker.toLowerCase().includes(q) ||
                g.dc.toLowerCase().includes(q) ||
                g.items.some(item => item.nama_toko.toLowerCase().includes(q))
            );
        }

        return result;
    }, [allGroups, startDate, endDate, dcFilter, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(groupedDataFiltered.length / perPage));
    const currentData = groupedDataFiltered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const resetDateFilter = () => { setStartDate(''); setEndDate(''); setDcFilter('All'); };

    return {
        data, isLoading,
        selectedGroupForPrint, setSelectedGroupForPrint,
        groupToConfirmPrint, setGroupToConfirmPrint,
        startDate, setStartDate, endDate, setEndDate, dcFilter, setDcFilter,
        searchQuery, setSearchQuery,
        groupToDelete, setGroupToDelete,
        currentPage, setCurrentPage, perPage, setPerPage,
        executeDeleteGroup, handleExportExcel,
        handleApproveGroup, handleRejectGroup,
        pendingGroups,
        groupedDataFiltered, currentData, totalPages, resetDateFilter,
    };
};
