import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table.jsx';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination.jsx';
import { Input } from '../ui/input.jsx';

const AdminReport = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Search state
  const [cityQuery, setCityQuery] = useState('');
  const [branchQuery, setBranchQuery] = useState('');

  // Sample data
  const reportData = [
    { city: 'New York', branch: 'Manhattan', totalMeals: 1500, lastUpdated: '2025-01-01' },
    { city: 'New York', branch: 'Brooklyn', totalMeals: 1200, lastUpdated: '2025-01-02' },
    { city: 'Los Angeles', branch: 'Downtown', totalMeals: 1800, lastUpdated: '2025-01-03' },
    { city: 'Los Angeles', branch: 'Hollywood', totalMeals: 1600, lastUpdated: '2025-01-04' },
    { city: 'Chicago', branch: 'Southside', totalMeals: 1400, lastUpdated: '2025-01-05' },
    { city: 'Chicago', branch: 'Northside', totalMeals: 1700, lastUpdated: '2025-01-06' },
    { city: 'Houston', branch: 'Downtown', totalMeals: 1100, lastUpdated: '2025-01-07' },
    { city: 'Houston', branch: 'Midtown', totalMeals: 1250, lastUpdated: '2025-01-08' },
    { city: 'Miami', branch: 'Beach', totalMeals: 1300, lastUpdated: '2025-01-09' },
    { city: 'Miami', branch: 'Downtown', totalMeals: 1450, lastUpdated: '2025-01-10' },
    { city: 'Seattle', branch: 'Center', totalMeals: 1350, lastUpdated: '2025-01-11' },
  ];

  // Filtered data based on search
  const filteredData = reportData.filter(
    (item) =>
      item.city.toLowerCase().includes(cityQuery.toLowerCase()) &&
      item.branch.toLowerCase().includes(branchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Slice data for current page
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page range for pagination (to prevent showing too many pages)
  const pageNumbers = [];
  if (totalPages <= 5) {
    // Show all pages if there are fewer than 5 pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show first page, last page, and the range around current page
    if (currentPage > 3) pageNumbers.push(1);
    if (currentPage > 4) pageNumbers.push(<PaginationEllipsis key="ellipsis-1" />);
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 2) pageNumbers.push(<PaginationEllipsis key="ellipsis-2" />);
    if (currentPage < totalPages - 1) pageNumbers.push(totalPages);
  }

  return (
    <div className="w-full p-6 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>

      {/* Search Bars */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by City..."
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="border border-gray-300 rounded px-4 py-2 w-1/2"
        />
        <Input
          placeholder="Search by Branch..."
          value={branchQuery}
          onChange={(e) => {
            setBranchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="border border-gray-300 rounded px-4 py-2 w-1/2"
        />
      </div>

      {/* Table */}
      <Table className="w-full border border-gray-300 text-sm">
        <TableCaption className="text-gray-600 text-center mb-2">A list of meal reports by city and branch.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>City</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead className="text-right">Total Meals Served</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell className="text-right">{item.totalMeals}</TableCell>
                <TableCell>{item.lastUpdated}</TableCell>
                <TableCell>
                  <button className="underline">Download</button> | <button className="underline">Details</button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent className="flex justify-end">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className="px-3 py-1 border border-gray-300 rounded"
              />
            </PaginationItem>

            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {typeof page === 'number' ? (
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    className={`px-3 py-1 border ${page === currentPage ? 'bg-gray-300' : 'border-gray-300'
                      } rounded`}
                  >
                    {page}
                  </PaginationLink>
                ) : (
                  page
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className="px-3 py-1 border border-gray-300 rounded"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AdminReport;