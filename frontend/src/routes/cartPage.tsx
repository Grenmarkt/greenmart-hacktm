import CartPage from '@/components/cartPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cartPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return 
  <CartPage />
}
