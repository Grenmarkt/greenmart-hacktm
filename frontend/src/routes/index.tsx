import { createFileRoute } from '@tanstack/react-router';
import Homepage from '../components/homepage';
export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Homepage />
  );
}
