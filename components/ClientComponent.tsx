'use client';

import React, { useState } from 'react';

const ClientComponent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const logout = (): void => {
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return <button className="logOut" onClick={logout}>Log Out</button>;
  } else {
    return null;
  }
}

export default ClientComponent;