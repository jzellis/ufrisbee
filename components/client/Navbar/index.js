"use client";
import { useState } from "react";
export default function Navbar() {
  const [title, setTitle] = useState("Frisbee");
  return (
    <div className="navbar bg-base-100">
      <a className="btn btn-ghost text-xl">{title}</a>
    </div>
  );
}
