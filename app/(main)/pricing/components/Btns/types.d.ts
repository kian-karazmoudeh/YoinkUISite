type BtnProps = {
  className?: string;
};

type SubscribeBtnProps = BtnProps & {
  onClick: () => void;
  href: string;
};

type MembershipTypeBtnProp = BtnProps & {
  label: string;
  selected: boolean;
  onChange: () => void;
};
