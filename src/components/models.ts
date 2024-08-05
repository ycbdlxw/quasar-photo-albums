export interface Meta {
  totalCount: number;
}
export interface Photo {
  id: string;
  url: string;
  date: Date;
}
export interface YearMonth {
  year: number;
  month: number;
  photos: string; // 修改为正确的类型
}
