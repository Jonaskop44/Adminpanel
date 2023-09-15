import React from "react";

interface LicenseButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  style?: string;
}

const LicenseButton: React.FC<LicenseButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
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
