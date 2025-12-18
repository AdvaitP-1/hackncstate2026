import Link from "next/link";
import Navbar from "../Navbar";
import { Button } from "@/components/ui/button";

export default function HomePageView() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex flex-1 items-center justify-center">
        <Button className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-medium">
          <Link href="/auth" className="inline-block w-full h-full text-center">
            Go to auth
          </Link>
        </Button>
      </section>
    </main>
  );
}
