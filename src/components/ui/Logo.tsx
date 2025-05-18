import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface LogoProps {
  isLight?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isLight = false }) => {
  const textClasses = classNames(
    'font-heading font-bold text-xl flex items-center',
    {
      'text-white': isLight,
      'text-primary-500': !isLight,
    }
  );

  return (
    <Link to="/" className={textClasses}>
      <Compass size={28} className="mr-2 text-secondary-500" />
      <span>Horizon Voyages</span>
    </Link>
  );
};

export default Logo;