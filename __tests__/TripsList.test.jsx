import React from 'react'
import { render, screen } from '@testing-library/react'
import TripsList from '@/components/TripsList'

describe('TripsList', () => {
  it('renders a list of trips', () => {
    const trips = [
      { id: 1, name: 'Trip One', description: '', coverImageUrl: '', startDate: '', endDate: '' },
      { id: 2, name: 'Trip Two', description: '', coverImageUrl: '', startDate: '', endDate: '' },
    ]
    render(<TripsList trips={trips} />)
    expect(screen.getByText('Trip One')).toBeInTheDocument()
    expect(screen.getByText('Trip Two')).toBeInTheDocument()
  })
})
