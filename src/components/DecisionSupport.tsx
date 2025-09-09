import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, Lightbulb, TrendingUp, Users, Droplets, Home, Banknote, Zap } from "lucide-react";

// Dummy data for scheme recommendations and AI insights
const schemeRecommendations = [
  {
    scheme: "PM-KISAN",
    eligibleBeneficiaries: 3456,
    potentialBenefit: "₹6,000/year per farmer",
    priority: "High",
    matchingCriteria: "FRA patta holders with agricultural land",
    implementationStatus: "Ready to Deploy",
    estimatedCoverage: "87%"
  },
  {
    scheme: "Jal Jeevan Mission", 
    eligibleBeneficiaries: 2134,
    potentialBenefit: "Water connection to every household",
    priority: "High",
    matchingCriteria: "Villages with <50% water coverage",
    implementationStatus: "Survey Required",
    estimatedCoverage: "65%"
  },
  {
    scheme: "MGNREGA",
    eligibleBeneficiaries: 4567,
    potentialBenefit: "100 days guaranteed employment",
    priority: "Medium",
    matchingCriteria: "Adult FRA beneficiaries",
    implementationStatus: "Active Enrollment",
    estimatedCoverage: "92%"
  },
  {
    scheme: "DAJGUA Schemes",
    eligibleBeneficiaries: 1876,
    potentialBenefit: "Integrated tribal development",
    priority: "High", 
    matchingCriteria: "Tribal communities with CFR rights",
    implementationStatus: "Planning Phase",
    estimatedCoverage: "78%"
  }
];

const aiInsights = [
  {
    type: "Asset Mapping",
    insight: "AI analysis identified 234 new water bodies in CFR areas that could benefit from Jal Shakti schemes",
    confidence: 94,
    actionable: true,
    impact: "High"
  },
  {
    type: "Predictive Analysis",
    insight: "Villages with >80% FRA implementation show 45% higher success rate in MGNREGA participation",
    confidence: 89,
    actionable: true,
    impact: "Medium"
  },
  {
    type: "Gap Analysis", 
    insight: "1,234 eligible IFR holders not yet enrolled in PM-KISAN despite meeting criteria",
    confidence: 96,
    actionable: true,
    impact: "High"
  },
  {
    type: "Resource Optimization",
    insight: "Clustering scheme implementation by geographic proximity could reduce costs by 23%",
    confidence: 87,
    actionable: true,
    impact: "Medium"
  }
];

const interventionPriorities = [
  {
    village: "Mahua Tola",
    district: "Balaghat",
    state: "MP",
    priority: "Critical",
    recommendations: ["Jal Jeevan Mission", "PM-KISAN"],
    beneficiaries: 234,
    score: 92
  },
  {
    village: "Karanjia",
    district: "Mayurbhanj", 
    state: "Odisha",
    priority: "High",
    recommendations: ["MGNREGA", "DAJGUA"],
    beneficiaries: 187,
    score: 78
  },
  {
    village: "Eturnagaram",
    district: "Mulugu",
    state: "Telangana", 
    priority: "Medium",
    recommendations: ["PM-KISAN"],
    beneficiaries: 156,
    score: 65
  }
];

const getPriorityBadge = (priority: string) => {
  const variants = {
    "Critical": "destructive",
    "High": "default", 
    "Medium": "secondary",
    "Low": "outline"
  } as const;
  
  return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
};

const DecisionSupport = () => {
  return (
    <div className="space-y-6">
      {/* DSS Header */}
      <Card className="shadow-elegant bg-gradient-to-r from-forest/5 to-forest-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-forest" />
            AI-Powered Decision Support System
          </CardTitle>
          <p className="text-muted-foreground">
            Leveraging machine learning and spatial analysis to optimize scheme layering and policy interventions
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Scheme Recommendations</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="priorities">Intervention Priorities</TabsTrigger>
        </TabsList>

        {/* Scheme Recommendations */}
        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {schemeRecommendations.map((scheme, index) => (
              <Card key={index} className="shadow-elegant hover:shadow-forest transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-forest/10 rounded-lg">
                        {scheme.scheme === "PM-KISAN" && <Banknote className="h-6 w-6 text-forest" />}
                        {scheme.scheme === "Jal Jeevan Mission" && <Droplets className="h-6 w-6 text-water" />}
                        {scheme.scheme === "MGNREGA" && <Users className="h-6 w-6 text-earth" />}
                        {scheme.scheme === "DAJGUA Schemes" && <Home className="h-6 w-6 text-forest" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{scheme.scheme}</h3>
                        <p className="text-muted-foreground text-sm">{scheme.matchingCriteria}</p>
                      </div>
                    </div>
                    {getPriorityBadge(scheme.priority)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-lg text-forest">{scheme.eligibleBeneficiaries.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Eligible Beneficiaries</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-sm text-earth">{scheme.potentialBenefit}</div>
                      <div className="text-xs text-muted-foreground">Potential Benefit</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-lg text-water">{scheme.estimatedCoverage}</div>
                      <div className="text-xs text-muted-foreground">Est. Coverage</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm">{scheme.implementationStatus}</div>
                      <div className="text-xs text-muted-foreground">Status</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-forest hover:bg-forest-secondary">
                      <Target className="h-4 w-4 mr-2" />
                      Generate Action Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-5 w-5 text-warning" />
                      <Badge variant="outline">{insight.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <Badge variant="secondary">{insight.confidence}%</Badge>
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-4">{insight.insight}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Impact:</span>
                        <Badge variant={insight.impact === "High" ? "default" : "secondary"}>
                          {insight.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Actionable:</span>
                        <Badge variant={insight.actionable ? "default" : "outline"}>
                          {insight.actionable ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                    
                    {insight.actionable && (
                      <Button size="sm" variant="outline">
                        <Zap className="h-4 w-4 mr-2" />
                        Take Action
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Intervention Priorities */}
        <TabsContent value="priorities" className="space-y-4">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-forest" />
                  Priority Villages for Intervention
                </CardTitle>
                <Select defaultValue="score">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Sort by Score</SelectItem>
                    <SelectItem value="beneficiaries">Sort by Beneficiaries</SelectItem>
                    <SelectItem value="priority">Sort by Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {interventionPriorities.map((village, index) => (
                <div key={index} className="p-4 border border-forest-light/30 rounded-lg bg-gradient-to-r from-background to-forest-light/5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{village.village}</h4>
                      <p className="text-sm text-muted-foreground">{village.district}, {village.state}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-forest">{village.score}</div>
                        <div className="text-xs text-muted-foreground">Priority Score</div>
                      </div>
                      {getPriorityBadge(village.priority)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{village.beneficiaries} beneficiaries</span>
                      </div>
                      <div className="flex gap-1">
                        {village.recommendations.map((rec, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{rec}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      View Action Plan
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DecisionSupport;