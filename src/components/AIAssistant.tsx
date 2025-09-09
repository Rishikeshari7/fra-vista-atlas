import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MessageSquare, Zap, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { useAI } from "@/hooks/useAI";
import { motion, AnimatePresence } from "framer-motion";

const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const { isProcessing, insights, analyzeData, processNLPQuery } = useAI();
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string, timestamp: Date}>>([]);

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    const userMessage = { type: 'user' as const, message: query, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMessage]);
    
    const aiResponse = await processNLPQuery(query);
    setResponse(aiResponse);
    
    const aiMessage = { type: 'ai' as const, message: aiResponse, timestamp: new Date() };
    setChatHistory(prev => [...prev, aiMessage]);
    
    setQuery("");
  };

  const handleAnalyzeData = async () => {
    // Mock data for analysis
    const mockData = [
      { state: 'MP', ifrClaims: 12450, crClaims: 8900, completionRate: 78 },
      { state: 'Tripura', ifrClaims: 3200, crClaims: 2100, completionRate: 85 },
      { state: 'Odisha', ifrClaims: 15600, crClaims: 11200, completionRate: 72 },
      { state: 'Telangana', ifrClaims: 8900, crClaims: 6400, completionRate: 81 }
    ];
    
    await analyzeData(mockData);
  };

  const quickActions = [
    { label: "Analyze Water Resources", query: "water bodies analysis in FRA areas" },
    { label: "Agricultural Productivity", query: "agriculture potential in forest rights areas" },
    { label: "Employment Opportunities", query: "employment schemes for FRA beneficiaries" },
    { label: "Forest Cover Analysis", query: "forest conservation in community rights areas" }
  ];

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <Card className="shadow-elegant bg-gradient-to-r from-forest/5 to-forest-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-forest" />
            AI Assistant
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by ML
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Ask questions about FRA data, get insights, and receive AI-powered recommendations
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Interface */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-forest" />
              AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat History */}
            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/20 rounded-lg">
              <AnimatePresence>
                {chatHistory.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Start a conversation with the AI assistant</p>
                  </div>
                )}
                {chatHistory.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-forest text-primary-foreground' 
                        : 'bg-white border shadow-sm'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border shadow-sm p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-forest" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about FRA data, trends, or request analysis..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleQuery();
                  }
                }}
              />
              <Button 
                onClick={handleQuery} 
                disabled={isProcessing || !query.trim()}
                className="bg-forest hover:bg-forest-secondary self-end"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(action.query)}
                    className="text-xs h-auto py-2 px-3"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-forest" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={handleAnalyzeData} 
                disabled={isProcessing}
                className="bg-forest hover:bg-forest-secondary"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                Generate New Insights
              </Button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline">{insight.type}</Badge>
                          <Badge variant="secondary">{insight.confidence}%</Badge>
                        </div>
                        <p className="text-sm mb-3">{insight.insight}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant={insight.impact === "High" ? "default" : "secondary"}>
                              {insight.impact} Impact
                            </Badge>
                            {insight.actionable && (
                              <Badge variant="outline">Actionable</Badge>
                            )}
                          </div>
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              <Zap className="h-3 w-3 mr-1" />
                              Act
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {insights.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Click "Generate New Insights" to see AI analysis</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;