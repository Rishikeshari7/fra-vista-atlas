import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, FileText, CheckCircle, AlertTriangle, MapPin } from "lucide-react";

// Dummy data for FRA statistics across 4 states
const statsData = {
  totalClaims: 12847,
  verifiedClaims: 8923,
  grantedTitles: 7456,
  pendingVerification: 3924,
  ifrClaims: 8934,
  crClaims: 2456,
  cfrClaims: 1457,
  totalVillages: 1256,
};

const stateData = [
  { name: "Madhya Pradesh", progress: 78, claims: 4234, granted: 3102 },
  { name: "Tripura", progress: 65, claims: 2134, granted: 1387 },
  { name: "Odisha", progress: 82, claims: 3892, granted: 3191 },
  { name: "Telangana", progress: 71, claims: 2587, granted: 1836 },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Claims */}
      <Card className="shadow-elegant hover:shadow-forest transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total FRA Claims</CardTitle>
          <FileText className="h-4 w-4 text-forest" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-forest">{statsData.totalClaims.toLocaleString()}</div>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className="bg-success/10 text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Verified Claims */}
      <Card className="shadow-elegant hover:shadow-forest transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Claims</CardTitle>
          <CheckCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{statsData.verifiedClaims.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">
            {Math.round((statsData.verifiedClaims / statsData.totalClaims) * 100)}% verification rate
          </div>
        </CardContent>
      </Card>

      {/* Granted Titles */}
      <Card className="shadow-elegant hover:shadow-forest transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Granted Titles</CardTitle>
          <Users className="h-4 w-4 text-earth" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-earth">{statsData.grantedTitles.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">
            {Math.round((statsData.grantedTitles / statsData.totalClaims) * 100)}% grant rate
          </div>
        </CardContent>
      </Card>

      {/* Pending Verification */}
      <Card className="shadow-elegant hover:shadow-forest transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
          <AlertTriangle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{statsData.pendingVerification.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">
            Requires immediate attention
          </div>
        </CardContent>
      </Card>

      {/* State-wise Progress */}
      <Card className="col-span-full shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-forest" />
            State-wise FRA Implementation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stateData.map((state, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-forest-light/20 to-forest-light/10 rounded-lg border border-forest-light/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{state.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {state.progress}% Complete
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Claims: {state.claims.toLocaleString()}</span>
                    <span>Granted: {state.granted.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div 
                      className="bg-gradient-to-r from-forest to-forest-secondary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${state.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;