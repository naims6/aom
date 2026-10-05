'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { Product, CartItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const DISTRICTS = [
  'Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Narayanganj',
  "Gazipur", "Cox's Bazar", 'Jessore', 'Bogura', 'Dinajpur',
];

const DELIVERY_INSIDE = 60;
const DELIVERY_OUTSIDE = 120;

// ─── Form type ────────────────────────────────────────────────────────────────

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  district: string;
  notes: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  /** Non-null only when arriving via "Buy Now" — checkout is for this product only. */
  buyNowProduct: Product | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutClient({ buyNowProduct }: Props) {
  const router = useRouter();
  const { items: cartItems, clearCart } = useCart();

  // In Buy-Now mode we show only the single product at qty=1.
  // Cart is left untouched.
  const isBuyNow = buyNowProduct !== null;

  const orderItems: CartItem[] = useMemo(
    () =>
      isBuyNow
        ? [{ product: buyNowProduct!, quantity: 1 }]
        : cartItems,
    [isBuyNow, buyNowProduct, cartItems]
  );

  const subtotal = useMemo(
    () => orderItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [orderItems]
  );

  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    address: '',
    district: '',
    notes: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const deliveryCharge =
    form.district === 'Dhaka' ? DELIVERY_INSIDE : form.district ? DELIVERY_OUTSIDE : 0;
  const total = subtotal + deliveryCharge;

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: Partial<Record<keyof OrderForm, string>> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^(\+88)?01[3-9]\d{8}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Bangladeshi phone number';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    if (!form.district) e.district = 'Please select your district';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Replace with a real API call here.
    await new Promise((res) => setTimeout(res, 1200));

    // Only clear the cart when checking out from the cart (not Buy Now).
    if (!isBuyNow) clearCart();

    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ─── Empty state ─────────────────────────────────────────────────────────────

  if (orderItems.length === 0 && !submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
          <ShieldCheck className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-400 text-sm">Add products before checking out.</p>
        <Link
          href="/shop"
          className="mt-2 px-6 py-3 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  // ─── Success state ───────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 max-w-sm text-sm sm:text-base">
            Thank you, <strong>{form.name}</strong>! We received your order and will
            contact you at <strong>{form.phone}</strong> to confirm.
          </p>
        </div>
        <Link
          href="/shop"
          className="px-6 py-3 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ─── Checkout form ───────────────────────────────────────────────────────────

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Checkout</h1>
          {isBuyNow && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-white bg-primary px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" />
              Buy Now
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* On mobile: summary first, then form (reversed with order utilities) */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

            {/* ── Left: Delivery + Payment ── */}
            <div className="space-y-5 w-full min-w-0">

              {/* Delivery Info */}
              <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Amin Hossain"
                        className={`w-full pl-9 pr-4 py-2.5 border rounded-sm text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                          errors.name ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className={`w-full pl-9 pr-4 py-2.5 border rounded-sm text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                          errors.phone ? 'border-red-400' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* District */}
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1.5">
                      District <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className={`w-full px-3 py-2.5 border rounded-sm text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white ${
                        errors.district ? 'border-red-400' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select district…</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no, road, area, city…"
                      className={`w-full px-3 py-2.5 border rounded-sm text-sm outline-none transition-colors resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                        errors.address ? 'border-red-400' : 'border-gray-200'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Order Notes
                        <span className="text-gray-400 font-normal">(optional)</span>
                      </span>
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Special instructions, preferred delivery time, etc."
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm outline-none transition-colors resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  Payment Method
                </h2>

                <div className="space-y-2.5">
                  {[
                    { value: 'cod',   label: 'Cash on Delivery', description: 'Pay when your order arrives', icon: '💵' },
                    { value: 'bkash', label: 'bKash',            description: 'Send to 01700-000000',        icon: '📱' },
                    { value: 'nagad', label: 'Nagad',            description: 'Send to 01700-000000',        icon: '📲' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-3 sm:p-4 border rounded-sm cursor-pointer transition-colors ${
                        form.paymentMethod === method.value
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={form.paymentMethod === method.value}
                        onChange={handleChange}
                        className="accent-primary shrink-0"
                      />
                      <span className="text-xl leading-none shrink-0">{method.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800">{method.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Mobile-only: Place Order button */}
              <div className="lg:hidden space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Placing Order…
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By placing your order you agree to our terms &amp; conditions.
                </p>
              </div>
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="lg:sticky lg:top-24 space-y-4 w-full min-w-0">
              <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <ul className="space-y-3 mb-4">
                  {orderItems.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-surface shrink-0 border border-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 font-medium line-clamp-2 leading-snug">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatPrice(product.price)} / {product.unit}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 shrink-0 pt-0.5">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 shrink-0" />
                      Delivery
                    </span>
                    <span>
                      {form.district ? formatPrice(deliveryCharge) : 'Select district'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary">
                      {form.district ? formatPrice(total) : '—'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Delivery note */}
              {form.district && (
                <p className="text-xs text-gray-400 px-1">
                  {form.district === 'Dhaka'
                    ? '🚴 Dhaka delivery: ৳60 — usually within 1–2 days.'
                    : '🚚 Outside Dhaka: ৳120 — usually within 2–4 days.'}
                </p>
              )}

              {/* Desktop-only: Place Order button */}
              <div className="hidden lg:block space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Placing Order…
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By placing your order you agree to our terms &amp; conditions.
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
