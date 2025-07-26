import { Children } from "react";

const Category = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className='text-white leading-[1.5] border-b-white/7 border-b-[0.8px] font-[GeistSans,_\"GeistSans_Fallback\",_ui-sans-serif,_system-ui,_sans-serif,_\"Apple_Color_Emoji\",_\"Segoe_UI_Emoji\",_\"Segoe_UI_Symbol\",_\"Noto_Color_Emoji\"] fill-black stroke-[1px] flex box-border flex-col p-3 gap-3'>
      <div className="leading-[16px] text-xs fill-black stroke-[1px] box-border font-medium">
        {title}
      </div>
      {children}
    </div>
  );
};

export default Category;
