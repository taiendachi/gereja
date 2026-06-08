// ============================================================
//  EDIT JADWAL DI SINI — semua data jadwal terpusat di file ini.
// ============================================================

// ---- Ibadah Minggu --------------------------------------------------
export const ibadahMinggu = {
  tanggal: "19 April 2026",
  namaMinggu: "Misericordias Domini",
  agendre: "Migu Wamatörö Yesu",
  warnaKain: "Putih",
  salahiGoroisa: "Mazmur 23 : 1 - 6",
  fonaHuhuo: "1 Petrus 2 : 19 - 25",
  huhuo: "Yohanes 10 : 1 - 10",
  nitanoBadodo: "Yohanes 10 : 10",
  natsHafalan: [
    "YA'IA WA'ATAFENA NDRA'O ENA'Ö SO KHÖRA WA'AURI, BA YA'IA SOI'A WA'AURI",
    "AKU DATANG, SUPAYA MEREKA MEMPUNYAI HIDUP, DAN MEMPUNYAINYA DALAM SEGALA KELIMPAHAN",
  ],
  sesi: [
    {
      nama: "Ibadah Pagi",
      waktu: "08.00 WIB",
      bahasa: "Bahasa Indonesia",
      pengkhotbah: "Pdt. Yafati Laia, M.Th",
      liturgis: "SNK. F. Zai",
      pemusik: "Jefri Lase, S.Sn",
      proyeksionis: "Suci Zebua",
    },
    {
      nama: "Ibadah Siang",
      waktu: "10.00 WIB",
      bahasa: "Bahasa Nias",
      pengkhotbah: "Pdt. W. Duha, S.Th",
      liturgis: "SNK. Bazisokhi Hia",
      pemusik: "Andi S. Sarumaha",
      proyeksionis: "Tema Loi",
    },
    {
      nama: "Ibadah Sekolah Minggu",
      waktu: "08.00 WIB",
      bahasa: "Bahasa Indonesia",
      pengkhotbah: "Pdt. Arani Ziliwu, S.Th",
      liturgis: "Guru Sekolah Minggu",
      pemusik: "Tim Musik SM",
      proyeksionis: "Tema Loi",
    },
  ],
  songLeader: [
    "Kristin Natalia Hia, S.Pd",
    "Kayrin Daeli",
    "Melvan Zebua",
    "Evan Markus Tafonao",
  ],
  kolektan: [
    { nama: "SNK. Elizaro Nazara", tugas: "Koordinator" },
    { nama: "SNK. Fatinafao Laia", tugas: "Lantai 1" },
    { nama: "SNK. Niberia Zebua", tugas: "Lantai 2" },
    { nama: "SNK. Yulianus Hia", tugas: "Lantai 2" },
  ],
};

// ---- Kebaktian Rumah Tangga (KRT) -----------------------------------
export const kebaktianRT = [
  {
    no: 1, lingkungan: "Lingkungan I", keluarga: "A/I. Darnel Laia",
    tempat: "Jl. Mawar No. 12, Hilisimaetano",
    hari: "Minggu, 19-04-2026", waktu: "16.00 WIB",
    pelayan: "Pdt. Yafati Laia, M.Th", keterangan: "-",
  },
  {
    no: 2, lingkungan: "Lingkungan II", keluarga: "A/I. Shyntia Zebua",
    tempat: "Dilaksanakan di Gereja",
    hari: "Selasa, 21-04-2026", waktu: "19.00 WIB",
    pelayan: "Pdt. W. Duha, S.Th", keterangan: "-",
  },
  {
    no: 3, lingkungan: "Lingkungan III", keluarga: "Ina Arwin Ndruru",
    tempat: "Dilaksanakan di Gereja",
    hari: "Rabu, 22-04-2026", waktu: "19.30 WIB",
    pelayan: "SNK. Buala Nazara", keterangan: "-",
  },
  {
    no: 4, lingkungan: "Lingkungan IV", keluarga: "A/I. Freya Lahagu",
    tempat: "Gg. Kharisma No. 7",
    hari: "Kamis, 23-04-2026", waktu: "19.30 WIB",
    pelayan: "Pdt. Arani Ziliwu, S.Th", keterangan: "-",
  },
  {
    no: 5, lingkungan: "Lingkungan V", keluarga: "A/I Kristiani Zega",
    tempat: "Dilaksanakan di Gereja",
    hari: "Jumat, 24-04-2026", waktu: "19.30 WIB",
    pelayan: "SNK. Herlin Lase", keterangan: "-",
  },
];

// ---- Sekolah Minggu --------------------------------------------------
export const sekolahMinggu = {
  tanggal: "19 April 2026",
  rows: [
    { no: 1, kelas: "Balita", ruang: "Ruang Balita", pelayan: "Ina Kezia Zebua / Mailisi Sarumaha", waktu: "08.00 WIB" },
    { no: 2, kelas: "Kecil",  ruang: "Kelas Kecil",  pelayan: "Ina Marchel Mendrofa / Kayrin Daeli", waktu: "08.00 WIB" },
    { no: 3, kelas: "Besar",  ruang: "Kelas Besar",  pelayan: "Ama Noel Daeli / Clarine Mendrofa",   waktu: "08.00 WIB" },
    { no: 4, kelas: "Remaja", ruang: "Kelas Remaja", pelayan: "Ama Jery Zalukhu / Ivan Gea",         waktu: "08.00 WIB" },
  ],
};

// ---- Sekolah Sidi (Pelsidi) — ruang hanya satu ----------------------
export const sekolahSidi = {
  tanggal: "19 April 2026",
  ruang: "Ruang Konsistori",
  rows: [
    { no: 1, grup: "I",   waktu: "12.00 WIB", pelayan: "Semua Guru-Guru" },
    { no: 2, grup: "II",  waktu: "13.00 WIB", pelayan: "Semua Guru-Guru" },
    { no: 3, grup: "III", waktu: "14.00 WIB", pelayan: "Semua Guru-Guru" },
  ],
};
