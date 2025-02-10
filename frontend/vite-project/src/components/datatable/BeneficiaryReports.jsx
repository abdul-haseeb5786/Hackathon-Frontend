import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCaption, TableCell, TableFooter,
  TableHead, TableHeader, TableRow
} from '../ui/table.jsx';
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from '../ui/pagination.jsx';
import { Input } from '../ui/input.jsx';

const BeneficiaryReports = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStats, setTotalStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0 });
  const ITEMS_PER_PAGE = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // If there's a CNIC search query, use the individual search API
        if (searchQuery) {
          const response = await fetch(`https://hackathon-backend-jade.vercel.app/api/beneficiary/search/${searchQuery}`);
          const data = await response.json();
          if (data.message) {
            setBeneficiaries([]); // If no beneficiary is found, show empty results
          } else {
            setBeneficiaries([data]); // Show the single beneficiary
          }
          setTotalPages(1); // Only one result for CNIC search
          return; // Don't fetch the paginated reports if searching by CNIC
        }

        // Paginated fetch if no CNIC search
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          ...(fromDate && { fromDate }),
          ...(toDate && { toDate }),
          ...(department && { department }),
          ...(status && { status }),
        });

        const response = await fetch(`https://hackathon-backend-jade.vercel.app/api/beneficiary/reports?${queryParams}`);
        const data = await response.json();

        setBeneficiaries(data.beneficiaries);
        setTotalPages(data.totalPages); // ✅ Fetch total pages from backend
        setTotalStats({
          total: data.total,
          completed: data.completed,
          pending: data.pending,
          inProgress: data.inProgress
        });
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [fromDate, toDate, department, status, currentPage, searchQuery]); // ✅ Added searchQuery to dependencies

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full p-6 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Beneficiary Reports</h2>

      {/* ✅ Date Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="From Date" />
        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder="To Date" />
        <Input placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <Input placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>

      {/* ✅ Stats Summary */}
      <div className="mb-4">
        <strong>Total: </strong> {totalStats.total} | 
        <strong> Completed: </strong> {totalStats.completed} | 
        <strong> Pending: </strong> {totalStats.pending} | 
        <strong> In Progress: </strong> {totalStats.inProgress}
      </div>

      {/* ✅ Search Input */}
      <Input
        placeholder="Search by Name or CNIC..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
      />

      {/* ✅ Data Table */}
      <Table className="w-full border border-gray-300 text-sm">
        <TableCaption className="text-gray-600 text-center mb-2">
          List of registered beneficiaries
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>CNIC</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead> {/* ✅ New Column */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {beneficiaries.length > 0 ? (
            beneficiaries.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{item.cnic}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ Pagination */}
      {totalPages > 1 && !searchQuery && (
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

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i + 1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  className={`px-3 py-1 border ${i + 1 === currentPage ? 'bg-gray-300' : 'border-gray-300'} rounded`}
                >
                  {i + 1}
                </PaginationLink>
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

export default BeneficiaryReports;
