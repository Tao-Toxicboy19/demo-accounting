import { JSX } from 'react';

// HydrateFallback is rendered while the client loader is running
export default function HydrateFallback(): JSX.Element {
  return <div>Loading...</div>;
}
