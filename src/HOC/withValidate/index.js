import React, { useEffect, useState, Fragment } from 'react';

const withMenu = WrappedComponent => ({
  configFields,
  ...wrappedComponentProps
}) => {
  const [fields, setFields] = useState({});

  useEffect(() => {

  }, []);

  const onFieldChange = (value) => {
    console.log(value);
  };


  return (
    <Fragment>
      <WrappedComponent
        onFieldChange={onFieldChange}
        {...wrappedComponentProps}
      />
    </Fragment>
  );
};

export default withMenu;
