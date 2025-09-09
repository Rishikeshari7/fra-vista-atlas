import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Filter, Search, TreePine, Users, MapPin, Eye, Edit } from "lucide-react";
import { motion } from "framer-motion";

// Enhanced dummy data with more realistic information
const generateIFRData = () => {
  const villages = ['Baiga Tola', 'Gond Para', 'Korku Basti', 'Bhil Gaon', 'Munda Tola'];
  const districts = ['Balaghat', 'Mandla', 'Dindori', 'Seoni', 'Shahdol'];
  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
  const statuses = ['Approved', 'Pending', 'Under Review', 'Rejected'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `IFR-${String(i + 1).padStart(4, '0')}`,
    applicantName: `Applicant ${i + 1}`,
    village: villages[Math.floor(Math.random() * villages.length)],
    district: districts[Math.floor(Math.random() * districts.length)],
    state: states[Math.floor(Math.random() * states.length)],
    area: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
    applicationDate: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    surveyNumber: `SY-${Math.floor(Math.random() * 9000) + 1000}`,
    familyMembers: Math.floor(Math.random() * 8) + 2
  }));
};

const generateCRData = () => {
  const communities = ['Baiga Community', 'Gond Samaj', 'Korku Community', 'Bhil Samaj', 'Munda Community'];
  const districts = ['Balaghat', 'Mandla', 'Dindori', 'Seoni', 'Shahdol'];
  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
  const statuses = ['Approved', 'Pending', 'Under Review'];
  
  return Array.from({ length: 30 }, (_, i) => ({
    id: `CR-${String(i + 1).padStart(4, '0')}`,
    communityName: communities[Math.floor(Math.random() * communities.length)],
    village: `Village ${i + 1}`,
    district: districts[Math.floor(Math.random() * districts.length)],
    state: states[Math.floor(Math.random() * states.length)],
    area: parseFloat((Math.random() * 50 + 10).toFixed(2)),
    households: Math.floor(Math.random() * 100) + 20,
    applicationDate: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    beneficiaries: Math.floor(Math.random() * 500) + 50
  }));
};

const generateCFRData = () => {
  const resources = ['Sal Forest', 'Teak Plantation', 'Bamboo Grove', 'Mixed Forest', 'Medicinal Plants'];
  const districts = ['Balaghat', 'Mandla', 'Dindori', 'Seoni', 'Shahdol'];
  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];
  const statuses = ['Approved', 'Pending', 'Under Review', 'Active Management'];
  
  return Array.from({ length: 25 }, (_, i) => ({
    id: `CFR-${String(i + 1).padStart(4, '0')}`,
    resourceType: resources[Math.floor(Math.random() * resources.length)],
    village: `CFR Village ${i + 1}`,
    district: districts[Math.floor(Math.random() * districts.length)],
    state: states[Math.floor(Math.random() * states.length)],
    area: parseFloat((Math.random() * 200 + 50).toFixed(2)),
    applicationDate: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    communityGroups: Math.floor(Math.random() * 5) + 1,
    annualRevenue: Math.floor(Math.random() * 500000) + 50000
  }));
};

const EnhancedDataTables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const ifrData = useMemo(() => generateIFRData(), []);
  const crData = useMemo(() => generateCRData(), []);
  const cfrData = useMemo(() => generateCFRData(), []);

  const getStatusBadge = (status: string) => {
    const variants = {
      "Approved": "default",
      "Active Management": "default",
      "Pending": "secondary",
      "Under Review": "outline",
      "Rejected": "destructive"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  const filterData = (data: any[]) => {
    return data.filter(item => {
      const matchesSearch = searchTerm === "" || 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesState = stateFilter === "all" || item.state === stateFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      
      return matchesSearch && matchesState && matchesStatus;
    });
  };

  const paginateData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const FilterControls = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-64"
        />
      </div>
      
      <Select value={stateFilter} onValueChange={(value) => {
        setStateFilter(value);
        setCurrentPage(1);
      }}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All States</SelectItem>
          <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
          <SelectItem value="Tripura">Tripura</SelectItem>
          <SelectItem value="Odisha">Odisha</SelectItem>
          <SelectItem value="Telangana">Telangana</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={(value) => {
        setStatusFilter(value);
        setCurrentPage(1);
      }}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Under Review">Under Review</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export Data
      </Button>
    </div>
  );

  const PaginationControls = ({ data }: { data: any[] }) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, data.length)} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} results
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-3 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-forest" />
            Enhanced FRA Data Management System
          </CardTitle>
          <p className="text-muted-foreground">
            Interactive data tables with advanced filtering, search, and export capabilities
          </p>
        </CardHeader>
      </Card>

      <FilterControls />

      <Tabs defaultValue="ifr" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ifr" className="flex items-center gap-2">
            <TreePine className="h-4 w-4" />
            Individual Forest Rights ({ifrData.length})
          </TabsTrigger>
          <TabsTrigger value="cr" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community Rights ({crData.length})
          </TabsTrigger>
          <TabsTrigger value="cfr" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Community Forest Resource Rights ({cfrData.length})
          </TabsTrigger>
        </TabsList>

        {/* IFR Table */}
        <TabsContent value="ifr">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Individual Forest Rights (IFR) Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Applicant Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area (hectares)</TableHead>
                      <TableHead>Application Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginateData(filterData(ifrData)).map((claim, index) => (
                      <motion.tr
                        key={claim.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.applicantName}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>{claim.applicationDate}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <PaginationControls data={filterData(ifrData)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* CR Table */}
        <TabsContent value="cr">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Community Rights (CR) Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Community Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area (hectares)</TableHead>
                      <TableHead>Beneficiaries</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginateData(filterData(crData)).map((claim, index) => (
                      <motion.tr
                        key={claim.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.communityName}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>{claim.beneficiaries}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <PaginationControls data={filterData(crData)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* CFR Table */}
        <TabsContent value="cfr">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Community Forest Resource Rights (CFR)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Resource Type</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area (hectares)</TableHead>
                      <TableHead>Annual Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginateData(filterData(cfrData)).map((claim, index) => (
                      <motion.tr
                        key={claim.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.resourceType}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>₹{claim.annualRevenue.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <PaginationControls data={filterData(cfrData)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedDataTables;