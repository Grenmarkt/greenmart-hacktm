import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/checkOut')({
  component: CheckoutPage,
})

interface SellerDetails {
  farmName: string;
  address: string;
  workingHours: {
    Luni: string;
    Marti: string;
    Miercuri: string;
    Joi: string;
    Vineri: string;
    Sambata: string;
    Duminica: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  })

  // Mock seller data - in a real app, this would come from props or API
  const [sellerDetails] = useState<SellerDetails>({
    farmName: "Ferma Eco",
    address: "Strada Agricultorilor 42, Timișoara",
    workingHours: {
      Luni: "9:00 - 18:00",
      Marti: "9:00 - 18:00",
      Miercuri: "9:00 - 18:00",
      Joi: "9:00 - 18:00",
      Vineri: "9:00 - 18:00",
      Sambata: "10:00 - 15:00",
      Duminica: "Închis"
    },
    location: { lat: 45.7494, lng: 21.2272 }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle checkout submission
    console.log('Checkout submitted:', formData)
    alert('Comanda a fost plasată cu succes! Veți primi instrucțiuni de ridicare prin email.')
  }

  return (
    <div className="checkout-page container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finalizare comandă</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Customer Information */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Date de facturare</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Prenume</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nume</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Număr de telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="07xxxxxxxx"
                />
              </div>
            </div>

            {/* Seller and Pickup Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Detalii despre vânzător și ridicarea produselor</h2>
              
              <div className="mt-4">
                <h3 className="font-medium">Nume Fermă:</h3>
                <p>{sellerDetails.farmName}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium">Adresă de ridicare:</h3>
                <p>{sellerDetails.address}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium">Program de lucru:</h3>
                <ul className="mt-2 space-y-1">
                  {Object.entries(sellerDetails.workingHours).map(([day, hours]) => (
                    <li key={day} className="flex justify-between">
                      <span>{day}:</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  După plasarea comenzii, veți primi un email de confirmare cu instrucțiuni de ridicare.
                  Vă rugăm să aduceți buletinul și confirmarea comenzii când veniți să ridicați produsele.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Metodă de plată</h2>
              <p className="mb-4">Plată cu cardul</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Număr card</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Nume de pe card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="ION POPESCU"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data expirării</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Finalizează comanda
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Sumar comandă</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>99.99 RON</span>
            </div>
            <div className="flex justify-between">
              <span>TVA</span>
              <span>19.00 RON</span>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>118.99 RON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}