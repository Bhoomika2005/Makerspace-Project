// import Image from 'next/image'

// const machines = [
//   {
//     name: "3D Printer",
//     description: "High-precision 3D printer for rapid prototyping and small-scale manufacturing.",
//     image: "/placeholder.svg?height=300&width=300"
//   },
//   {
//     name: "Laser Cutter",
//     description: "Powerful laser cutter for precise cutting and engraving of various materials.",
//     image: "/placeholder.svg?height=300&width=300"
//   },
//   {
//     name: "CNC Router",
//     description: "Computer-controlled cutting machine for woodworking and metalworking projects.",
//     image: "/placeholder.svg?height=300&width=300"
//   },
//   // Add more machines as needed
// ]

// export default function MachineryPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {machines.map((machine, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <Image
//               src={machine.image}
//               alt={machine.name}
//               width={300}
//               height={300}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold mb-2">{machine.name}</h2>
//               <p className="text-gray-600">{machine.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// import Image from 'next/image'

// const machines = [
//   {
//     name: "3D Printer",
//     description: "High-precision 3D printer for rapid prototyping and small-scale manufacturing.",
//     image: "/images/facilities/3dPrinter.jpeg?height=300&width=300",
//     capabilities: [
//       "Resolution: 50-400 microns",
//       "Build Volume: 250 x 250 x 300 mm",
//       "Materials: PLA, ABS, PETG, TPU",
//       "Dual extruder for multi-material printing"
//     ]
//   },
//   {
//     name: "Laser Cutter",
//     description: "Powerful laser cutter for precise cutting and engraving of various materials.",
//     image: "/images/facilities/laserCutter.jpeg?height=300&width=300",
//     capabilities: [
//       "Working Area: 900 x 600 mm",
//       "Laser Power: 80W CO2 laser tube",
//       "Materials: Wood, Acrylic, Leather, Paper",
//       "Precision: 0.025mm"
//     ]
//   },
//   {
//     name: "CNC Router",
//     description: "Computer-controlled cutting machine for woodworking and metalworking projects.",
//     image: "/images/facilities/cncRouter.jpeg?height=300&width=300",
//     capabilities: [
//       "Working Area: 1200 x 1200 x 150 mm",
//       "Spindle Speed: 24,000 RPM",
//       "Materials: Wood, Soft Metals, Plastics",
//       "3-axis movement with optional 4th axis"
//     ]
//   },
// ]

// export default function MachineryPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="space-y-12">
//         {machines.map((machine, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <Image
//                   src={machine.image}
//                   alt={machine.name}
//                   width={300}
//                   height={300}
//                   className="h-48 w-full object-cover md:h-full md:w-48"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
//                 <p className="text-gray-600 mb-4">{machine.description}</p>
//                 <h3 className="text-lg font-semibold mb-2">Capabilities:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   {machine.capabilities.map((capability, capIndex) => (
//                     <li key={capIndex}>{capability}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import Image from 'next/image'
// import Link from 'next/link'

// async function getMachines() {
//   const res = await fetch('http://localhost:8000/api/equipment/', {
//     cache: 'no-store',
//     credentials: 'include'  // This will send cookies with the request
//   })
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// export default async function MachineryPage() {
//   const machines = await getMachines()

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="space-y-12">
//         {machines.map((machine: any, index: number) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <Image
//                   src={machine.image || '/placeholder.svg?height=300&width=300'}
//                   alt={machine.name}
//                   width={300}
//                   height={300}
//                   className="h-48 w-full object-cover md:h-full md:w-48"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
//                 <p className="text-gray-600 mb-4">{machine.model_number}</p>
//                 <h3 className="text-lg font-semibold mb-2">Details:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   <li>Quantity: {machine.quantity}</li>
//                   <li>Manufacturer: {machine.manufacturer}</li>
//                   <li>Available: {machine.is_available ? 'Yes' : 'No'}</li>
//                 </ul>
//                 {machine.is_admin && (
//                   <Link href={`/admin/equipment/${machine.id}/change/`} className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                     Edit (Admin)
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import Image from 'next/image'

// async function getMachines() {
//   const res = await fetch('http://localhost:8000/api/equipment/', { cache: 'no-store' })
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// export default async function MachineryPage() {
//   const machines = await getMachines()

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="space-y-12">
//         {machines.map((machine: any, index: number) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <Image
//                   src={`/images/facilities/${machine.name.replace(/\s+/g, '')}.jpeg`}
//                   alt={machine.name}
//                   width={300}
//                   height={300}
//                   className="h-48 w-full object-cover md:h-full md:w-48"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
//                 <p className="text-gray-600 mb-4">{machine.model_number}</p>
//                 <h3 className="text-lg font-semibold mb-2">Details:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   <li>Quantity: {machine.quantity}</li>
//                   <li>Manufacturer: {machine.manufacturer}</li>
//                   <li>Available: {machine.is_available ? 'Yes' : 'No'}</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// import Image from 'next/image'
// import Link from 'next/link'

// async function getMachines() {
//   const res = await fetch('http://localhost:8000/api/equipment/', {
//     cache: 'no-store',
//     credentials: 'include'  // This will send cookies with the request
//   })
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

// export default async function MachineryPage() {
//   const machines = await getMachines()

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="space-y-12">
//         {machines.map((machine: any, index: number) => (
//           <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <Image
//                   src={machine.image || '/placeholder.svg?height=300&width=300'}
//                   alt={machine.name}
//                   width={300}
//                   height={300}
//                   className="h-48 w-full object-cover md:h-full md:w-48"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
//                 <p className="text-gray-600 mb-4">{machine.model_number}</p>
//                 <h3 className="text-lg font-semibold mb-2">Details:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   <li>Quantity: {machine.quantity}</li>
//                   <li>Manufacturer: {machine.manufacturer}</li>
//                   <li>Available: {machine.is_available ? 'Yes' : 'No'}</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'

// interface Machine {
//   id: number
//   name: string
//   quantity: number
//   manufacturer: string
//   model_number: string
//   is_available: boolean
//   image: string | null
// }

// export default function MachineryPage() {
//   const [machines, setMachines] = useState<Machine[]>([])
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [editingMachine, setEditingMachine] = useState<Machine | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     fetchMachines()
//     checkAdminStatus()
//   }, [])

//   const fetchMachines = async () => {
//     const res = await fetch('http://localhost:8000/api/equipment/', {
//       credentials: 'include'
//     })
//     if (res.ok) {
//       const data = await res.json()
//       setMachines(data)
//     }
//   }

//   const checkAdminStatus = async () => {
//     const res = await fetch('http://localhost:8000/api/check-admin/', {
//       credentials: 'include'
//     })
//     if (res.ok) {
//       const data = await res.json()
//       setIsAdmin(data.is_admin)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (confirm('Are you sure you want to delete this machine?')) {
//       const res = await fetch(`http://localhost:8000/api/equipment/${id}/delete_equipment/`, {
//         method: 'DELETE',
//         credentials: 'include'
//       })
//       if (res.ok) {
//         setMachines(machines.filter(machine => machine.id !== id))
//       }
//     }
//   }

//   const handleEdit = (machine: Machine) => {
//     setEditingMachine(machine)
//   }

//   const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!editingMachine) return

//     const formData = new FormData(e.currentTarget)
//     const res = await fetch(`http://localhost:8000/api/equipment/${editingMachine.id}/update_equipment/`, {
//       method: 'PATCH',
//       body: formData,
//       credentials: 'include'
//     })

//     if (res.ok) {
//       const updatedMachine = await res.json()
//       setMachines(machines.map(machine =>
//         machine.id === updatedMachine.id ? updatedMachine : machine
//       ))
//       setEditingMachine(null)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
//       <div className="space-y-12">
//         {machines.map((machine) => (
//           <div key={machine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="md:flex">
//               <div className="md:flex-shrink-0">
//                 <Image
//                   src={machine.image || '/placeholder.svg?height=300&width=300'}
//                   alt={machine.name}
//                   width={300}
//                   height={300}
//                   className="h-48 w-full object-cover md:h-full md:w-48"
//                 />
//               </div>
//               <div className="p-8">
//                 <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
//                 <p className="text-gray-600 mb-4">{machine.model_number}</p>
//                 <h3 className="text-lg font-semibold mb-2">Details:</h3>
//                 <ul className="list-disc list-inside text-gray-600">
//                   <li>Quantity: {machine.quantity}</li>
//                   <li>Manufacturer: {machine.manufacturer}</li>
//                   <li>Available: {machine.is_available ? 'Yes' : 'No'}</li>
//                 </ul>
//                 {isAdmin && (
//                   <div className="mt-4">
//                     <button
//                       onClick={() => handleEdit(machine)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(machine.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {editingMachine && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//             <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Machine</h3>
//             <form onSubmit={handleUpdate}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                   Name
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="name"
//                   type="text"
//                   name="name"
//                   defaultValue={editingMachine.name}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
//                   Quantity
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="quantity"
//                   type="number"
//                   name="quantity"
//                   defaultValue={editingMachine.quantity}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturer">
//                   Manufacturer
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="manufacturer"
//                   type="text"
//                   name="manufacturer"
//                   defaultValue={editingMachine.manufacturer}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model_number">
//                   Model Number
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="model_number"
//                   type="text"
//                   name="model_number"
//                   defaultValue={editingMachine.model_number}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_available">
//                   Available
//                 </label>
//                 <input
//                   className="mr-2 leading-tight"
//                   id="is_available"
//                   type="checkbox"
//                   name="is_available"
//                   defaultChecked={editingMachine.is_available}
//                 />
//                 <span className="text-sm">Is Available</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   type="submit"
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   type="button"
//                   onClick={() => setEditingMachine(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'

async function getMachines() {
  const res = await fetch('http://localhost:8000/api/equipment/', { 
    cache: 'no-store',
    credentials: 'include'  // This will send cookies with the request
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function MachineryPage() {
  const machines = await getMachines()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Machinery</h1>
      <div className="space-y-12">
        {machines.map((machine: any, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <Image
                  src={machine.image || '/placeholder.svg?height=300&width=300'}
                  alt={machine.name}
                  width={300}
                  height={300}
                  className="h-48 w-full object-cover md:h-full md:w-48"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-2">{machine.name}</h2>
                <p className="text-gray-600 mb-4">{machine.model_number}</p>
                <h3 className="text-lg font-semibold mb-2">Details:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Quantity: {machine.quantity}</li>
                  <li>Manufacturer: {machine.manufacturer}</li>
                  <li>Available: {machine.is_available ? 'Yes' : 'No'}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

