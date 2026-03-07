import { featureAreas } from "@/lib/feature-areas";

export function PlannedAreas() {
    return (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Planned Areas</h2>
            <p className="mt-1 text-sm text-slate-600">
                This frontend foundation is ready to grow with the core modules.
            </p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {featureAreas.map((area) => (
                    <li
                        key={area.key}
                        className="rounded-md border border-slate-200 bg-slate-50 p-4"
                    >
                        <h3 className="text-sm font-medium text-slate-900">{area.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{area.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
