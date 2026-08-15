import React, { useState } from 'react';

export default function App(){
  const [count, setCount] = useState<number>(0);

  return (
    <div>
        <h1>Welcome to My React App</h1>
    </div>
  );
}