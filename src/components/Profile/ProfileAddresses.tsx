"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  getLoggedUserAddresses,
  addAddress,
  removeAddress,
} from "@/services/address.service";
import { Address } from "@/interfaces/address";
import { toast } from "@/components/ui/toast";
import { MapPin, Plus, Trash2, Loader2, Building, Phone, Home } from "lucide-react";

export default function ProfileAddresses() {
  const { data: session } = useSession();
  const token = session?.token;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    phone: "",
    city: "Cairo",
  });

  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await getLoggedUserAddresses(token);
      if (res.status === "success" && Array.isArray(res.data)) {
        setAddresses(res.data);
      }
    } catch {
      // ignore fetch error
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (!ignore) {
        void fetchAddresses();
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchAddresses]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.name || !formData.details || !formData.phone) {
      toast.add({
        type: "error",
        description: "Please fill in all required address fields.",
        timeout: 3000,
      });
      return;
    }

    try {
      setIsAdding(true);
      const res = await addAddress(formData, token);
      if (res.status === "success") {
        toast.add({
          type: "success",
          description: "Address added successfully!",
          timeout: 3000,
        });
        setFormData({ name: "", details: "", phone: "", city: "Cairo" });
        setShowAddForm(false);
        if (Array.isArray(res.data)) {
          setAddresses(res.data);
        } else {
          void fetchAddresses();
        }
      } else {
        toast.add({
          type: "error",
          description: res.message || "Failed to add address.",
          timeout: 3000,
        });
      }
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
        timeout: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!token) return;

    try {
      setDeletingId(id);
      const res = await removeAddress(id, token);
      if (res.status === "success") {
        toast.add({
          type: "success",
          description: "Address removed.",
          timeout: 2500,
        });
        setAddresses((prev) => prev.filter((a) => a._id !== id));
      }
    } catch {
      toast.add({
        type: "error",
        description: "Failed to remove address.",
        timeout: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 mb-8">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MapPin className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Saved Addresses</h2>
            <p className="text-xs text-slate-400">Manage your delivery locations for faster checkout</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? "Cancel" : "Add Address"}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddAddress} className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Add New Delivery Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Address Label (e.g. Home, Office) *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Home"
                className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                City / Governorate *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Mansoura">Mansoura</option>
                <option value="Tanta">Tanta</option>
                <option value="Assiut">Assiut</option>
                <option value="Aswan">Aswan</option>
                <option value="Hurghada">Hurghada</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Contact Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01012345678"
                className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Street Address Details *
              </label>
              <input
                type="text"
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Building 12, Floor 4, Apt 10"
                className="w-full h-10 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isAdding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Address
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-2">
            <Home className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No saved addresses yet</p>
          <p className="text-xs text-slate-400 mt-1">Add your home or office address for 1-click checkout</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-emerald-600" />
                    {addr.name}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/60 text-slate-600 font-semibold">
                    {addr.city}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">{addr.details}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {addr.phone}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDeleteAddress(addr._id)}
                  disabled={deletingId === addr._id}
                  className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-medium cursor-pointer"
                >
                  {deletingId === addr._id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
