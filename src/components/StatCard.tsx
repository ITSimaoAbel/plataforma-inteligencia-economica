import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, value, label, delay = 0 }: StatCardProps) => (
  <div
    className="stat-gradient flex flex-col items-center gap-2 rounded-xl p-6 text-center text-primary-foreground opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Icon className="h-8 w-8 opacity-80" />
    <span className="font-serif text-3xl">{value}</span>
    <span className="text-sm opacity-80">{label}</span>
  </div>
);

export default StatCard;
