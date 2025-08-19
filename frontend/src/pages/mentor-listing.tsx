// components/MentorGrid.tsx
import React from "react";
import MentorCard from "../components/mentor/MentorCard";

const mentors = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Software Engineer",
    rating: 4.8,
    reviews: 320,
    description: "Helping developers grow in full-stack development & career transitions 🚀",
    tag: "Mentor",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "AI Research Scientist",
    rating: 4.7,
    reviews: 210,
    description: "Guiding students in AI, ML, and cutting-edge research 📊",
    tag: "Mentor",
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    role: "Full Stack Developer",
    rating: 4.9,
    reviews: 500,
    description: "Expert in MERN stack, helping devs land top jobs 💻",
    tag: "Mentor",
    image: "https://picsum.photos/200",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Senior Software Engineer",
    rating: 4.8,
    reviews: 320,
    description: "Helping developers grow in full-stack development & career transitions 🚀",
    tag: "Mentor",
    image: "https://picsum.photos/200",
  },
];

export default function MentorGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-blue-300">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} {...mentor} />
      ))}
    </div>
  );
}
