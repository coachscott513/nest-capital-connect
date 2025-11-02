import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DelmarSchoolInsights = () => {
  const schools = [
    { name: "Eagle Elementary", rating: "8/10", distance: "0.7 mi" },
    { name: "BC Middle School", rating: "9/10", distance: "1.4 mi" },
    { name: "BC High School", rating: "9/10", distance: "1.6 mi" },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bethlehem Central School District
          </h2>
          <p className="text-lg text-muted-foreground">
            Highly rated schools serving the Delmar community
          </p>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="text-lg font-semibold">School</TableHead>
                <TableHead className="text-lg font-semibold">Rating</TableHead>
                <TableHead className="text-lg font-semibold">Distance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school, index) => (
                <TableRow key={index} className="text-base">
                  <TableCell className="font-medium">{school.name}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-bold text-lg">{school.rating}</span>
                  </TableCell>
                  <TableCell>{school.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            asChild
          >
            <a href="https://www.rpr.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full RPR School Report
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DelmarSchoolInsights;
