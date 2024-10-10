// import { describe, it, expect } from 'vitest'

// describe('A truthy statement', () => {
//   it('should be equal to 2', () => {
//     expect(1+1).toEqual(2)
//   })
// })
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../src/Context/ThemeContext'
import { AuthProvider } from '../src/Context/AuthContext'

describe('App', () => {
  it('renders the App component', () => {
    render(
    
      <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    )
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})