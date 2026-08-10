import type { Metadata } from "next";
import AllProjectsClient from "./AllProjectsClient";

export const metadata: Metadata = {
  title: "All Projects — Lan Dinh",
  description:
    "Browse all of Lan Dinh's product design projects spanning e-commerce, fintech, design systems, and sustainability.",
};

export default function WorkPage() {
  return <AllProjectsClient />;
}
