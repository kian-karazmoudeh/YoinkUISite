const GoogleIcon = () => {
  return (
    <span className="flex items-center cursor-pointer size-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="24"
        width="24"
        className="fill-black stroke-[1px] overflow-hidden align-baseline cursor-pointer size-full"
      >
        <path
          d="M386 400c45-42 65-112 53-179H260v74h102c-4 24-18 44-38 57z"
          className="fill-blue-500 stroke-[1px] inline cursor-pointer"
        ></path>
        <path
          d="M90 341a192 192 0 0 0 296 59l-62-48c-53 35-141 22-171-60z"
          className="fill-green-600 stroke-[1px] inline cursor-pointer"
        ></path>
        <path
          d="M153 292c-8-25-8-48 0-73l-63-49c-23 46-30 111 0 171z"
          className="fill-amber-400 stroke-[1px] inline cursor-pointer"
        ></path>
        <path
          d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55z"
          className="fill-[#ea4335] stroke-[1px] inline cursor-pointer"
        ></path>
      </svg>
    </span>
  );
};

export default GoogleIcon;
