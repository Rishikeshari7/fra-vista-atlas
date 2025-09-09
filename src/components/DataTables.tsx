import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Filter, Eye, Edit, Calendar } from "lucide-react";

// Dummy data for FRA claims
const ifrClaims = [
  {
    id: "IFR001",
    claimantName: "Ravi Kumar",
    village: "Mahua Tola",
    district: "Balaghat",
    state: "Madhya Pradesh",
    claimDate: "2023-03-15",
    status: "Granted",
    area: "2.45 ha",
    surveyNumber: "SN-2023-MP-001"
  },
  {
    id: "IFR002", 
    claimantName: "Sunita Devi",
    village: "Karanjia",
    district: "Mayurbhanj",
    state: "Odisha",
    claimDate: "2023-04-22",
    status: "Under Verification",
    area: "1.87 ha",
    surveyNumber: "SN-2023-OD-045"
  },
  {
    id: "IFR003",
    claimantName: "Mangal Singh",
    village: "Jashpur",
    district: "Dantewada",
    state: "Madhya Pradesh", 
    claimDate: "2023-02-08",
    status: "Pending Documents",
    area: "3.12 ha",
    surveyNumber: "SN-2023-MP-023"
  },
  {
    id: "IFR004",
    claimantName: "Kamala Tripura",
    village: "Agartala Rural",
    district: "West Tripura",
    state: "Tripura",
    claimDate: "2023-05-10",
    status: "Granted",
    area: "1.95 ha",
    surveyNumber: "SN-2023-TR-012"
  },
  {
    id: "IFR005",
    claimantName: "Venkat Rao",
    village: "Eturnagaram",
    district: "Mulugu",
    state: "Telangana",
    claimDate: "2023-01-18",
    status: "Rejected",
    area: "2.78 ha",
    surveyNumber: "SN-2023-TE-008"
  }
];

const crClaims = [
  {
    id: "CR001",
    communityName: "Adivasi Gram Sabha",
    village: "Sheopur",
    district: "Sheopur",
    state: "Madhya Pradesh",
    claimDate: "2023-03-01",
    status: "Granted",
    area: "45.6 ha",
    rightType: "Grazing Rights"
  },
  {
    id: "CR002",
    communityName: "Tribal Welfare Committee",
    village: "Koraput",
    district: "Koraput",
    state: "Odisha",
    claimDate: "2023-04-15",
    status: "Under Review",
    area: "67.8 ha",
    rightType: "Water Access Rights"
  }
];

const cfrClaims = [
  {
    id: "CFR001",
    communityName: "Forest Protection Committee",
    village: "Seoni",
    district: "Seoni", 
    state: "Madhya Pradesh",
    claimDate: "2023-02-20",
    status: "Granted",
    area: "234.5 ha",
    forestType: "Sal Forest"
  },
  {
    id: "CFR002",
    communityName: "Eco-Development Committee",
    village: "Similipal",
    district: "Mayurbhanj",
    state: "Odisha",
    claimDate: "2023-01-10",
    status: "Under Survey",
    area: "178.9 ha",
    forestType: "Mixed Deciduous"
  }
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Granted": "default",
    "Under Verification": "secondary", 
    "Under Review": "secondary",
    "Under Survey": "secondary",
    "Pending Documents": "destructive",
    "Rejected": "outline"
  } as const;
  
  return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>;
};

const DataTables = () => {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-forest" />
            Filter & Search FRA Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, village..." className="pl-10" />
            </div>
            <Select defaultValue="all-states">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-states">All States</SelectItem>
                <SelectItem value="mp">Madhya Pradesh</SelectItem>
                <SelectItem value="tripura">Tripura</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="granted">Granted</SelectItem>
                <SelectItem value="under-verification">Under Verification</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Tables */}
      <Tabs defaultValue="ifr" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ifr">Individual Forest Rights (IFR)</TabsTrigger>
          <TabsTrigger value="cr">Community Rights (CR)</TabsTrigger>
          <TabsTrigger value="cfr">Community Forest Rights (CFR)</TabsTrigger>
        </TabsList>

        <TabsContent value="ifr">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Individual Forest Rights Claims</CardTitle>
                <Badge variant="outline">{ifrClaims.length} records</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Claimant Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ifrClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                        <TableCell className="font-medium">{claim.claimantName}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cr">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Community Rights Claims</CardTitle>
                <Badge variant="outline">{crClaims.length} records</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Community Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Right Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                        <TableCell className="font-medium">{claim.communityName}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>{claim.rightType}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cfr">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Community Forest Resource Rights Claims</CardTitle>
                <Badge variant="outline">{cfrClaims.length} records</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Community Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>District</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Forest Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cfrClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-mono text-sm">{claim.id}</TableCell>
                        <TableCell className="font-medium">{claim.communityName}</TableCell>
                        <TableCell>{claim.village}</TableCell>
                        <TableCell>{claim.district}</TableCell>
                        <TableCell>{claim.state}</TableCell>
                        <TableCell>{claim.area}</TableCell>
                        <TableCell>{claim.forestType}</TableCell>
                        <TableCell>{getStatusBadge(claim.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataTables;