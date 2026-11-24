/**
 * Structured homepage category links. Imported `category` values are noisy
 * (e.g. Healthcare rows include hotels), so a row matches on its specific
 * subcategory; the broad category is used only when no subcategory exists.
 * Free-text search keeps its own synonym semantics in the shared query builder.
 */
export interface DirectoryCategory { key:string; label:string; legacy:string; subs:string[]; cats:string[] }
const trades = {
  roofing:['roofing contractor','roofer','roofing service'],
  plumbing:['plumber','%plumbing service%','plumbing contractor'],
  hvac:['hvac contractor','heating contractor','air conditioning contractor','air conditioning repair service','furnace repair service','%hvac%'],
  electric:['electrician','electrical installation service','%electrical contractor%'],
  landscaping:['landscaper','landscape designer','landscape architect','landscaping service','lawn care service','tree service'],
  cleaning:['%cleaning service%','janitorial service','maid service'],
  contractors:['%contractor%','construction company','%remodeler%','home builder','custom home builder','handyman%'],
};
export const DIRECTORY_CATEGORIES: DirectoryCategory[] = [
  {key:'restaurants',label:'Restaurants',legacy:'Restaurant',cats:['Restaurant','American restaurant','Japanese restaurant','Family restaurant','Diner','Indian Muslim restaurant','Indian restaurant','Sandwich shop'],
    subs:['restaurant','% restaurant%','diner','deli','sandwich shop','pizza delivery','%pizzeria%','bar & grill','brewpub','gastropub','steak house','bistro']},
  {key:'coffee',label:'Coffee & cafés',legacy:'Coffee',cats:['Coffee','Coffee shop'],subs:['coffee shop','coffee roastery','%coffee house%','espresso bar','cafe','café','bakery & cafe','cafe & gift shop']},
  {key:'contractors',label:'Contractors',legacy:'Contractor',cats:['Contractor','Home Services / Contractors','Handyman'],subs:trades.contractors},
  {key:'home-services',label:'Home services',legacy:'Contractor',cats:['Contractor','Home Services / Contractors','Handyman','Plumber','Electrician','HVAC','Roofer','Landscaper','Landscaping','Cleaner'],
    subs:[...trades.contractors,...trades.roofing,...trades.plumbing,...trades.hvac,...trades.electric,...trades.landscaping,...trades.cleaning,'painter','painting','pest control service','pressure washing service','mover','chimney sweep','septic system service','locksmith','appliance repair service','window installation service','gutter cleaning service','water damage restoration service']},
  {key:'mortgage',label:'Mortgage lenders',legacy:'Mortgage',cats:['Mortgage Lender','Mortgage lender','Lender'],subs:['mortgage lender','mortgage broker','loan agency','%mortgage%']},
  {key:'insurance',label:'Insurance',legacy:'Insurance',cats:['Insurance','Insurance agency','Auto insurance agency'],subs:['%insurance agency%','insurance broker','insurance company','insurance agent']},
  // Both halves of the label: medical care and wellness services.
  {key:'health-wellness',label:'Health & wellness',legacy:'Healthcare',cats:['Healthcare','Wellness'],
    subs:['medical clinic','medical center','medical office','%physician%','doctor','general practitioner','internist','pediatrician','hospital','urgent care center','emergency room','chiropractor','physical therapist','physical therapy clinic','occupational therapist','optometrist','dermatologist','nurse practitioner','physician assistant','obstetrician-gynecologist','orthopedic clinic','sleep clinic',"women's health clinic",'mental health clinic','mental health service','counselor','home health care service','rehabilitation center','wellness center','wellness program','%massage therapist%','health consultant','acupuncturist','nutritionist']},
  // Both halves of the label: hair/nail/beauty salons and spas.
  {key:'salon-spa',label:'Salon & spa',legacy:'Salon',cats:['Salon','Beauty','Beauty & Personal Care'],
    subs:['%salon%','barber shop','hairdresser','spa','day spa','facial spa','massage spa','medical spa','spa and health club','esthetics service','waxing hair removal service','laser hair removal service','electrolysis hair removal service']},
  {key:'roofing',label:'Roofing',legacy:'Roofer',cats:['Roofer'],subs:trades.roofing},
  {key:'plumbing',label:'Plumbing',legacy:'Plumber',cats:['Plumber'],subs:trades.plumbing},
  {key:'hvac',label:'HVAC',legacy:'HVAC',cats:['HVAC'],subs:trades.hvac},
  {key:'electricians',label:'Electricians',legacy:'Electrician',cats:['Electrician'],subs:trades.electric},
  {key:'landscaping',label:'Landscaping',legacy:'Landscaper',cats:['Landscaper','Landscaping'],subs:trades.landscaping},
  {key:'cleaning',label:'Cleaning',legacy:'Cleaner',cats:['Cleaner'],subs:trades.cleaning},
  {key:'attorneys',label:'Attorneys',legacy:'Attorney',cats:['Attorney','Legal Services','Real Estate Attorney'],subs:['%lawyer%','%attorney%','law firm','legal services']},
  {key:'accountants',label:'Accountants',legacy:'Accountant',cats:['Accountant','Tax preparation service'],subs:['%accountant%','accounting firm','tax preparation%','bookkeeping service']},
  {key:'dentists',label:'Dentists',legacy:'Dental',cats:['Dental'],subs:['%dentist%','%dental clinic%','dental office','%orthodont%','%endodont%','%periodont%']},
  {key:'fitness',label:'Fitness',legacy:'Gym',cats:['Gym','Fitness','Fitness & Wellness'],subs:['gym','boxing gym','%fitness%','yoga studio','yoga instructor','pilates studio','personal trainer','martial arts school']},
  {key:'shopping',label:'Shopping',legacy:'Retail',cats:['Retail','Shop','Bookstore','Book store','Grocery store','Quilt shop'],subs:['%store%','gift shop','boutique','shopping mall','florist','supermarket','antique shop','consignment shop']},
  {key:'auto',label:'Auto services',legacy:'Auto',cats:['Auto','Automotive'],subs:['auto repair shop','auto body shop','auto machine shop','auto parts store','auto glass shop','tire shop','car wash','oil change service','car repair and maintenance service','transmission shop','brake shop','muffler shop','auto detailing service','towing service','%mechanic%']},
];
export const directoryCategory=(key?:string|null)=>DIRECTORY_CATEGORIES.find(c=>c.key===key);
const quote=(v:string)=>`"${v.replace(/["\\]/g,'')}"`;
/** PostgREST `or` clause for one structured category, or null for an unknown key. */
export function directoryCategoryClause(key:string):string|null {
  const c=directoryCategory(key); if(!c) return null;
  const parts=c.subs.map(p=>`subcategory.ilike.${quote(p)}`);
  if(c.cats.length) parts.push(`and(or(subcategory.is.null,subcategory.eq.""),category.in.(${c.cats.map(quote).join(',')}))`);
  return parts.join(',');
}
