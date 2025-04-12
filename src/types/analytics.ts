export interface ApiResponse {
  data: any[];
  success: boolean;
}

export interface StatusData {
  _id: string;
  count: number;
}

export interface PriorityData {
  _id: string;
  count: number;
  completed: number;
}

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  index: number;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  background: string;
  cardBg: string;
  textDark: string;
  textLight: string;
  chartColors: string[];
}
