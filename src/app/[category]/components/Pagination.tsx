import { useAuth } from "@/app/AuthContext"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export function PaginationProducts() {
  const { listProducts } = useAuth();
  const param = useParams();
  const searchParam = useSearchParams();
  const page = parseInt(searchParam.get("page") || "1");
  const route = useRouter();
  const totalPages = listProducts?.totalPages || 1;
  const pagesToShow = [];
  if (page > 1) pagesToShow.push(page - 1);
  pagesToShow.push(page);
  if (page < totalPages) pagesToShow.push(page + 1);
  
  return (
    <Pagination className={cn("cursor-pointer text-[var(--color-text-root)]")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => route.push(`/${param.category}?page=${page > 1 ? page - 1 : 1}`)} />
        </PaginationItem>

        {pagesToShow.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => route.push(`/${param.category}?page=${p}`)}
              isActive={p === page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => route.push(`/${param.category}?page=${page < totalPages ? page + 1 : totalPages}`)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
