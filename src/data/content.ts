export type Article = {
  slug: string;
  title: string;
  date: string;
  verse?: string;
  excerpt: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "berjalan-dalam-iman",
    title: "Renungan: Berjalan dalam Iman",
    date: "19 April 2026",
    verse: "Sebab hidup kami ini adalah hidup karena percaya, bukan karena melihat. — 2 Korintus 5:7",
    excerpt:
      "Iman bukanlah sekadar tahu, melainkan langkah kaki yang berani menapak walau jalan masih samar.",
    content: [
      "Hidup orang percaya adalah perjalanan yang dituntun oleh iman, bukan oleh apa yang tampak di mata.",
      "Banyak kali kita ingin melihat dahulu baru percaya, namun Tuhan justru memanggil kita untuk percaya, lalu kita akan melihat kebaikan-Nya.",
      "Berjalan dalam iman berarti menyerahkan rasa takut, kuatir, dan keraguan ke dalam tangan Tuhan, sambil tetap melangkah taat pada panggilan-Nya.",
      "Kiranya hari ini kita kembali diteguhkan: walaupun jalan terasa berat, Tuhan yang memanggil kita adalah setia.",
    ],
  },
  {
    slug: "kasih-yang-memulihkan",
    title: "Kasih yang Memulihkan",
    date: "12 April 2026",
    verse: "Kasih itu sabar, kasih itu murah hati. — 1 Korintus 13:4",
    excerpt: "Kasih Kristus mampu memulihkan luka yang paling dalam sekalipun.",
    content: [
      "Dalam dunia yang penuh luka, kasih Allah hadir sebagai obat yang menyembuhkan.",
      "Kita dipanggil menjadi saluran kasih itu bagi sesama, dimulai dari keluarga dan jemaat kita sendiri.",
    ],
  },
  {
    slug: "doa-yang-mengubahkan",
    title: "Doa yang Mengubahkan",
    date: "5 April 2026",
    verse: "Mintalah, maka akan diberikan kepadamu. — Matius 7:7",
    excerpt: "Doa adalah nafas kehidupan rohani yang mengubah hati dan keadaan.",
    content: [
      "Doa bukan sekadar daftar permohonan, tetapi perjumpaan pribadi dengan Bapa di sorga.",
      "Saat kita berdoa, hati kita dibentuk untuk semakin selaras dengan kehendak-Nya.",
    ],
  },
];

export type Warta = { id: number; title: string; date: string; excerpt: string };

export const warta: Warta[] = [
  {
    id: 1,
    title: "Persiapan Ibadah Paskah dan Perjamuan Kudus",
    date: "16 April 2026",
    excerpt:
      "Majelis mengundang seluruh warga jemaat untuk mengikuti ibadah persiapan Paskah pada hari Jumat dan Perjamuan Kudus hari Minggu.",
  },
  {
    id: 2,
    title: "Pelayanan Diakonia bagi Lansia",
    date: "12 April 2026",
    excerpt:
      "Tim Diakonia akan mengunjungi warga jemaat lansia di Desa Hilisimaetano pada Sabtu mendatang. Mari mendukung dalam doa.",
  },
  {
    id: 3,
    title: "Pembinaan Pemuda Resort 11",
    date: "8 April 2026",
    excerpt:
      "Pembinaan Pemuda BNKP Resort 11 akan dilaksanakan pada akhir bulan ini. Pendaftaran melalui pengurus komisi pemuda.",
  },
  {
    id: 4,
    title: "Pelatihan Sekolah Minggu",
    date: "1 April 2026",
    excerpt:
      "Pelatihan guru Sekolah Minggu akan dilaksanakan untuk meningkatkan kualitas pelayanan kepada anak-anak jemaat.",
  },
];
