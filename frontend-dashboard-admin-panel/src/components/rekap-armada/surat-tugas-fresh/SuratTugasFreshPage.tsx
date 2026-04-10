import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useSuratTugasFresh } from './hooks/useSuratTugasFresh';
import SuratTugasFreshToolbar from './components/SuratTugasFreshToolbar';
import SuratTugasFreshTable from './components/SuratTugasFreshTable';
import SuratTugasFreshDialogs from './components/SuratTugasFreshDialogs';
import SuratTugasFreshPaperA4 from './print/SuratTugasFreshPaperA4';

export default function SuratTugasFreshPage() {
    const navigate = useNavigate();
    const {
        isLoading,
        distributionCenters,
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
    } = useSuratTugasFresh();

    return (
        <div className="space-y-6">
            {/* Header / Table (Hidden on print) */}
            <div className="print:hidden space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Surat Tugas Fresh</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">Kelola surat tugas armada kendaraan.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => navigate('/rekap-armada/surat-tugas-fresh/add')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-lime-500 dark:hover:bg-lime-600 dark:text-white"
                        >
                            <Plus className="h-4 w-4" />
                            ADD
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card>
                    <SuratTugasFreshToolbar
                        startDate={startDate} setStartDate={setStartDate}
                        endDate={endDate} setEndDate={setEndDate}
                        dcFilter={dcFilter} setDcFilter={setDcFilter}
                        resetDateFilter={resetDateFilter}
                        handleExportExcel={handleExportExcel}
                        perPage={perPage} setPerPage={setPerPage}
                    />
                    <SuratTugasFreshTable
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

            {/* Dialogs */}
            <SuratTugasFreshDialogs
                groupToDelete={groupToDelete}
                setGroupToDelete={setGroupToDelete}
                executeDeleteGroup={executeDeleteGroup}
                groupToConfirmPrint={groupToConfirmPrint}
                setGroupToConfirmPrint={setGroupToConfirmPrint}
                setSelectedGroupForPrint={setSelectedGroupForPrint}
            />

            {/* Print Section (Hidden on screen, visible on print) */}
            {selectedGroupForPrint && <SuratTugasFreshPaperA4 data={selectedGroupForPrint} distributionCenters={distributionCenters} />}
        </div>
    );
}
