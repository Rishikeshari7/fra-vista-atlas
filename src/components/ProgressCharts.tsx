import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Dummy data for progress analytics
const monthlyProgress = [
  { month: "Jan", claims: 245, verified: 189, granted: 167 },
  { month: "Feb", claims: 298, verified: 234, granted: 198 },
  { month: "Mar", claims: 356, verified: 287, granted: 245 },
  { month: "Apr", claims: 412, verified: 334, granted: 289 },
  { month: "May", claims: 387, verified: 312, granted: 278 },
  { month: "Jun", claims: 445, verified: 367, granted: 321 }
];

const claimTypeDistribution = [
  { type: "IFR", count: 8934, percentage: 69.5, color: "bg-forest" },
  { type: "CR", count: 2456, percentage: 19.1, color: "bg-water" },
  { type: "CFR", count: 1457, percentage: 11.4, color: "bg-earth" }
];

const districtWiseData = [
  { district: "Balaghat (MP)", total: 1234, granted: 987, percentage: 80 },
  { district: "Mayurbhanj (OD)", total: 2145, granted: 1756, percentage: 82 },
  { district: "West Tripura (TR)", total: 876, granted: 567, percentage: 65 },
  { district: "Mulugu (TG)", total: 1456, granted: 1034, percentage: 71 },
  { district: "Seoni (MP)", total: 1876, granted: 1402, percentage: 75 },
];

const ProgressCharts = () => {
  return (
    <div className="space-y-6">
      {/* Monthly Progress Chart */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-forest" />
            Monthly FRA Progress (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyProgress.map((month, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2">
                  <span className="font-medium text-sm">{month.month}</span>
                </div>
                <div className="col-span-10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Claims: {month.claims}</span>
                    <span>Verified: {month.verified}</span>
                    <span>Granted: {month.granted}</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                      <div className="h-full flex">
                        <div 
                          className="bg-gradient-to-r from-forest to-forest-secondary"
                          style={{ width: `${(month.granted / month.claims) * 100}%` }}
                        />
                        <div 
                          className="bg-gradient-to-r from-earth to-earth-secondary"
                          style={{ width: `${((month.verified - month.granted) / month.claims) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claim Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-forest" />
              Claim Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {claimTypeDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded ${item.color}`} />
                      <span className="font-medium text-sm">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{item.count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-success/10 to-success/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <div className="font-medium text-sm">Grant Success Rate</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-success">78.5%</div>
                  <div className="flex items-center text-xs text-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-earth/10 to-earth/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-earth" />
                  <div>
                    <div className="font-medium text-sm">Avg Processing Time</div>
                    <div className="text-xs text-muted-foreground">Days to verification</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-earth">45 days</div>
                  <div className="flex items-center text-xs text-earth">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -8 days
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-warning/10 to-warning/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <div>
                    <div className="font-medium text-sm">Pending Review</div>
                    <div className="text-xs text-muted-foreground">Requires attention</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-warning">3,924</div>
                  <Badge variant="outline" className="text-xs">
                    Priority
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District-wise Performance */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-forest" />
            District-wise Implementation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtWiseData.map((district, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-forest-light/20 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm mb-2">{district.district}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Total: {district.total.toLocaleString()}</span>
                    <span>Granted: {district.granted.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <Progress value={district.percentage} className="h-2" />
                  </div>
                  <Badge 
                    variant={district.percentage > 75 ? "default" : district.percentage > 65 ? "secondary" : "outline"}
                    className="min-w-16 justify-center"
                  >
                    {district.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressCharts;