"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiHeart, FiHelpCircle, FiMapPin, FiPackage, FiPlus, FiTrash2, FiUser } from "react-icons/fi";


const sections = [{ name: "Personal details", icon: FiUser }, { name: "My orders", icon: FiPackage }, { name: "Saved addresses", icon: FiMapPin }] as const;
type Section = (typeof sections)[number]["name"];
type Address = { id: number; label: string; street: string; city: string; state: string; pincode: string };
const inputClass = "mt-2 h-12 w-full rounded-xl border border-[#003820]/15 bg-[#fafbf8] px-4 text-sm font-medium outline-none placeholder:text-[#93a097] focus:border-[#008846] focus:ring-2 focus:ring-[#008846]/15";
const buttonClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#008846] px-6 text-sm font-bold text-white transition-colors hover:bg-[#003820]";

export default function Profile() {
  const [section, setSection] = useState<Section>("Personal details");
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addingAddress, setAddingAddress] = useState(false);
  const [message, setMessage] = useState("");


  function saveDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDetails({ name: String(data.get("name")).trim(), email: String(data.get("email")).trim(), phone: String(data.get("phone")).trim() });
    setMessage("Your details have been updated for this visit.");
  }

  function saveAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAddresses((current) => [...current, { id: Date.now(), label: String(data.get("label")), street: String(data.get("street")).trim(), city: String(data.get("city")).trim(), state: String(data.get("state")).trim(), pincode: String(data.get("pincode")) }]);
    setAddingAddress(false);
    setMessage("Address added for this visit.");
  }

  return (
    <main className="min-h-[75vh] bg-[#f7f6ef] px-5 py-9 pb-24 text-[#003820] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-[#607167] hover:text-[#008846]"><FiArrowLeft aria-hidden="true" />Back to shop</Link>
        <div className="mb-8 mt-7 grid gap-4 text-center"><h1 className="mt-2 text-5xl sm:text-6xl">My account</h1><Link href="/contactUs" className="inline-flex items-center justify-self-end gap-2 text-sm font-semibold text-[#008846]"><FiHelpCircle aria-hidden="true" />Need a hand?</Link></div>
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <aside className="overflow-hidden rounded-3xl border border-[#003820]/10 bg-white">
            <div className="bg-[#003820] p-7 text-white"><div className="mb-4 grid size-16 place-items-center rounded-full border border-white/25 bg-white/10 text-2xl font-semibold">{details.name ? details.name.slice(0, 1).toUpperCase() : <FiUser aria-hidden="true" />}</div><p className="text-xs text-white/65">Welcome to Appai</p><h2 className="mt-1 break-words text-3xl">{details.name || "Hello, snack lover"}</h2><p className="mt-2 break-all text-xs text-white/65">{details.email || "Make yourself at home."}</p></div>
            <nav aria-label="Account sections" className="space-y-2 p-3">{sections.map(({ name, icon: Icon }) => <button key={name} type="button" aria-pressed={section === name} onClick={() => { setSection(name); setMessage(""); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-sm font-semibold transition-colors ${section === name ? "bg-[#e9f3e7] text-[#008846]" : "text-[#607167] hover:bg-[#fafbf8]"}`}><Icon aria-hidden="true" className="size-5" />{name}<FiArrowRight aria-hidden="true" className="ml-auto size-4" /></button>)}</nav>
            <div className="mx-5 border-t border-[#003820]/10 py-5"><Link href="/wishlist" className="flex items-center gap-3 text-sm font-semibold text-[#607167]"><FiHeart aria-hidden="true" className="size-5" />My wishlist</Link></div>
          </aside>
          <div className="space-y-6">
            <section aria-label={section} className="rounded-3xl border border-[#003820]/10 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(0,56,32,0.25)] sm:p-8">
              <h2 className="text-3xl sm:text-4xl">{section}</h2>
              {section === "Personal details" && <><p className="mt-2 text-sm leading-6 text-[#607167]">A few details to make your next visit feel more like home.</p><form onSubmit={saveDetails} className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-xs font-semibold sm:col-span-2">Full name<input name="name" autoComplete="name" required maxLength={100} defaultValue={details.name} placeholder="Enter your full name" className={inputClass} /></label><label className="text-xs font-semibold">Email address<input name="email" type="email" autoComplete="email" required defaultValue={details.email} placeholder="you@example.com" className={inputClass} /></label><label className="text-xs font-semibold">Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" title="Enter a phone number with 7 to 20 characters." defaultValue={details.phone} placeholder="Your phone number" className={inputClass} /></label><div className="mt-2 flex flex-wrap items-center gap-4 border-t border-[#003820]/10 pt-6 sm:col-span-2"><button type="submit" className={buttonClass}><FiCheck aria-hidden="true" />Save changes</button></div></form></>}
              {section === "My orders" && <div className="flex flex-col items-center py-12 text-center"><span className="grid size-20 place-items-center rounded-full bg-[#f2f5eb]"><FiPackage aria-hidden="true" className="size-8 text-[#008846]" /></span><h3 className="mt-5 text-3xl">Your snack story starts here</h3><p className="mt-3 max-w-sm text-sm leading-7 text-[#607167]">Your order history will appear here once online accounts and ordering are available.</p><Link href="/shop" className={`${buttonClass} mt-6`}>Explore our snacks<FiArrowRight aria-hidden="true" /></Link></div>}
              {section === "Saved addresses" && <><p className="mt-2 text-sm leading-6 text-[#607167]">Keep your favourite delivery spots in one place for this visit.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{addresses.map((address) => <article key={address.id} className="rounded-2xl border border-[#003820]/15 bg-[#fafbf8] p-5"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 text-xl"><FiMapPin aria-hidden="true" className="size-4 text-[#008846]" />{address.label}</h3><button type="button" aria-label={`Remove ${address.label} address`} onClick={() => { setAddresses((current) => current.filter((item) => item.id !== address.id)); setMessage("Address removed."); }} className="grid size-10 place-items-center rounded-full text-[#607167] hover:bg-red-50 hover:text-red-600"><FiTrash2 aria-hidden="true" /></button></div><p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-[#607167]">{address.street}<br />{address.city}, {address.state}<br />{address.pincode}</p></article>)}</div>{!addingAddress && <button type="button" onClick={() => setAddingAddress(true)} className="mt-5 flex min-h-24 w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#008846]/40 bg-[#f2f5eb]/50 text-sm font-semibold text-[#008846]"><FiPlus aria-hidden="true" />Add a new address</button>}{addingAddress && <form onSubmit={saveAddress} className="mt-6 grid gap-4 rounded-2xl bg-[#fafbf8] p-5 sm:grid-cols-2"><label className="text-xs font-semibold sm:col-span-2">Address type<select name="label" className={inputClass}><option>Home</option><option>Work</option><option>Other</option></select></label><label className="text-xs font-semibold sm:col-span-2">Street address<input name="street" autoComplete="street-address" required maxLength={250} placeholder="House, street and landmark" className={inputClass} /></label><label className="text-xs font-semibold">City<input name="city" autoComplete="address-level2" required maxLength={100} className={inputClass} /></label><label className="text-xs font-semibold">State<input name="state" autoComplete="address-level1" required maxLength={100} className={inputClass} /></label><label className="text-xs font-semibold">Pincode<input name="pincode" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" title="Enter a six-digit pincode." required className={inputClass} /></label><div className="flex flex-wrap gap-3 sm:col-span-2"><button type="submit" className={buttonClass}>Save address</button><button type="button" onClick={() => setAddingAddress(false)} className="px-4 text-sm font-semibold text-[#607167]">Cancel</button></div></form>}</>}
              {message && <p role="status" className="mt-5 flex items-center gap-2 rounded-xl bg-[#e9f3e7] p-4 text-sm text-[#008846]"><FiCheck aria-hidden="true" />{message}</p>}
            </section>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#e9f3e7] p-6"><div><h2 className="text-2xl">Made for your tea-time moments.</h2><p className="mt-1 text-xs leading-6 text-[#607167]">Rediscover the Kerala snacks you grew up loving.</p></div><Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-[#008846]">Find your favourite<FiArrowRight aria-hidden="true" /></Link></div>
          </div>
        </div>
      </div>
    </main>
  );
}
