const YoinkFile = () => {
  return (
    <div className="leading-[1.42857] w-full min-w-0 text-sm flex relative flex-col gap-2  p-3 rounded-md cursor-pointer border border-zinc-800 hover:bg-zinc-900 hover:border-l-4 hover:border-l-sky-400 transition-all duration-300">
      <div className="pr-1 flex items-center gap-3">
        <a
          href="/chat/api/profile/redirect?userId=Gn4IQx4PEIX3drZH0D9qN1AI"
          className="block cursor-pointer"
        >
          <span className="bg-white/12 shrink-0 flex relative overflow-hidden justify-center items-center cursor-pointer rounded-[2.68435e+07px] size-9">
            <img
              className='bg-cover bg-[url("https://vercel.com/api/www/avatar/Gn4IQx4PEIX3drZH0D9qN1AI")] object-cover cursor-pointer size-full'
              alt="Avatar"
              title=""
              src="https://placehold.co/256x256"
            />
          </span>
        </a>
        <a
          className="flex items-center cursor-pointer gap-3"
          href="/community/Zz6mBLdU9bC"
        >
          <div className="flex flex-col cursor-pointer gap-[6px]">
            <div className="leading-[1] font-medium overflow-hidden cursor-pointer">
              v0.me
            </div>
            <div className="text-zinc-400 flex items-center cursor-pointer gap-[6px]">
              <svg
                className="fill-black stroke-[1px] overflow-hidden cursor-pointer size-3"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.75 1.75V1H3.25V1.75V9.09451C1.95608 9.42754 1 10.6021 1 12C1 13.6569 2.34315 15 4 15C5.42051 15 6.61042 14.0127 6.921 12.6869C8.37102 12.4872 9.7262 11.8197 10.773 10.773C11.8197 9.7262 12.4872 8.37102 12.6869 6.921C14.0127 6.61042 15 5.42051 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.37069 9.91924 6.52667 11.1749 6.8851C10.9929 7.94904 10.4857 8.9389 9.71231 9.71231C8.9389 10.4857 7.94904 10.9929 6.8851 11.1749C6.59439 10.1565 5.77903 9.35937 4.75 9.09451V1.75ZM13.5 4C13.5 4.82843 12.8284 5.5 12 5.5C11.1716 5.5 10.5 4.82843 10.5 4C10.5 3.17157 11.1716 2.5 12 2.5C12.8284 2.5 13.5 3.17157 13.5 4ZM4 13.5C4.82843 13.5 5.5 12.8284 5.5 12C5.5 11.1716 4.82843 10.5 4 10.5C3.17157 10.5 2.5 11.1716 2.5 12C2.5 12.8284 3.17157 13.5 4 13.5Z"
                  className="fill-zinc-400 stroke-[1px] inline cursor-pointer"
                ></path>
              </svg>
              <span className="leading-[1] text-[13px] block cursor-pointer">
                528 Forks
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default YoinkFile;
