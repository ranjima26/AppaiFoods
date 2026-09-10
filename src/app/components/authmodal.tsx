"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { FiArrowRight, FiEye, FiEyeOff, FiX } from "react-icons/fi";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const isSignup = mode === "signup";

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isSignup && data.get("password") !== data.get("confirmPassword")) {
      setMessage("Your passwords do not match. Please try again.");
      return;
    }
    setMessage("Account access is coming soon. Please try again once online accounts are available.");
  }

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-[#003820]/15 bg-[#fafbf8] px-4 text-sm text-[#003820] outline-none transition-colors placeholder:text-[#8a978f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/15";

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby="auth-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-md overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[2rem] bg-white p-0 text-[#003820] shadow-2xl backdrop:bg-[#002817]/65 backdrop:backdrop-blur-sm">
      <div className="relative">
        <button type="button" onClick={onClose} aria-label="Close account dialog" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-[#003820]/10 bg-white text-[#003820] hover:bg-[#e9f3e7] focus-visible:outline-2 focus-visible:outline-[#00a651]"><FiX className="size-5" /></button>
        <div className="rounded-t-[2rem] bg-[#f2f5eb] px-6 pb-6 pt-7 text-center sm:px-8">
          <Image src="/Appai Foods logo.png" alt="Appai Foods" width={1794} height={2429} className="mx-auto h-16 w-auto object-contain" />
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#008846]">A little taste of home</p>
          <h2 id="auth-title" className="mt-2 text-4xl">{isSignup ? "Join the Appai family" : "Welcome back"}</h2>
          <p className="mt-2 text-xs leading-5 text-[#69766d]">{isSignup ? "Create an account for your favourite Kerala snacks." : "Log in to your Appai Foods account."}</p>
        </div>
        <div className="px-6 pb-7 pt-5 sm:px-8">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-[#f2f5eb] p-1">
            {(["login", "signup"] as const).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => { setMode(item); setMessage(""); setShowPassword(false); }} className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${mode === item ? "bg-[#003820] text-white shadow-sm" : "text-[#69766d] hover:text-[#003820]"}`}>{item === "login" ? "Login" : "Sign up"}</button>)}
          </div>
          <form key={mode} onSubmit={submit} className="space-y-4">
            {isSignup && <label className="block text-xs font-semibold" htmlFor="auth-name">Name<input id="auth-name" name="name" autoComplete="name" required placeholder="Your full name" className={inputClass} /></label>}
            <label className="block text-xs font-semibold" htmlFor="auth-identity">{isSignup ? "Email" : "Email or phone number"}<input id="auth-identity" name="identity" type={isSignup ? "email" : "text"} autoComplete={isSignup ? "email" : "username"} required placeholder={isSignup ? "you@example.com" : "Enter email or phone number"} className={inputClass} /></label>
            {isSignup && <label className="block text-xs font-semibold" htmlFor="auth-phone">Phone number<input id="auth-phone" name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{7,20}" title="Enter a phone number with 7 to 20 characters, using digits, spaces, +, brackets or hyphens." placeholder="Your phone number" className={inputClass} /></label>}
            <div>
              <label className="block text-xs font-semibold" htmlFor="auth-password">Password</label>
              <div className="relative">
                <input id="auth-password" name="password" type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} required minLength={isSignup ? 8 : undefined} placeholder={isSignup ? "Create a password (8+ characters)" : "Enter your password"} className={`${inputClass} pr-12`} />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)} className="absolute bottom-0 right-0 grid size-12 place-items-center text-[#69766d] hover:text-[#008846]">{showPassword ? <FiEyeOff /> : <FiEye />}</button>
              </div>
            </div>
            {isSignup && <label className="block text-xs font-semibold" htmlFor="auth-confirm">Confirm password<input id="auth-confirm" name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} placeholder="Re-enter your password" className={inputClass} /></label>}
            {message && <p role="status" className="rounded-xl bg-[#f2f5eb] p-3 text-xs leading-5 text-[#003820]">{message}</p>}
            <button type="submit" className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#008846] text-sm font-bold text-white transition-colors hover:bg-[#003820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651]">{isSignup ? "Sign up" : "Login"}<FiArrowRight aria-hidden="true" /></button>
          </form>
          <p className="mt-5 text-center text-xs text-[#69766d]">{isSignup ? "Already have an account?" : "New to Appai Foods?"} <button type="button" onClick={() => { setMode(isSignup ? "login" : "signup"); setMessage(""); setShowPassword(false); }} className="font-semibold text-[#008846] underline underline-offset-4">{isSignup ? "Login" : "Sign up"}</button></p>
        </div>
      </div>
    </dialog>, document.body,
  );
}
