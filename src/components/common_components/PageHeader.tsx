interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="flex justify-between items-center mb-8 sm:gap-0 gap-2 flex-wrap">
      <div>
        <h2 className="xl:text-3xl text-2xl font-semibold text-[#1E1E1E] font-[poppins] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="xl:text-sm text-[#1E1E1E] font-normal font-[poppins]">
            {subtitle}
          </p>
        )}
      </div>

      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};

export default PageHeader;
