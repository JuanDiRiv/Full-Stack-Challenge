type UsersSearchProps = {
    value: string;
    onChange: (value: string) => void;
};

export const UsersSearch = ({ value, onChange }: UsersSearchProps) => {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-4">
            <label htmlFor="users-search" className="mb-2 block text-sm font-medium text-slate-700">
                Search users
            </label>
            <input
                id="users-search"
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search by name or email"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-slate-300 focus:ring"
            />
        </section>
    );
};
