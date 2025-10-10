'use client'

import DetalleFacturaTable from '@/components/Detallefactura/DetalleFacturaTable'
import { useParams } from 'next/navigation';
export default function Page() {
    return (
        <div>
            
            <DetalleFacturaTable  /> 
        </div>
    );
}