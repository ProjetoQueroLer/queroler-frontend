import { cn } from '@/presentation/shared/lib/utils';
import { InputProps } from '@/presentation/shared/ui-model/shared.model';

export const Input = ({
  label,
  icon,
  id,
  dataTestId,
  registerWithMaskConfig,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-zinc-400 tracking-widest uppercase pl-1"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'input-container flex items-center gap-2 px-3 py-2 bg-background-input rounded-lg border border-border-default',
          'hover:border-border-hover',
          props.disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {icon && <span className="text-zinc-500 text-lg">{icon}</span>}
        <input
          id={id}
          aria-label={!label ? props.placeholder : undefined}
          data-testid={dataTestId}
          {...props}
          {...(registerWithMaskConfig || {})}
          className={cn(
            'flex-1 h-11 outline-none text-zinc-100 placeholder:text-placeholder text-base md:text-sm',
            icon ? 'pl-0' : 'pl-1',
            props.className
          )}
        />
      </div>
    </div>
  );
};
