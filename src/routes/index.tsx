import { Button, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  return (
    <div>
      <Stack spacing={2} direction="row" sx={{ m: 2 }}>
        <Button variant="contained" color="primary" onClick={() => alert("Hello World")}>
          Click Me
        </Button>
        <Button variant="contained" color="secondary" onClick={() => alert("Hello World")}>
          Click Me 2
        </Button>
      </Stack>
    </div>
  )
}
