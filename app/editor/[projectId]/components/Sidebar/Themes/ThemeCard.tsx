const Color = ({
  background,
  paddingBottom,
}: {
  background: string;
  paddingBottom: string;
}) => {
  return (
    <div
      className="w-full box-content absolute rounded-t-[10px]"
      style={{
        background,
        paddingBottom,
      }}
    ></div>
  );
};

interface ThemeCardProps {
  main: string;
  primary: string;
  secondary: string;
  accent: string;
}

const ThemeCard = (theme: ThemeCardProps) => {
  return (
    <div className="pb-[100%] max-w-full box-content relative overflow-hidden rounded-[12px] cursor-pointer hover:scale-105 transition-transform">
      <Color background={theme.secondary} paddingBottom="100%" />
      <Color background={theme.accent} paddingBottom="85%" />
      <Color background={theme.primary} paddingBottom="67%" />
      <Color background={theme.main} paddingBottom="41%" />
    </div>
  );
};

export default ThemeCard;
