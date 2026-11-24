import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import GlobalSearchCommand from './GlobalSearchCommand';
import { SECTION_DEFS, type MegaSection } from './publicNavigationData';
import { homepageNavigationHref } from './publicNavigationModel';
import './publicNavigation.css';

interface NavGroup {key:string;label:string;columns:MegaSection['columns'];}
export default function PublicNavigation({settings}:{settings?:ReactNode}) {
  const {pathname,search}=useLocation();const [open,setOpen]=useState<string|null>(null);const [mobile,setMobile]=useState(false);const [searchOpen,setSearchOpen]=useState(false);
  const home=(changes:Record<string,string>)=>homepageNavigationHref(pathname,search,changes);
  const legacy=(keys:string[])=>SECTION_DEFS.filter(s=>keys.includes(s.key)).flatMap(s=>[
    ...(s.href ? [{title:s.label,links:[{label:`${s.label} overview`,href:s.href}]}] : []),...s.columns,
  ]);
  const groups:NavGroup[]=[
    {key:'browse',label:'Browse',columns:[{title:'Published inventory',links:[{label:'Browse all',href:home({view:'browse',type:'all'})},{label:'Homes',href:home({view:'browse',type:'property'})},{label:'Rentals',href:home({view:'browse',type:'rentals'})},{label:'Businesses',href:home({view:'browse',type:'business'})},{label:'Events',href:home({type:'events'})}]}]},
    {key:'towns',label:'Towns',columns:[{title:'Town guides',links:[{label:'All communities',href:'/communities'},...['Albany','Delmar','Clifton Park','Saratoga Springs','Schenectady','Troy','Voorheesville','Glenville'].map(label=>({label,href:`/towns/${label.toLowerCase().replace(/ /g,'-')}`}))]},...legacy(['communities'])]},
    {key:'homes',label:'Homes',columns:[{title:'Real estate',links:[{label:'Homes overview',href:'/homes'},{label:'Published homes',href:home({view:'browse',type:'property'})},{label:'Rental directory',href:'/rentals'}]},...legacy(['homes','homeservices','closingteam'])]},
    {key:'businesses',label:'Businesses',columns:[{title:'Directory & owners',links:[{label:'Business directory',href:'/local'},{label:'Business hub',href:'/businesses'},{label:'For businesses',href:'/for-businesses'},{label:'Claim a business',href:'/claim-business'}]},...legacy(['discover','businesses','forbusiness'])]},
    {key:'resources',label:'Finance & more',columns:[{title:'Finance & resources',links:[{label:'Finance',href:'/finances'},{label:'Loan options',href:'/loan-types'},{label:'Grants & assistance',href:'/grants'},{label:'Insurance',href:'/homes/insurance'},{label:'Contact',href:'/contact'},{label:'Site index',href:'/site-index'}]},...legacy(['analyze','stories','happening'])]},
  ];
  const active=(key:string)=>open===key || (key==='homes' && /^\/(homes|rentals|home-services)/.test(pathname)) || (key==='businesses' && /^\/(biz|business|local|for-businesses|claim-business)/.test(pathname)) || (key==='towns' && /^\/(towns|communities|living-in)/.test(pathname)) || (key==='resources' && /^\/(finances|grants|loan-types)/.test(pathname)) || (key==='browse' && pathname==='/' && new URLSearchParams(search).get('view')==='browse');
  const links=(group:NavGroup)=>group.columns.map((column,i)=><section key={`${column.title}-${i}`}><h3>{column.title}</h3>{column.links.map((link,j)=><Link key={`${link.label}-${j}`} to={link.href} onClick={()=>{setOpen(null);setMobile(false);}}>{link.label}</Link>)}</section>);
  return <>
    <header className="nest-public-nav nav-shell nav-frost">
      <div className="nest-nav-bar">
        <Link to="/" className="nest-nav-brand"><span aria-hidden>N</span><span>Capital District Nest</span></Link>
        <nav className="nest-nav-desktop" aria-label="Main navigation">
          <Link className="nest-nav-live" aria-current={pathname==='/' && new URLSearchParams(search).get('view')!=='browse' ? 'page' : undefined} to={home({view:'latest'})}>Live feed</Link>
          {groups.map(group=><Popover.Root key={group.key} open={open===group.key} onOpenChange={value=>setOpen(value ? group.key : null)}>
            <Popover.Trigger asChild><Button variant="ghost" className="nest-nav-trigger" data-active={active(group.key)}>{group.label}<ChevronDown aria-hidden/></Button></Popover.Trigger>
            <Popover.Portal><Popover.Content className={`nest-nav-panel dropdown-panel${group.columns.length===1 ? ' nest-nav-panel-small' : ''}`} align="center" sideOffset={9} collisionPadding={16} aria-label={`${group.label} navigation`}><div className="nest-nav-panel-grid">{links(group)}</div><Popover.Close asChild><Button variant="ghost" size="icon" className="nest-nav-panel-close" aria-label={`Close ${group.label} menu`}><X/></Button></Popover.Close></Popover.Content></Popover.Portal>
          </Popover.Root>)}
        </nav>
        <div className="nest-nav-tools">{settings}<Button variant="ghost" size="icon" aria-label="Search site" onClick={()=>setSearchOpen(true)}><Search/></Button>
          <Dialog.Root open={mobile} onOpenChange={setMobile}>
            <Dialog.Trigger asChild><Button variant="ghost" size="icon" className="nest-nav-mobile-trigger" aria-label="Open navigation menu"><Menu/></Button></Dialog.Trigger>
            <Dialog.Portal><Dialog.Overlay className="nest-nav-overlay"/><Dialog.Content className="nest-nav-mobile-panel" aria-describedby={undefined}>
              <Dialog.Title>Capital District Nest</Dialog.Title><Dialog.Close asChild><Button variant="ghost" size="icon" className="nest-nav-panel-close" aria-label="Close navigation menu"><X/></Button></Dialog.Close>
              <nav aria-label="Mobile main navigation"><Link className="nest-nav-mobile-live" to={home({view:'latest'})} onClick={()=>setMobile(false)}>Live feed</Link>
                {groups.map(group=><details key={group.key}><summary>{group.label}<ChevronDown aria-hidden/></summary><div className="nest-nav-mobile-links">{links(group)}</div></details>)}
              </nav>
            </Dialog.Content></Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
    <GlobalSearchCommand isOpen={searchOpen} onClose={()=>setSearchOpen(false)}/>
  </>;
}