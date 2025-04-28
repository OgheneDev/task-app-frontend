import { useTheme } from '@/hooks/useTheme';

interface PasswordStrengthIndicatorProps {
  passwordChecks: Record<string, boolean>;
  getPasswordStrength: () => { strength: string; color: string };
}

export const PasswordStrengthIndicator = ({ passwordChecks, getPasswordStrength }: PasswordStrengthIndicatorProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex-1 h-1.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              Object.values(passwordChecks).filter(Boolean).length > index
                ? getPasswordStrength().color
                : isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
        </div>
      ))}
      <span className="text-xs ml-2">{getPasswordStrength().strength}</span>
    </div>
  );
};
