import { Routes, Route } from "react-router-dom";
import SuratTugasPage from "@/components/rekap-armada/surat-tugas";
import SuratTugasAddPage from "@/components/rekap-armada/surat-tugas/add/SuratTugasAddPage";

export default function SuratTugas() {
    return (
        <Routes>
            <Route index element={<SuratTugasPage />} />
            <Route path="add" element={<SuratTugasAddPage />} />
        </Routes>
    );
}
