import {Search} from './Search';
import {Logo} from './Logo';
import {NumResults} from './NumResults';

export const Header = () => {

  return (
    <nav className="nav-bar">
      <Logo/>
      <Search/>
      <NumResults/>
    </nav>
  );
};

