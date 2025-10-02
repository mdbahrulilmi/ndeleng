import { Suspense } from "react";
import Search from "./search";

export default function SearchPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}