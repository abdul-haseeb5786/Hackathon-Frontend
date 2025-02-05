import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminBarchart from '../charts/AdminBarchart.jsx';
import AdminPiechart from '../charts/AdminPiechart.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../ui/table.jsx';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination.jsx';
import AdminReport from '../datatable/AdminReport.jsx';
import UserManagement from '../datatable/UserManagement.jsx';
import UserForm from "../form/UserForm.jsx";
import CityManagerForm from '../form/BeneficiaryRegisterForm.jsx';
import CityManagerReport from '../datatable/BeneficiaryReports.jsx';

const CityManagerTab = () => {
    return (
        <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="Reports">Reports</TabsTrigger>
            <TabsTrigger value="Register Beneficiaries">Register Beneficiaries</TabsTrigger>
            
          </TabsList>
    
          {/* Overview Tab */}
          <TabsContent value="overview" className="flex-grow">
            <div className="flex gap-4">
              <Card className="w-[500px] flex-1">
                <CardHeader>
                  <CardTitle>Bar Chart - Multiple</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminBarchart />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
    
              <Card className="flex-1">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <AdminPiechart />
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
    
          {/* Reports Tab */}
          <TabsContent value="Reports" className="flex-grow">
            <CityManagerReport />
          </TabsContent>
    
          {/* User Management Tab */}
          <TabsContent value="Register Beneficiaries" className="flex-grow">
            <CityManagerForm/>
          </TabsContent>
    
        
        </Tabs>
      );
    };
    

export default CityManagerTab;
