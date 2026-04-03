import React from 'react'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-grey-100 p-6'>

        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2x; font-bold'>InvoiceForge</h1>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600'>
                + New Invoice
            </button>
        </div>

        {/* Search Bar */}
        <input 
        type='text'
        placeholder='Search invoices..'
        className='w-full p-3 mb-6 rounded-xl border  focus:outline-none focus:ring-2 focus:ring-blue-400'/>

        {/* Invoice List */}
        <div className='space-y-4'>
            {invoices.length === 0 ? (
                <div className='bg-white rounded-2xl shadow p-4 text-grey-500'>No invoices yet</div>
            ):(
                invoices.map((invoice)=> (
                    <div
                    key={invoice.id}
                    className='bg-white rounded-2xl shadow p-4 flex justify-between item-center'
                    >
                        <div>
                            <p className='font-semibold'>{invoice.id}</p>
                            <p className='text-grey-500 text-sm'>{invoice.client}</p>
                        </div>

                        <p className='font-bold text-blue-500'>
                              ₹{invoice.amount}
                        </p>
                    </div>
                ))
            )}

        </div>
      
    </div>
  )
}

export default Dashboard
