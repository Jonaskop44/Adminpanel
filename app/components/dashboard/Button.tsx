import React from "react";

interface LicenseButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: string;
}

const LicenseButton: React.FC<LicenseButtonProps> = ({
  type = "button",
  children,
  onClick,
  disabled,
  style,
}) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={style}>
      {children}
    </button>
  );
};

export default LicenseButton;
