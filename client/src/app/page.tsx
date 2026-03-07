import { PlannedAreas } from "@/components/planned-areas/planned-areas";

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Fullstack Challenge Frontend
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        The project foundation is ready. Core modules will be implemented in the
        next steps.
      </p>

      <PlannedAreas />
    </section>
  );
}
