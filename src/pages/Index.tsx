import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, BarChart3, FileText, Users, TreePine, Droplets, Home, Search, Brain } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import FRAMap from "@/components/FRAMap";
import EnhancedDataTables from "@/components/EnhancedDataTables";
import ProgressCharts from "@/components/ProgressCharts";
import DecisionSupport from "@/components/DecisionSupport";
import AIAssistant from "@/components/AIAssistant";
import heroImage from "@/assets/fra-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-forest-light/20">
      {/* Header */}
      <header className="bg-gradient-to-r from-forest via-forest-secondary to-forest shadow-forest border-b border-forest-light">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TreePine className="h-8 w-8 text-primary-foreground" />
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">FRA Atlas</h1>
                <p className="text-sm text-primary-foreground/80">Forest Rights Act Monitoring System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="mp">
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-primary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp">Madhya Pradesh</SelectItem>
                  <SelectItem value="tripura">Tripura</SelectItem>
                  <SelectItem value="odisha">Odisha</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Forest landscape with tribal settlements" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/60 to-transparent">
          <div className="container mx-auto px-6 py-8 h-full flex items-center">
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-bold mb-2">AI-Powered Decision Support System</h2>
              <p className="text-lg opacity-90">Integrated monitoring of Forest Rights Act implementation across 4 states</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-6 w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="webgis" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              WebGIS
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              FRA Data
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="dss" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              DSS
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FRAMap />
              <ProgressCharts />
            </div>
          </TabsContent>

          <TabsContent value="webgis" className="mt-6">
            <FRAMap fullSize />
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <EnhancedDataTables />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressCharts />
              <ProgressCharts />
            </div>
          </TabsContent>

          <TabsContent value="dss" className="mt-6">
            <DecisionSupport />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TreePine className="h-6 w-6 text-forest" />
              <span className="text-sm text-muted-foreground">Ministry of Tribal Affairs (MoTA) - Forest Rights Act Atlas</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Government of India. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;