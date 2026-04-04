import React from 'react'

const InvoicePreview = ({ invoice }) => {
    if( !invoice ) return null;
  return (
    <div className='bg-white p-8 rounded-2xl shadow max-w-3xl mx-auto'>

        {/* Header */}
        <div className='flex justify-between mb-6'>
            <h1 className='text-2xl font-bold'>INVOICE</h1>
            <div className='text-right'>
                <p className='font-semibold'>{invoice.id}</p>
                <p className='text-grey-500 text-sm'>
                    {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>

        {/* Client */}
        <div className='mb-6'>
            <p className='text-grey-500 text-sm'>Bill To:</p>
            <p className='font-semibold text-lg'>{invoice.client}</p>
        </div>

        {/* Items Table */}
        <table className='w-full mb-6 border-collapse'>
            <thead>
                <tr className='bg-gray-100 text-left'>
                    <th className='p-2'>Item</th>
                    <th className='p-2'>Qty</th>
                    <th className='p-2'>Price</th>
                    <th className='p-2'>Total</th>
                </tr>
            </thead>
            <tbody>
                {invoice.items.map((item,index) =>(
                    <tr key={index} className='border-b'>
                        <td className='p-2'>{item.name}</td>
                        <td className='p-2'>{item.quantity}</td>
                        <td className='p-2'>₹{item.price}</td>
                        <td className='p-2'>₹{item.quantity *item.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
      {/* Summary */}
      <div className='text-right space-y-2'>
        <p>Subtotal :₹{invoice.subtotal}</p>
        <p>Tax: ₹{invoice.taxAmount}</p>
        <p className='text-xl font-bold'>
            Total: ₹{invoice.total}
        </p>
      </div>
    </div>
  )
}

export default InvoicePreview
