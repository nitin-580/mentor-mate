// components/MentorCard.tsx
import React from "react";
import { Star } from "lucide-react";

interface MentorProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  description: string;
  tag: string;
  image: string;

}

export default function MentorCard({
  name,
  role,
  rating,
  reviews,
  description,
  tag,
  image,
}: MentorProps) {
  return (
    <div className="max-w-sm rounded-2xl shadow-md bg-white p-4 ring-1 ring-gray-100">
      {/* Mentor Image */}
      <div className="flex items-center space-x-3">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-900 text-lg">{name}</h2>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="flex gap-x-2">
      <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
        {tag}
      </span>
      <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
        {tag}
      </span>
      </div>

      {/* Rating */}
      <div className="flex items-center mt-3 space-x-1 text-gray-700">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
        <span className="text-xs text-gray-400">({reviews})</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600">{description}</p>

      {/* Tag */}
      <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
        {tag}
      </span>

      {/* Action Button */}
      <div className="mt-4">
        <button className="w-full rounded-md bg-indigo-600 text-white py-2 text-sm font-medium shadow hover:bg-indigo-700 transition">
          Book Session
        </button>
      </div>
    </div>
  );
}
