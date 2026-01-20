interface IStatBlockProps {
  label: string;
  value: string | number;
  labelClassName?: string;
  valueClassName?: string;
  reverse?: boolean
}

const StatBlock = ({
  label,
  value,
  labelClassName,
  valueClassName,
  reverse = false
}: IStatBlockProps) => {
  return (
    <div className={`flex ${reverse ? 'flex-col-reverse' : 'flex-col'}`}>
      <span
        className={
          "font-medium text-[14px] whitespace-nowrap " + valueClassName
        }
      >
        {value}
      </span>
      <span
        className={
          "block leading-4 font-medium text-muted-foreground text-[12px] " +
          labelClassName
        }
      >
        {label}
      </span>
    </div>
  );
};

export default StatBlock;
