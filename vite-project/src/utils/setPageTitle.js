import { useEffect } from 'react';

const setPageTitle = (title) => {
  useEffect(() => {
    document.title = `Learning Portal - ${title}`;
  }, [title]);
};

export default setPageTitle;
