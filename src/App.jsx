import React, { useMemo, useState } from 'react';
import { Camera, CalendarDays, Check, ChevronDown, Film, Heart, Menu, MessageCircle, Play, Sparkles, Video } from 'lucide-react';

// IMPORTANT: Replace this with the studio's WhatsApp number, including country code, without + or spaces.
const WHATSAPP_NUMBER = '918118877270';

const eventOptions = {
  groom: ['Tilak Ceremony', 'Haldi Ceremony', 'Mehndi Ceremony', 'Devpujan (Dagar Puji)', 'Wedding Ceremony'],
  bride: ['Tilak Ceremony', 'Haldi Ceremony', 'Mehndi Ceremony', 'Devpujan (Dagar Puji)', 'Wedding Ceremony', 'Reception']
};

const packageData = {
  groom: {
    Traditional: { price: 27000, drone: '1 day', equipment: ['1 Photography Camera', '1 Videography Camera', '1 day Drone Coverage'], deliverables: ['1 Wedding Album', '2 Instagram Reels', '1 Wedding Video'] },
    Cinematic: { price: 55000, drone: '2 days', equipment: ['Cinematic equipment setup — studio confirmation pending', '2 days Drone Coverage'], deliverables: ['1 Wedding Album', '4 Instagram Reels', '1 Wedding Teaser', '1 Cinematic Wedding Video'] }
  },
  bride: {
    Traditional: { price: 25000, drone: '1 day', equipment: ['1 Photography Camera', '1 Videography Camera', '1 day Drone Coverage'], deliverables: ['1 Wedding Album', '2 Instagram Reels', '1 Wedding Video'] },
    Cinematic: { price: 55000, drone: '2 days', equipment: ['Cinematic equipment setup — studio confirmation pending', '2 days Drone Coverage'], deliverables: ['1 Wedding Album', '4 Instagram Reels', '1 Wedding Teaser', '1 Cinematic Wedding Video'] }
  }
};

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function App() {
  const [side, setSide] = useState('groom');
  const [style, setStyle] = useState('Traditional');
  const [events, setEvents] = useState(['Tilak Ceremony', 'Haldi Ceremony', 'Mehndi Ceremony', 'Devpujan (Dagar Puji)', 'Wedding Ceremony']);
  const [dates, setDates] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [preWedding, setPreWedding] = useState(false);
  const [galleryTab, setGalleryTab] = useState('photos');
  const pkg = packageData[side][style];
  const totalPrice = pkg.price + (preWedding ? 8000 : 0);
  const ready = name.trim() && phone.trim() && location.trim() && events.length && events.every(e => dates[e]);
  const summary = useMemo(() => [
    'Hello Maa Durga HD Videography!', '',
    'I want to enquire about a wedding booking.',
    `Wedding side: ${side === 'groom' ? "Groom's side" : "Bride's side"}`,
    `Package: ${style}`,
    `Package price: ${money(pkg.price)}`,
    `Pre-wedding shoot: ${preWedding ? 'Yes (+₹8,000)' : 'No'}`,
    `Total estimated price: ${money(totalPrice)}`, 
    `Client name: ${name || 'Not entered'}`,
    `Mobile: ${phone || 'Not entered'}`,
    `Location: ${location || 'Not entered'}`,
    '', 'Selected events and dates:',
    ...events.map(e => `• ${e}: ${dates[e] || 'Date not selected'}`),
    '', 'Included equipment:', ...pkg.equipment.map(x => `• ${x}`),
    '', 'Deliverables:', ...pkg.deliverables.map(x => `• ${x}`),
    notes ? `\nAdditional notes: ${notes}` : '',
    '', 'Please confirm availability and booking details.'
  ].filter(Boolean).join('\n'), [side, style, pkg, name, phone, location, events, dates, notes, preWedding, totalPrice]);

  function changeSide(next) {
    setSide(next);
    setEvents(eventOptions[next]);
    setDates({});
  }
  function toggleEvent(event) {
    setEvents(old => old.includes(event) ? old.filter(x => x !== event) : [...old, event]);
  }
  function sendWhatsApp() {
    if (!ready) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return <>
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">MD</span><span>MAA DURGA<small>HD VIDEOGRAPHY</small></span></a><nav><a href="#packages">Packages</a><a href="#gallery">Our Work</a><a href="#booking">Book Now</a></nav><a className="nav-cta" href="#booking">Enquire Now <MessageCircle size={16}/></a></header>
    <main>
      <section className="hero" id="home">
        <div className="hero-shade"/><div className="hero-content"><p className="eyebrow"><Sparkles size={15}/> WEDDING PHOTOGRAPHY & FILMS</p><h1>Every Moment.<br/><em>Forever Yours.</em></h1><p className="hero-copy">Your wedding story deserves to be remembered beautifully. Choose your events, select your package and send your booking enquiry in minutes.</p><a className="gold-btn" href="#booking">Plan Your Wedding <span>↗</span></a><div className="hero-note"><Heart size={14}/> Capturing memories with love</div></div>
        <div className="hero-side">EST. WITH LOVE · WEDDING STORIES</div>
      </section>

      <section className="intro section-wrap"><p className="eyebrow">THE ART OF YOUR STORY</p><h2>Moments fade.<br/><em>Memories stay.</em></h2><p>From the first celebration to the wedding vows, we help you preserve every emotion, ritual and little detail.</p></section>

      <section className="packages section-wrap" id="packages"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR EXPERIENCE</p><h2>Wedding <em>Packages</em></h2></div><p>Transparent package pricing<br/>for your special celebrations.</p></div>
        <div className="package-grid">{['Traditional','Cinematic'].map((s,i)=><article className={`package-card ${style===s?'selected':''}`} key={s}><div className="package-top"><span>{i===0?'THE CLASSIC STORY':'THE SIGNATURE FILM'}</span>{i===1&&<b>POPULAR</b>}</div><h3>{s}</h3><p className="package-price">{money(packageData[side][s].price)}<small> / package</small></p><p className="package-desc">{s==='Traditional'?'Beautiful coverage of your wedding celebrations.':'A cinematic retelling of your wedding story.'}</p><div className="package-line"/><ul>{[...packageData[side][s].equipment,...packageData[side][s].deliverables].map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><button className="outline-btn" onClick={()=>{setStyle(s);document.querySelector('#booking').scrollIntoView({behavior:'smooth'});}}>Choose {s}</button></article>)}</div>
        <p className="price-note">Package prices shown are based on the selected wedding side. Final availability and any additional requirements are confirmed by the studio.</p>
      </section>

      <section className="gallery section-wrap" id="gallery"><div className="section-heading"><div><p className="eyebrow">A GLIMPSE OF OUR WORK</p><h2>Stories we've <em>captured</em></h2></div><div className="gallery-tabs"><button className={galleryTab==='photos'?'active':''} onClick={()=>setGalleryTab('photos')}>Photos</button><button className={galleryTab==='videos'?'active':''} onClick={()=>setGalleryTab('videos')}>Videos</button></div></div>
        {galleryTab==='photos'?<div className="photo-grid">
          {/* REPLACE PHOTO: change this sample image URL to your own wedding photo. */}<figure className="photo-card photo-one"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=85" alt="Wedding ceremony with floral decor"/><figcaption><Camera/><span>Wedding Moments</span></figcaption></figure>
          {/* REPLACE PHOTO: change this sample image URL to your own bride-and-groom photo. */}<figure className="photo-card photo-two"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85" alt="Bride and groom wedding celebration"/><figcaption><Heart/><span>Bride & Groom</span></figcaption></figure>
          {/* REPLACE PHOTO: change this sample image URL to your own wedding-details photo. */}<figure className="photo-card photo-three"><img src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85" alt="Wedding celebration details"/><figcaption><Sparkles/><span>Wedding Details</span></figcaption></figure>
        </div>:<div className="video-grid">
          {/* REPLACE VIDEO: replace this placeholder with a <video controls> element and your MP4 path. */}<div className="video-placeholder video-one"><Play/><span>Wedding Highlight Film</span><small>Sample thumbnail · add your MP4 video later</small></div>
          {/* REPLACE VIDEO: replace this placeholder with a <video controls> element and your MP4 path. */}<div className="video-placeholder video-two"><Play/><span>Cinematic Teaser</span><small>Sample thumbnail · add your MP4 video later</small></div>
        </div>}
        <p className="gallery-hint">These are sample portfolio images for the website preview. Replace them with Maa Durga HD Videography's original work before publishing.</p>
      </section>

      <section className="booking section-wrap" id="booking"><div className="booking-heading"><p className="eyebrow">LET'S PLAN YOUR DAY</p><h2>Your Wedding <em>Booking</em></h2><p>Choose your wedding side, select each event date and send your details directly to our WhatsApp.</p></div>
        <div className="booking-layout"><div className="booking-form">
          <div className="form-block"><label className="form-label">01 / SELECT WEDDING SIDE</label><div className="side-toggle"><button className={side==='groom'?'active':''} onClick={()=>changeSide('groom')}>Groom's Wedding</button><button className={side==='bride'?'active':''} onClick={()=>changeSide('bride')}>Bride's Wedding</button></div></div>
          <div className="form-block"><label className="form-label">02 / SELECT EVENTS & DATES</label><p className="muted">Choose the events you need coverage for, then select the date of each event.</p><div className="event-list">{eventOptions[side].map(e=><div className="event-row" key={e}><label className="check-label"><input type="checkbox" checked={events.includes(e)} onChange={()=>toggleEvent(e)}/><span>{e}</span></label>{events.includes(e)&&<label className="date-field"><CalendarDays size={15}/><input type="date" value={dates[e]||''} onChange={ev=>setDates(old=>({...old,[e]:ev.target.value}))}/></label>}</div>)}</div></div>
          <div className="form-block"><label className="form-label">03 / CHOOSE YOUR PACKAGE</label><div className="style-choice">{['Traditional','Cinematic'].map(s=><button key={s} className={style===s?'active':''} onClick={()=>setStyle(s)}><span>{s==='Traditional'?<Camera/>:<Film/>}</span><b>{s}</b><small>{money(packageData[side][s].price)}</small></button>)}</div></div>
          <div className="form-block"><label className="form-label">04 / OPTIONAL ADD-ON</label><label className="check-label prewedding-option"><input type="checkbox" checked={preWedding} onChange={e=>setPreWedding(e.target.checked)}/><span>Pre-Wedding Shoot <b>+ ₹8,000</b></span></label><p className="muted">Select this if you would like to add a pre-wedding shoot to your package.</p></div>
          <div className="form-block"><label className="form-label">05 / YOUR DETAILS</label><div className="input-grid"><label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name"/></label><label>Mobile number<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="10-digit mobile number" inputMode="numeric"/></label><label className="wide">Wedding location<input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Village / City / Venue"/></label><label className="wide">Additional requirements <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Tell us anything else we should know..." rows="3"/></label></div></div>
        </div>
        <aside className="summary-card"><p className="eyebrow">YOUR SELECTION</p><h3>Booking Summary</h3><div className="summary-meta"><span>{side==='groom'?"Groom's Wedding":"Bride's Wedding"}</span><b>{style}</b></div><div className="summary-price">{money(totalPrice)}</div><p className="muted">Total estimated price</p><div className="summary-event"><span>Wedding package</span><b>{money(pkg.price)}</b></div><div className="summary-event"><span>Pre-wedding shoot</span><b>{preWedding ? '+ '+money(8000) : 'Not selected'}</b></div><div className="summary-divider"/><p className="summary-label">Selected events</p>{events.length?events.map(e=><div className="summary-event" key={e}><span>{e}</span><b>{dates[e]||'Date pending'}</b></div>):<p className="muted">No events selected yet.</p>}<div className="summary-divider"/>{preWedding&&<p className="summary-inclusion"><Check size={14}/>Pre-wedding shoot added (+₹8,000)</p>}<p className="summary-label">Included in package</p>{pkg.deliverables.map(x=><p className="summary-inclusion" key={x}><Check size={14}/>{x}</p>)}<p className="summary-inclusion"><Check size={14}/>{pkg.drone} drone coverage</p><button className="whatsapp-btn" disabled={!ready} onClick={sendWhatsApp}><MessageCircle size={18}/> Send Booking on WhatsApp</button>{!ready&&<small className="validation">Please enter your name, mobile, location and select a date for every chosen event.</small>}<small className="fine-print">This is a booking enquiry, not a confirmed reservation. The studio will confirm availability.</small></aside></div>
      </section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">MD</span><span>MAA DURGA<small>HD VIDEOGRAPHY</small></span></a><p>Capturing your forever moments.</p><span>© {new Date().getFullYear()} Maa Durga HD Videography</span></footer>
  </>;
}

export default App;
