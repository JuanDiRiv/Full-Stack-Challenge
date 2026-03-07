type PaginationControlsProps = {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    isLoading: boolean;
};

export function PaginationControls({
    page,
    totalPages,
    onPrevious,
    onNext,
    isLoading,
}: PaginationControlsProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <button
                type="button"
                onClick={onPrevious}
                disabled={isLoading || page <= 1}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Previous
            </button>

            <p className="text-sm text-slate-600">
                Page {page} of {Math.max(totalPages, 1)}
            </p>

            <button
                type="button"
                onClick={onNext}
                disabled={isLoading || page >= totalPages}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
                Next
            </button>
        </div>
    );
}
