import cn from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';

type ButtonProps = {
  type?: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { handleClick, children, type } = props;

  return (
    <button
      className={cn(
        'block',
        'mx-auto',
        'rounded-md',
        'px-3',
        'py-2',
        'text-sm',
        'font-semibold',
        'hover:bg-teal-400',
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-lime-500',
        'bg-teal-600',
        'text-teal-200',
        {
          'bg-transparent text-teal-600 border border-teal-400 ml-0':
            type === 'secondary',
        },
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
