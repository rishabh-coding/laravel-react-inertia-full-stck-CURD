import { Link } from "@inertiajs/react";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



interface LinkProps {
    active: boolean;
    label: string;
    url: string | null;
};


interface PaginationData {
    links: LinkProps[];
    from: number;
    to: number;
    total: number;

};
interface PaginationProps {
    products: PaginationData,
    perPage: string;
    onPerPageChange: (value: string) => void;
    totalCount: number,
    fillteredCount: number,
    search: string,
};

export default function Pagination({ products, perPage, onPerPageChange, totalCount, fillteredCount, search }: PaginationProps) {

    return (
        <div className="flex items-center justify-between mt-4">

            {/* pagination info */}
            {search ? (
                <p>Showing <strong>{fillteredCount}</strong> filltered result{fillteredCount !== 1 && 's'} out of <strong>{totalCount} entr{totalCount !== 1 ? 'ies' : 'y'}</strong></p>

            ) : (
                <p>Showing <strong>{products.from}</strong> to <strong>{products.to}</strong> out of <strong>{products.total} entr{totalCount !== 1 ? 'ies' : 'y'}</strong></p>

            )}

            {/* Row Per Page */}
            <div className="flex items-center gap-2">
                <span className="text-sm">Row per page: </span>
                <Select onValueChange={onPerPageChange} value={perPage}>
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="Row" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="-1">All</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Pagination Link */}
            <div className="flex gap-2">
                {
                    products.links.map((link, index) => (
                        <Link
                            className={`px-3 py-2 border rounded ${link.active ? 'bg-gray-700 text-white' : ''}`}
                            href={link.url || '#'}
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))
                }
            </div>
        </div>
    )
}
