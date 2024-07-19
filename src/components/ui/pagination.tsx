import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Componente principal de paginación
const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <PaginationPrevious
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <PaginationContent>
        {currentPage > 2 && (
          <>
            <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
            {currentPage > 3 && <PaginationEllipsis />}
          </>
        )}
        {pages
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <PaginationEllipsis />}
            <PaginationLink onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationLink>
          </>
        )}
      </PaginationContent>
      <PaginationNext
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
};

Pagination.displayName = "Pagination";

// Componente para el contenido de la paginación
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// Componente para los ítems de la paginación
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("cursor-pointer", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// Tipo para las propiedades del enlace de paginación
type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

// Componente para el enlace de paginación
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
    // Manejo del estado deshabilitado
    tabIndex={disabled ? -1 : undefined}
    aria-disabled={disabled}
    onClick={disabled ? undefined : props.onClick}
  />
);
PaginationLink.displayName = "PaginationLink";

// Componente para el botón de página anterior
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 cursor-pointer" />
    <span className="cursor-pointer">Anterior</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// Componente para el botón de página siguiente
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="cursor-pointer">Siguiente</span>
    <ChevronRight className="h-4 w-4 cursor-pointer" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// Componente para los puntos suspensivos de la paginación
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
