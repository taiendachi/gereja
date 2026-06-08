// ============================================================
//  EDIT PERSONALIA DI SINI — termasuk URL foto pendeta.
// ============================================================

export type Pendeta = {
  no: number;
  nama: string;
  jk: "L" | "P";
  ttl: string;
  jabatan: string;
  periode: string;
  pelantikan: string;
  status: "Aktif" | "Emeritus" | "Non-Aktif";
  foto: string; // ← ganti URL foto di sini
};

export const pendeta: Pendeta[] = [
  {
    no: 1,
    nama: "Pdt. Yafati Laia, M.Th",
    jk: "L",
    ttl: "Hilisimaetano, 23-05-1978",
    jabatan: "Pendeta Jemaat",
    periode: "2023 - 2028",
    pelantikan: "15-07-2023",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=400&fit=crop&crop=faces",
  },
  {
    no: 2,
    nama: "Pdt. Arani Ziliwu, S.Th",
    jk: "L",
    ttl: "Hilimbowo, 19-06-1981",
    jabatan: "Pendeta Fungsional",
    periode: "2024 - 2029",
    pelantikan: "08-08-2021",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
  },
  {
    no: 3,
    nama: "Pdt. Welianawati Duha, S.Th",
    jk: "P",
    ttl: "Teluk Dalam, 01-08-1990",
    jabatan: "Pendeta Fungsional",
    periode: "2024 - 2029",
    pelantikan: "23-06-2024",
    status: "Aktif",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  },
];

export type PersonRow = {
  no: number;
  nama: string;
  alias?: string;
  jk: "L" | "P";
  jabatan: string;
  hp?: string;
  periode: string;
  status?: string;
};

export const bpmj: PersonRow[] = [
  { no: 1, nama: "SNK. Faogosokhi Zai",    alias: "Ama Dian Zai",    jk: "L", jabatan: "Ketua",       hp: "0812-6481-524",  periode: "2022 - 2027", status: "Aktif" },
  { no: 2, nama: "SNK. Sokhinaha Hulu",    alias: "Ama Leo Hulu",    jk: "L", jabatan: "Sekretaris",  hp: "0813-6177-6167", periode: "2022 - 2027", status: "Aktif" },
  { no: 3, nama: "SNK. Atozisokhi Lase",   alias: "Ama Anjeli Lase", jk: "L", jabatan: "Bendahara",   hp: "0813-7578-9537", periode: "2022 - 2027", status: "Aktif" },
  { no: 4, nama: "Pdt. Yafati Laia, M.Th", alias: "Ama Forlan Laia", jk: "L", jabatan: "Anggota — Pdt. Jemaat", hp: "0852-6227-0461", periode: "2022 - 2027", status: "Aktif" },
  { no: 5, nama: "Reformasi Hia, ST",      alias: "Ama Lestin Hia",  jk: "L", jabatan: "Anggota — Bidang Pelayanan", hp: "0813-9662-0013", periode: "2022 - 2027", status: "Aktif" },
  { no: 6, nama: "SNK. Fn. Lase, S.Pd",    alias: "Ama Ferdin Lase", jk: "L", jabatan: "Anggota — Bidang Pelayanan", hp: "0852-7711-6357", periode: "2022 - 2027", status: "Aktif" },
  { no: 7, nama: "SNK. Fangosara Gulo",    alias: "Ama Steven Gulo", jk: "L", jabatan: "Anggota — Bidang Pembangunan", hp: "0812-6561-8916", periode: "2022 - 2027", status: "Aktif" },
];

export const bppj: PersonRow[] = [
  { no: 1, nama: "Toroziduhu Gea, SE., M.Si", alias: "Ama Sona Gea",     jk: "L", jabatan: "Ketua",      hp: "—",              periode: "2022 - 2027", status: "Aktif" },
  { no: 2, nama: "Eliezer Hulu, ST",          alias: "Ama Danica Hulu",  jk: "L", jabatan: "Sekretaris", hp: "0813-6179-1417", periode: "2022 - 2027", status: "Aktif" },
  { no: 3, nama: "Herman Harefa",             alias: "Ama Agil Harefa",  jk: "L", jabatan: "Anggota",    hp: "—",              periode: "2022 - 2027", status: "Aktif" },
  { no: 4, nama: "Akirani Lase",              alias: "Ama Ones Lase",    jk: "L", jabatan: "Anggota",    hp: "0812-9822-776",  periode: "2022 - 2027", status: "Aktif" },
  { no: 5, nama: "Robby Putra Zalukhu",       alias: "Ama Gamaliel",     jk: "L", jabatan: "Anggota",    hp: "—",              periode: "2022 - 2027", status: "Aktif" },
];

export type SnkRow = {
  no: number;
  nama: string;
  alias?: string;
  jk: "L" | "P";
  lingkungan: string;
  jlhKK: number;
  jlhJiwa: number;
  hp?: string;
  periode: string;
  status: string;
};

export const snk: SnkRow[] = [
  { no: 1, nama: "SNK. Imelda Waruwu, S.Pd",      alias: "Ina Danica Hulu",      jk: "P", lingkungan: "Lingkungan I",   jlhKK: 12, jlhJiwa: 42, hp: "0813-7575-7470", periode: "2022-2027", status: "Aktif" },
  { no: 2, nama: "SNK. Yanuari Telaumbanua",      alias: "Ama Yeni Telaumbanua", jk: "L", lingkungan: "Lingkungan I",   jlhKK: 14, jlhJiwa: 63, hp: "0822-6780-0101", periode: "2022-2027", status: "Aktif" },
  { no: 3, nama: "SNK. Yasohati Sarumaha, M.Kom", alias: "Ama Carissa",          jk: "L", lingkungan: "Lingkungan II",  jlhKK: 9,  jlhJiwa: 40, hp: "0813-6105-3600", periode: "2022-2027", status: "Aktif" },
  { no: 4, nama: "SNK. Toroziduhu Daeli",         alias: "Ama Mbuala Daeli",     jk: "L", lingkungan: "Lingkungan II",  jlhKK: 8,  jlhJiwa: 28, hp: "0813-7734-3048", periode: "2022-2027", status: "Aktif" },
  { no: 5, nama: "SNK. Nematulo Gulo",            alias: "Ama Titin Gulo",       jk: "L", lingkungan: "Lingkungan III", jlhKK: 9,  jlhJiwa: 27, hp: "0821-6851-8754", periode: "2022-2027", status: "Aktif" },
  { no: 6, nama: "SNK. Yuniriang Zendrato",       alias: "Ina Sonia Waruwu",     jk: "P", lingkungan: "Lingkungan III", jlhKK: 11, jlhJiwa: 33, hp: "0813-7092-6448", periode: "2022-2027", status: "Aktif" },
  { no: 7, nama: "SNK. Famoni Mendrofa",          alias: "Ama Rizki Mendrofa",   jk: "L", lingkungan: "Lingkungan IV",  jlhKK: 11, jlhJiwa: 53, hp: "0813-7614-3209", periode: "2022-2027", status: "Aktif" },
  { no: 8, nama: "SNK. Libertini Hartamei Laowo", alias: "Ina Rita Zendrato",    jk: "P", lingkungan: "Lingkungan IV",  jlhKK: 7,  jlhJiwa: 29, hp: "0812-6502-0788", periode: "2022-2027", status: "Aktif" },
  { no: 9, nama: "SNK. Fatimesia Telaumbanua",    alias: "Ina Restu Mendrofa",   jk: "P", lingkungan: "Lingkungan V",   jlhKK: 8,  jlhJiwa: 30, hp: "—",              periode: "2022-2027", status: "Aktif" },
];
