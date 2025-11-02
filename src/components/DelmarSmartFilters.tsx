import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Filter, RotateCcw } from "lucide-react";

interface SmartFiltersProps {
  onFilterChange: (filters: {
    walkScore?: number;
    bethlehem?: boolean;
    hasGoogleEarth?: boolean;
    investorReady?: boolean;
    nearRailTrail?: boolean;
  }) => void;
}

const DelmarSmartFilters = ({ onFilterChange }: SmartFiltersProps) => {
  const [walkScore, setWalkScore] = useState([70]);
  const [bethlehem, setBethlehem] = useState(false);
  const [hasGoogleEarth, setHasGoogleEarth] = useState(false);
  const [investorReady, setInvestorReady] = useState(false);
  const [nearRailTrail, setNearRailTrail] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      walkScore: walkScore[0],
      bethlehem,
      hasGoogleEarth,
      investorReady,
      nearRailTrail,
    });
  };

  const handleReset = () => {
    setWalkScore([70]);
    setBethlehem(false);
    setHasGoogleEarth(false);
    setInvestorReady(false);
    setNearRailTrail(false);
    onFilterChange({});
  };

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Smart Filters</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-gray-600"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          {/* Walkability Score Slider */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Walkability Score ≥ {walkScore[0]}
            </Label>
            <Slider
              value={walkScore}
              onValueChange={setWalkScore}
              min={0}
              max={100}
              step={10}
              className="mt-2"
            />
          </div>

          {/* Checkbox Filters */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bethlehem"
                checked={bethlehem}
                onCheckedChange={(checked) => setBethlehem(checked as boolean)}
              />
              <Label
                htmlFor="bethlehem"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Bethlehem Central School District Only
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="googleEarth"
                checked={hasGoogleEarth}
                onCheckedChange={(checked) => setHasGoogleEarth(checked as boolean)}
              />
              <Label
                htmlFor="googleEarth"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Has Google Earth & Street View Links
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="investor"
                checked={investorReady}
                onCheckedChange={(checked) => setInvestorReady(checked as boolean)}
              />
              <Label
                htmlFor="investor"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Investor-Ready (Multi-Unit with Cap Rate)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="railTrail"
                checked={nearRailTrail}
                onCheckedChange={(checked) => setNearRailTrail(checked as boolean)}
              />
              <Label
                htmlFor="railTrail"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Within ½ mile of Rail Trail or Four Corners
              </Label>
            </div>
          </div>

          <Button
            onClick={handleApplyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DelmarSmartFilters;
