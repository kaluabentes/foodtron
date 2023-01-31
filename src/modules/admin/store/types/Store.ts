interface Store {
  id: string
  name: string | null
  category: string | null
  logo: string | null
  cover: string | null
  address: string | null
  whatsapp: string | null
  facebook: string | null
  instagram: string | null
  subdomain: string | null
  customDomain: string | null
  minimumOrderPrice: Number | null
  isOpen: boolean | null
}

export default Store
