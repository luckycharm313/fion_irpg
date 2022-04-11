/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import { QueryClientProvider } from 'react-query';
import Navigator from 'app/navigation';
import { RNQueryClient } from './services/react-query/query-client';

const EntryPoint: React.FC = () => {
  return (
    <QueryClientProvider client={RNQueryClient}>
      <Navigator />
    </QueryClientProvider>
  );
};

export default EntryPoint;
