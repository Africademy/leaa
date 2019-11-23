import React from 'react';

import style from './style.module.less';

function CustomError({ statusCode }: any) {
  return (
    <div className={style['error-wrapper']}>
      <p className={style['error-message']}>
        {statusCode ? `An error ${statusCode} occurred on server!` : 'An error occurred on client!'}
      </p>
    </div>
  );
}

CustomError.getInitialProps = ({ res, err }: any) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
