import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
  //beforeLoad: ({ context }) => console.log('User:', context.user),
})

function Home() {

  return (
    <div>
      <h3>Welcome Home!!!</h3>
    </div>
  )
}
