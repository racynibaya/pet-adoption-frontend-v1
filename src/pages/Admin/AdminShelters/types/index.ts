export interface AggregatedShelter {
  id: number
  name: string
  city: string
  address: string
  contactEmail: string
  phoneNumber: string
  pets: { total: number; available: number; pending: number; adopted: number }
}
