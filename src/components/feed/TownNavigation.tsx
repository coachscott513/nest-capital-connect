import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TownNavigation({town,towns,onSelect,dark,large}:{town:string;towns:{slug:string;name:string}[];onSelect:(slug:string)=>void;dark:boolean;large:boolean}) {
  const [open,setOpen]=useState(false);const [find,setFind]=useState('');
  const select=(slug:string)=>{onSelect(slug);setOpen(false);};
  const list=(mobile:boolean)=><>
    <label>Find a town<input type="search" aria-label={mobile ? 'Find a town in drawer' : 'Find a town'} value={find} onChange={e=>setFind(e.target.value)} placeholder="Town name"/></label>
    <nav aria-label={mobile ? 'Choose a town' : 'Feed towns'} className="feed-town-list">
      <Link to="?" aria-current={!town ? 'location' : undefined} onClick={e=>{e.preventDefault();select('');}}>All towns</Link>
      {towns.filter(t=>t.name.toLowerCase().includes(find.toLowerCase())).map(t=><Link key={t.slug} to={`?town=${t.slug}`} aria-current={town===t.slug ? 'location' : undefined} onClick={e=>{e.preventDefault();select(t.slug);}}>{t.name}</Link>)}
      {!towns.some(t=>t.name.toLowerCase().includes(find.toLowerCase())) && <p role="status">No matching towns.</p>}
    </nav>
  </>;
  return <>
    <aside className="feed-town-sidebar"><h2>Towns</h2>{list(false)}</aside>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild><Button className="feed-towns-trigger" variant="outline"><MapPin/>Towns{town && <span> · {towns.find(t=>t.slug===town)?.name || town}</span>}</Button></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="feed-town-overlay"/>
        <Dialog.Content className={`nest-feed feed-town-drawer${dark ? ' feed-dark' : ''}${large ? ' feed-large' : ''}`}>
          <Dialog.Title>Towns</Dialog.Title><Dialog.Description className="sr-only">Choose a town for the current results.</Dialog.Description>
          <Dialog.Close asChild><Button variant="ghost" size="icon" className="feed-drawer-close" aria-label="Close towns"><X/></Button></Dialog.Close>
          {list(true)}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}