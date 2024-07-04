import { Link } from 'react-router-dom';

type ListLinkItemProps = {
  id: number;
  name: string;
  redirect: string;
};

export const ListLinkItem = (props: ListLinkItemProps) => {
  const { id, name, redirect } = props;
  return (
    <li className='mb-1' key={id}>
      <Link
        className='text-lg underline visited:text-teal-700 hover:text-teal-500'
        to={`/${redirect}/${id}`}
      >
        {name}
      </Link>
    </li>
  );
};
