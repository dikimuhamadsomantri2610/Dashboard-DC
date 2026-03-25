import { Routes, Route } from "react-router-dom";
import SuratTugasFreshPage from "@/components/rekap-armada/surat-tugas-fresh";
import SuratTugasFreshAddPage from "@/components/rekap-armada/surat-tugas-fresh/add/SuratTugasFreshAddPage";

export default function SuratTugasFresh() {
    return (
        <Routes>
            <Route index element={<SuratTugasFreshPage />} />
            <Route path="add" element={<SuratTugasFreshAddPage />} />
        </Routes>
    );
}
