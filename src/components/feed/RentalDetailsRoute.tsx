import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import RentalDetailModal from '@/components/RentalDetailModal';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '@/components/ui/dialog';
import { validRentalId } from './rentalLinks';

export async function fetchActiveRental(id:string) {
  if(!validRentalId(id)) return null;
  const {data,error}=await supabase.from('rentals').select('id,address,rent_price,bedrooms,bathrooms,sqft,property_sub_type,photos,listing_agent,remarks,town_slug')
    .eq('id',id).eq('is_active',true).maybeSingle();
  if(error) throw error;
  return data ? {...data,agency:null} : null;
}
export default function RentalDetailsRoute() {
  const [params,setParams]=useSearchParams();const id=params.get('rental');
  const valid=!!id && validRentalId(id) && params.getAll('rental').length===1;
  const detail=useQuery({queryKey:['active-rental-detail',id],enabled:valid,staleTime:0,queryFn:()=>fetchActiveRental(id || '')});
  const close=()=>{const next=new URLSearchParams(params);next.delete('rental');setParams(next,{replace:true,preventScrollReset:true});};
  if(!params.has('rental')) return null;
  if(valid && detail.data && !detail.isFetching && !detail.isError) return <RentalDetailModal rental={detail.data} open onClose={close}/>;
  return <Dialog open onOpenChange={value=>{if(!value) close();}}><DialogContent><DialogTitle>{valid && detail.isFetching ? 'Loading rental…' : 'Rental unavailable'}</DialogTitle><DialogDescription>{valid && detail.isFetching ? 'Checking the active rental record.' : 'This rental could not be found among active published records. Close to return to your results.'}</DialogDescription></DialogContent></Dialog>;
}