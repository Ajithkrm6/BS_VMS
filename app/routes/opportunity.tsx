import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/Common/Card';
import { Button } from '~/components/Common/Button';

export function Opportunity() {
  const [vehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Fetch vehicles from API
    setLoading(true);
    // Simulated delay
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground mt-2">Manage your opportunities</p>
        </div>
        <Button>Add Opportunity</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opportunity List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : vehicles.length === 0 ? (
            <p className="text-muted-foreground">No opportunities found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Make</th>
                    <th className="text-left py-2">Model</th>
                    <th className="text-left py-2">Year</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>{/* Vehicle rows */}</tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
