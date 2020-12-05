import React from 'react';

type AppProps = {
  className?: string;
};

export default ({
  className,
}: AppProps): JSX.Element => {

  return (
    <div className={className}>
      TODO:: Load and save config
    </div>
  );
};
