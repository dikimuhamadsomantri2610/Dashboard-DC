"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, FileSignature } from 'lucide-react';
import { useSuratTugas } from './hooks/useSuratTugas';
import SuratTugasToolbar from './components/SuratTugasToolbar';
import SuratTugasTable from './components/SuratTugasTable';
import SuratTugasDialogs from './components/SuratTugasDialogs';
import SuratTugasPaperA5 from './print/SuratTugasPaperA5';

export default function SuratTugasPage() {
    const router = useRouter();
    const {
        isLoading,
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
        resetDateFilter
    } = useSuratTugas();

    return (
        <div className="space-y-6">
            <div className="print:hidden space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 shadow-sm">
                            <FileSignature className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Surat Tugas</h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Kelola surat tugas armada kendaraan.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => router.push('/rekap-armada/surat-tugas/add')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-lime-500 dark:hover:bg-lime-600 dark:text-white"
                        >
                            <Plus className="h-4 w-4" />
                            ADD
                        </Button>
                    </div>
                </div>

                <Card>
                    <SuratTugasToolbar
                        startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate}
                        dcFilter={dcFilter} setDcFilter={setDcFilter}
                        resetDateFilter={resetDateFilter}
                        handleExportExcel={handleExportExcel}
                        perPage={perPage} setPerPage={setPerPage}
                    />
                    <SuratTugasTable
                        isLoading={isLoading}
                        currentData={currentData}
                        groupedDataFiltered={groupedDataFiltered}
                        currentPage={currentPage}
                        perPage={perPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        confirmDeleteGroup={setGroupToDelete}
                        setGroupToConfirmPrint={setGroupToConfirmPrint}
                    />
                </Card>
            </div>

            <SuratTugasDialogs
                groupToDelete={groupToDelete}
                setGroupToDelete={setGroupToDelete}
                executeDeleteGroup={executeDeleteGroup}
                groupToConfirmPrint={groupToConfirmPrint}
                setGroupToConfirmPrint={setGroupToConfirmPrint}
                setSelectedGroupForPrint={setSelectedGroupForPrint}
            />

            <SuratTugasPaperA5 selectedGroupForPrint={selectedGroupForPrint} />
        </div>
    );
}
