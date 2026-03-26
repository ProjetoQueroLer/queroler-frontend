export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  dataTestId?: string;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  dataTestId?: string;
};
